/**
 * Forked from https://github.com/preactjs/preact-custom-element
 */

import type { ReactElement } from "react";

import {
  cloneElement,
  type ComponentType,
  createElement,
  forwardRef,
  type FunctionComponent,
  useLayoutEffect,
} from "react";
import { createRoot } from "react-dom/client";

import { mapping } from "./mapping";
import { registerShadowRoot, unregisterShadowRoot } from "./styles";

const CustomContextEvent = "__ax_context";
const CustomMountEvent = "__ax_mount";
const CustomUnmountEvent = "__ax_unmount";

type CustomContextEventDetail = {
  context: unknown;
  rendered: boolean;
};

declare global {
  interface ElementEventMap {
    [CustomContextEvent]: CustomEvent<CustomContextEventDetail>;
    [CustomMountEvent]: CustomEvent<{ context: unknown }>;
  }

  interface Element {
    queue: Element[];
  }
}

export function register<P extends object>(
  name: `${string}-${string}`,
  Component: FunctionComponent<P>,
  options: {
    customEvents?: readonly never[];
  } = {},
) {
  const withPreactElement = (element: HTMLElement) => {
    let vdom: null | ReactElement<object> = null;

    const root = createRoot(
      element.shadowRoot
        ? createEmptyDiv(element.shadowRoot)
        : element.attachShadow({ mode: "open" }),
    );
    if (element.shadowRoot) {
      registerShadowRoot(element.shadowRoot);
    }

    const observer = new MutationObserver((mutationRecords) => {
      mutationRecords.forEach(({ attributeName }) => {
        if (!attributeName) {
          return;
        }

        attributeChangedCallback(
          attributeName,
          element.getAttribute(attributeName),
        );
      });
    });

    const props = (options.customEvents ?? []).reduce<
      Record<string, (detail: unknown) => void>
    >((result, eventName) => {
      result[eventName] = (detail) => {
        element.dispatchEvent(
          new CustomEvent("ax-" + toNormalizedEvent(eventName), {
            bubbles: true,
            cancelable: true,
            detail,
          }),
        );
      };
      return result;
    }, {});

    const attributeChangedCallback = (name: string, value: null | string) => {
      if (!vdom) {
        return;
      }

      vdom = cloneElement(vdom, {
        [toCamelCase(name)]: value === null ? undefined : value,
      });
      root.render(vdom);
    };

    const connectedCallback = () => {
      const mount = (context: unknown) => {
        vdom = cloneElement(
          toVdom(element, withContextProvider(Component, context))!,
          props,
        );
        root.render(vdom);
        observer.observe(element, { attributes: true });
      };

      let parent = element.parentElement;
      let skipFirst = !!element.slot;
      while (parent) {
        /**
         * Hook into the context bridge if this element is a child of another
         * of our web component.
         */
        if (parent.nodeName.toLowerCase() in mapping) {
          if (skipFirst) {
            skipFirst = false;
            parent = parent.parentElement;
            continue;
          }

          /**
           * Attach events to the ancestor to mount/unmount in sync with them.
           */
          parent.addEventListener(CustomMountEvent, (event) => {
            mount(event.detail.context);
          });
          parent.addEventListener(CustomUnmountEvent, () => {
            observer.disconnect();
            root.unmount();
          });

          /**
           * Check if the component has already rendered in which case we can
           * also mount right away.
           */
          const renderEvent = new CustomEvent<CustomContextEventDetail>(
            CustomContextEvent,
            {
              cancelable: true,
              detail: { context: undefined, rendered: false },
            },
          );
          parent.dispatchEvent(renderEvent);
          if (renderEvent.detail.rendered) {
            mount(renderEvent.detail.context);
          }

          return;
        }
        parent = parent.parentElement;
      }

      /**
       * Mount root level nodes that do not have another of our web component as
       * an ancestor.
       */
      mount(undefined);
    };

    const disconnectedCallback = () => {
      observer.disconnect();
      vdom = null;
      root.unmount();
      if (element.shadowRoot) {
        unregisterShadowRoot(element.shadowRoot);
      }
    };

    return { connectedCallback, disconnectedCallback };
  };

  if (!customElements.get(name)) {
    customElements.define(
      name,
      class extends HTMLElement {
        #internal: {
          connectedCallback: () => void;
          disconnectedCallback: () => void;
        };

        constructor() {
          super();
          this.#internal = withPreactElement(this);
        }

        connectedCallback() {
          this.#internal.connectedCallback();
        }

        disconnectedCallback() {
          this.#internal.disconnectedCallback();
        }
      },
    );
  }

  return withPreactElement;
}

