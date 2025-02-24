/**
 * Forked from https://github.com/preactjs/preact-custom-element
 */

import type { ChangeEvent, ReactElement } from "react";

import { cloneElement, type FunctionComponent } from "react";
import { createRoot } from "react-dom/client";

import {
  CustomContextEvent,
  CustomMountEvent,
  CustomUnmountEvent,
} from "./events";
import { factory } from "./factory";
import { styleSheet } from "./styles";
import { toCamelCase } from "./toCamelCase";
import { toVdom } from "./toVdom";
import { withContextProvider } from "./withContextProvider";

type CustomContextEventDetail = {
  context: unknown;
  rendered: boolean;
};

declare global {
  interface ElementEventMap {
    [CustomContextEvent]: CustomEvent<CustomContextEventDetail>;
    [CustomMountEvent]: CustomEvent<{ context: unknown }>;
  }
}

export function register<P extends object>(
  name: `${string}-${string}`,
  Component: FunctionComponent<P>,
  propTypes: Record<string, "boolean" | "function" | "number" | "object">,
  components: Set<string>,
) {
  const withPreactElement = (
    element: HTMLElement,
    internals?: ElementInternals,
  ) => {
    let vdom: null | ReactElement<object> = null;
    const ref: { current: HTMLInputElement | null } = { current: null };

    const root = createRoot(
      element.shadowRoot
        ? createEmptyDiv(element.shadowRoot)
        : element.attachShadow({ mode: "open" }),
    );
    if (element.shadowRoot) {
      element.shadowRoot.adoptedStyleSheets = [styleSheet];
    }

    const observer = new MutationObserver((mutationRecords) => {
      mutationRecords.forEach(({ attributeName }) => {
        if (!attributeName) {
          return;
        }

        attributeChangedCallback(
          toCamelCase(attributeName),
          element.getAttribute(attributeName),
        );
      });
    });

    const props: Record<string, unknown> = internals
      ? {
          onChange: (event: ChangeEvent<HTMLInputElement>) => {
            setFormValue(internals, event.target);
          },
        }
      : {};
    for (const name of Object.keys(propTypes)) {
      // @ts-expect-error -- too complex
      if (name in element && element[name] !== undefined) {
        // @ts-expect-error -- too complex
        props[name] = element[name];
      }
      Object.defineProperty(element, name, {
        get() {
          return props[name];
        },
        set(value) {
          attributeChangedCallback(name, value);
        },
      });
    }

    const attributeChangedCallback = (
      name: string,
      value: ((...args: unknown[]) => void) | null | string,
    ) => {
      if (!vdom) {
        return;
      }

      props[name] =
        value === null
          ? undefined
          : parsePropertyValue(value, propTypes[name] ?? "string");
      root.render(cloneElement(vdom, props));
    };

    const connectedCallback = () => {
      const mount = (context: unknown) => {
        vdom = cloneElement(
          toVdom(element, withContextProvider(Component, { context, ref }))!,
          props,
        );
        root.render(vdom);
        observer.observe(element, { attributes: true });
        if (internals && ref.current) {
          setFormValue(internals, ref.current);
        }
      };

      let parent =
        element.parentNode instanceof ShadowRoot
          ? element.parentNode.host
          : element.parentElement;
      let skipFirst = !!element.slot;
      while (parent) {
        /**
         * Hook into the context bridge if this element is a child of another
         * of our web component.
         */
        if (components.has(parent.nodeName.toLowerCase())) {
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
        parent =
          parent.parentNode instanceof ShadowRoot
            ? parent.parentNode.host
            : parent.parentElement;
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
    };

    return { connectedCallback, disconnectedCallback, ref };
  };

  if (!customElements.get(name)) {
    customElements.define(name, factory(name, withPreactElement, propTypes));
  }

  return withPreactElement;
}

const createEmptyDiv = (parent: DocumentFragment) => {
  const div = document.createElement("div");
  div.style.display = "contents";
  parent.insertBefore(div, parent.firstChild);
  return div;
};

const parsePropertyValue = (
  propValue: unknown,
  propType: "boolean" | "function" | "number" | "object" | "string",
) => {
  if (
    propValue != null &&
    typeof propValue !== "object" &&
    typeof propValue !== "function"
  ) {
    if (propType === "boolean") {
      return propValue === "false" ? false : propValue === "" || !!propValue;
    } else if (propType === "number") {
      return parseFloat(String(propValue));
    }
    return String(propValue);
  }
  return propValue;
};

const setFormValue = (
  internals: ElementInternals,
  target: HTMLInputElement,
) => {
  internals.setValidity(target.validity, target.validationMessage, target);
  internals.setFormValue(
    ["checkbox", "radio"].includes(target.type)
      ? target.checked
        ? target.value
        : null
      : target.value,
  );
};
