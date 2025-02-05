import { type ComponentType, createElement, type ReactElement } from "react";

import { toCamelCase } from "./toCamelCase";
import { withSlot } from "./withSlot";

export function toVdom<P>(
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
