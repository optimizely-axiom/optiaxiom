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
import { mapping } from "./mapping";
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
  options: {
    customEvents?: readonly never[];
  } = {},
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
          attributeName,
          element.getAttribute(attributeName),
        );
      });
    });

    const props = (options.customEvents ?? []).reduce<Record<string, unknown>>(
      (result, eventName) => {
        result[eventName] = (detail: unknown) => {
          element.dispatchEvent(
            new CustomEvent("ax-" + toNormalizedEvent(eventName), {
              bubbles: true,
              cancelable: true,
              detail,
            }),
          );
        };
        return result;
      },
      internals
        ? {
            onChange: (event: ChangeEvent<HTMLInputElement>) => {
              setFormValue(internals, event.target);
              element.dispatchEvent(
                new CustomEvent("ax-" + event.type, {
                  bubbles: true,
                  cancelable: true,
                }),
              );
            },
          }
        : {},
    );

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
          toVdom(element, withContextProvider(Component, { context, ref }))!,
          props,
        );
        root.render(vdom);
        observer.observe(element, { attributes: true });
        if (internals && ref.current) {
          setFormValue(internals, ref.current);
        }
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
    };

    return { connectedCallback, disconnectedCallback, ref };
  };

  if (!customElements.get(name)) {
    customElements.define(name, factory(name, withPreactElement));
  }

  return withPreactElement;
}

const createEmptyDiv = (parent: DocumentFragment) => {
  const div = document.createElement("div");
  div.style.display = "contents";
  parent.insertBefore(div, parent.firstChild);
  return div;
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

const toNormalizedEvent = (name: string) =>
  name.slice("on".length).toLowerCase();
