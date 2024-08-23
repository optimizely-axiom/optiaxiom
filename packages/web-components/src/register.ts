/**
 * Forked from https://github.com/preactjs/preact-custom-element
 */

import type { HTMLAttributes, ReactElement } from "react";

import {
  type ComponentType,
  type FunctionComponent,
  cloneElement,
  createElement,
  forwardRef,
  useLayoutEffect,
} from "react";
import { type Root, createRoot } from "react-dom/client";

import { mapping } from "./mapping";
import { sheets } from "./styles";

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

type ComponentEventNames<T> = T extends `on${string}`
  ? Exclude<T, keyof HTMLAttributes<EventTarget>>
  : never;

export function register<
  P extends object,
  EventName extends ComponentEventNames<keyof P & string>,
>(
  name: `${string}-${string}`,
  Component: FunctionComponent<P>,
  options: {
    customEvents?: readonly EventName[];
  } = {},
) {
  class PreactElement extends HTMLElement {
    #observer: MutationObserver;
    #props: Record<string, unknown>;
    #root: Root;
    #vdom?: ReactElement<object> | null;
    #vdomComponent: typeof Component;

    constructor() {
      super();

      this.#root = createRoot(this.attachShadow({ mode: "open" }));
      if (this.shadowRoot) {
        this.shadowRoot.adoptedStyleSheets = sheets;
      }

      this.#observer = new MutationObserver((mutationRecords) => {
        mutationRecords.forEach(({ attributeName }) => {
          if (!attributeName) {
            return;
          }

          this.#attributeChangedCallback(
            attributeName,
            this.getAttribute(attributeName),
          );
        });
      });

      this.#props = (options.customEvents ?? []).reduce<
        Record<string, (detail: unknown) => void>
      >((result, eventName) => {
        result[eventName] = (detail) => {
          this.dispatchEvent(
            new CustomEvent(toNormalizedEvent(eventName), {
              bubbles: true,
              cancelable: true,
              detail,
            }),
          );
        };
        return result;
      }, {});

      this.#vdomComponent = Component;
    }

    #attributeChangedCallback(name: string, value: null | string) {
      if (!this.#vdom) {
        return;
      }

      this.#vdom = cloneElement(this.#vdom, {
        [toCamelCase(name)]: value === null ? undefined : value,
      });
      this.#root.render(this.#vdom);
    }

    connectedCallback() {
      /**
       * Dispatch a custom event to wait for parents to finish rendering.
       */
      let parent = this.parentElement;
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
            parent.queue.push(this);
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
      this.dispatchEvent(contextEvent);
      const context = contextEvent.detail.context;

      this.#observer.observe(this, { attributes: true });
      this.#vdom = cloneElement(
        toVdom(this, withContextProvider(this.#vdomComponent, context))!,
        this.#props,
      );
      this.#root.render(this.#vdom);
    }

    disconnectedCallback() {
      this.#observer.disconnect();
      this.#vdom = null;
      this.#root.unmount();
    }
  }

  if (!customElements.get(name)) {
    customElements.define(name, PreactElement);
  }
}

const withContextConsumer = (element: Element) => {
  /**
   * Provide the current preact context to a custom event.
   */
  let _context: unknown = undefined;
  element.addEventListener(CustomContextEvent, (event) => {
    event.stopPropagation();
    event.detail.context = _context;
  });

  let rendered = false;
  element.addEventListener(CustomRenderEvent, (event) => {
    event.detail.rendered = rendered;
  });

  return (_props: unknown, context: unknown) => {
    _context = context;
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
const withSlot = (element: Element) =>
  forwardRef((props, ref) => {
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

    return createElement(
      "slot",
      { ...props, ref },
      createElement(withContextConsumer(element)),
    );
  });

function toVdom<P>(
  element: unknown,
  Component?: ComponentType<P>,
  shouldProcessSlot = false,
): ReactElement | null {
  if (!(element instanceof Element)) {
    return null;
  }

  const isRootNode = !!Component;

  const props: Record<string, ReactElement | null | string> = {};
  for (const { name, value } of element.attributes) {
    if (shouldProcessSlot && name === "slot") {
      continue;
    }
    if (name.startsWith("on")) {
      continue;
    }
    props[toCamelCase(name)] = value;
  }

  const children = [];
  for (const child of element.childNodes) {
    if (isRootNode && child instanceof Element && child.slot) {
      props[child.slot] = createElement(
        "slot",
        { name: child.slot },
        toVdom(child, undefined, true),
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
