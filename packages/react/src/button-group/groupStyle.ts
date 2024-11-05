import * as styles from "./ButtonGroup.css";

const group = styles.className;

export const groupStyle = () => ({
  [[
    `${group}[data-orientation="horizontal"] > &:not(:first-child):not(:last-child)`,
    `${group}[data-orientation="horizontal"] > :not(:first-child):not(:last-child) &`,
  ].join(",")]: {
    borderInlineWidth: "0.5px",
  },
  [[
    `${group}[data-orientation="horizontal"] > &:not(:only-child):first-child`,
    `${group}[data-orientation="horizontal"] > :not(:only-child):first-child &`,
  ].join(",")]: {
    borderBottomRightRadius: 0,
    borderRightWidth: "0.5px",
    borderTopRightRadius: 0,
  },
  [[
    `${group}[data-orientation="horizontal"] > &:not(:only-child):last-child`,
    `${group}[data-orientation="horizontal"] > :not(:only-child):last-child &`,
  ].join(",")]: {
    borderBottomLeftRadius: 0,
    borderLeftWidth: "0.5px",
    borderTopLeftRadius: 0,
  },
  [[
    `${group}[data-orientation="vertical"] > &:not(:first-child):not(:last-child)`,
    `${group}[data-orientation="vertical"] > :not(:first-child):not(:last-child) &`,
  ].join(",")]: {
    borderBlockWidth: "0.5px",
  },
  [[
    `${group}[data-orientation="vertical"] > &:not(:only-child):first-child`,
    `${group}[data-orientation="vertical"] > :not(:only-child):first-child &`,
  ].join(",")]: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: "0.5px",
  },
  [[
    `${group}[data-orientation="vertical"] > &:not(:only-child):last-child`,
    `${group}[data-orientation="vertical"] > :not(:only-child):last-child &`,
  ].join(",")]: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopWidth: "0.5px",
  },
  [[
    `${group}[data-orientation] > &:not(:first-child):not(:last-child)`,
    `${group}[data-orientation] > :not(:first-child):not(:last-child) &`,
  ].join(",")]: {
    borderRadius: 0,
  },
});