const withContextBridge = (element: Element) => {
  /**
   * Provide the current rendering status and preact context via a custom event.
   */
  let context: unknown = undefined;
  let rendered = false;
  element.addEventListener(CustomContextEvent, (event) => {
    event.detail.context = context;
    event.detail.rendered = rendered;
  });

  return (_props: unknown, _context: unknown) => {
    context = _context;
    rendered = true;

    useLayoutEffect(() => {
      element.dispatchEvent(
        new CustomEvent(CustomMountEvent, {
          cancelable: true,
          detail: { context },
        }),
      );

      return () => {
        element.dispatchEvent(new CustomEvent(CustomUnmountEvent));
      };
    }, []);

    return null;
  };
};

/**
 * Wrap an existing component with custom preact context.
 */
const withContextProvider = <P extends { context?: unknown }>(
  Component: ComponentType<P>,
  context: unknown,
) => {
  return function ContextProvider(
    this: { getChildContext: () => unknown },
    rawProps: P,
  ) {
    this.getChildContext = () => context;

    const props = Object.assign({}, rawProps);
    delete props.context;
    return createElement<P>(Component, props);
  };
};

/**
 * Forward correct ref when wrapping children in slot in root node.
 *
 * Instead of forwarding the ref to the <slot> element inside the shadow root
 * we instead assign it to the source HTML element from which we created the
 * slot.
 */
const withSlot = (element: Element) => {
  const Bridge = withContextBridge(element);

  return forwardRef((props, ref) => {
    useLayoutEffect(() => {
      if (typeof ref === "function") {
        ref(element);
      } else if (ref && "current" in ref) {
        ref.current = element;
      }

      return () => {
        if (typeof ref === "function") {
          ref(null);
        } else if (ref && "current" in ref) {
          ref.current = undefined;
        }
      };
    }, [ref]);

    return createElement("slot", { ...props, ref }, createElement(Bridge));
  });
};

function toVdom<P>(
  element: unknown,
  Component?: ComponentType<P>,
): null | ReactElement {
  if (!(element instanceof Element)) {
    return null;
  }

  const isRootNode = !!Component;

  const props: Record<string, null | ReactElement | string> = {};
  for (const { name, value } of element.attributes) {
    if (name.startsWith("on") || name === "slot" || name === "style") {
      continue;
    }
    props[toCamelCase(name)] = value;
  }

  const children = [];
  for (const child of element.childNodes) {
    if (child instanceof Text && child.data.match(/^\s+$/)) {
      continue;
    }
    if (child instanceof Element && child.slot) {
      props[child.slot] = createElement("slot", {
        name: child.slot,
        style: { display: "inline-flex" },
      });
    } else {
      children.push(child instanceof Text ? child.data : toVdom(child));
    }
  }

  return createElement(
    // @ts-expect-error -- too complex
    Component || element.nodeName.toLowerCase(),
    props,
    isRootNode
      ? children.length
        ? createElement(withSlot(element))
        : null
      : children,
  );
}

const createEmptyDiv = (parent: DocumentFragment) => {
  const div = document.createElement("div");
  div.style.display = "contents";
  parent.insertBefore(div, parent.firstChild);
  return div;
};

const toCamelCase = (str: string) =>
  str.startsWith("aria-") || str.startsWith("data-")
    ? str
    : str.replace(/-(\w)/g, (_, c) => c.toUpperCase());

const toNormalizedEvent = (name: string) =>
  name.slice("on".length).toLowerCase();
