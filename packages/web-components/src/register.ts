/**
 * Forked from https://github.com/preactjs/preact-custom-element
 */

import type { ReactElement } from "react";

import { ThemeProvider } from "@optiaxiom/react";
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
const CustomRenderEvent = "__ax_render";

declare global {
  interface ElementEventMap {
    [CustomContextEvent]: CustomEvent<{ context: unknown }>;
    [CustomRenderEvent]: CustomEvent<{ rendered: boolean }>;
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

    const root = createRoot(element.attachShadow({ mode: "open" }));
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
      /**
       * Dispatch a custom event to wait for parents to finish rendering.
       */
      let parent = element.parentElement;
      while (parent) {
        if (parent.nodeName.toLowerCase() in mapping) {
          const renderEvent = new CustomEvent<{ rendered: boolean }>(
            CustomRenderEvent,
            {
              cancelable: true,
              detail: { rendered: false },
            },
          );
          parent.dispatchEvent(renderEvent);
          if (!renderEvent.detail.rendered) {
            parent.queue = parent.queue ?? [];
            parent.queue.push(element);
            return;
          }
        }
        parent = parent.parentElement;
      }

      /**
       * Dispatch a custom event to grab the parent preact context.
       */
      const contextEvent = new CustomEvent<{ context: unknown }>(
        CustomContextEvent,
        {
          bubbles: true,
          cancelable: true,
          detail: { context: undefined },
        },
      );
      element.dispatchEvent(contextEvent);
      const context = contextEvent.detail.context;

      vdom = cloneElement(
        toVdom(element, withContextProvider(Component, context))!,
        props,
      );
      root.render(vdom);

      observer.observe(element, { attributes: true });
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

const withContextConsumer = (element: Element) => {
  /**
   * Provide the current preact context to a custom event.
   */
  let context: unknown = undefined;
  element.addEventListener(CustomContextEvent, (event) => {
    event.stopPropagation();
    event.detail.context = context;
  });

  /**
   * Provide the current rendering status to a custom event.
   */
  let rendered = false;
  element.addEventListener(CustomRenderEvent, (event) => {
    event.detail.rendered = rendered;
  });

  return (_props: unknown, _context: unknown) => {
    context = _context;
    rendered = true;

    useLayoutEffect(() => {
      if (element.queue) {
        let node;
        while ((node = element.queue.shift())) {
          if (
            "connectedCallback" in node &&
            typeof node.connectedCallback === "function"
          ) {
            node.connectedCallback();
          }
        }
      }
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
    return createElement(
      ThemeProvider,
      { selector: ":host" },
      createElement<P>(Component, props),
    );
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
  const Consumer = withContextConsumer(element);

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

    return createElement("slot", { ...props, ref }, createElement(Consumer));
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
    if (child instanceof Element && child.slot) {
      props[child.slot] = createElement(
        "slot",
        { name: child.slot },
        toVdom(child),
      );
    } else {
      children.push(child instanceof Text ? child.data : toVdom(child));
    }
  }

  return createElement(
    // @ts-expect-error -- too complex
    Component || element.nodeName.toLowerCase(),
    props,
    isRootNode ? createElement(withSlot(element)) : children,
  );
}

const toCamelCase = (str: string) =>
  str.replace(/-(\w)/g, (_, c) => c.toUpperCase());

const toNormalizedEvent = (name: string) =>
  name.slice("on".length).toLowerCase();
