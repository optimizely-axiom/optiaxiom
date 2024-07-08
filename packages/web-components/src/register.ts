/**
 * Forked from https://github.com/preactjs/preact-custom-element
 */

import type { HTMLAttributes, ReactElement } from "react";

import {
  type ComponentType,
  type FunctionComponent,
  cloneElement,
  createElement,
} from "react";
import { type Root, createRoot } from "react-dom/client";

import { sheets } from "./styles";

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
      this.#observer.observe(this, { attributes: true });
      this.#vdom = cloneElement(
        toVdom(this, this.#vdomComponent)!,
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

function toVdom<P>(
  element: unknown,
  nodeName?: ComponentType<P>,
  shouldProcessSlot = false,
): ReactElement | null {
  if (!(element instanceof Element)) {
    return null;
  }

  const isRootNode = !!nodeName;

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
    nodeName || element.nodeName.toLowerCase(),
    props,
    isRootNode ? createElement("slot", null, children) : children,
  );
}

const toCamelCase = (str: string) =>
  str.replace(/-(\w)/g, (_, c) => c.toUpperCase());

const toNormalizedEvent = (name: string) =>
  name.slice("on".length).toLowerCase();
