import * as styles from "./ButtonGroup.css";

const group = styles.className;

export const groupStyle = () => ({
  [`${group}[data-orientation="horizontal"] &:not(:first-child):not(:last-child)`]:
    {
      borderInlineWidth: "0.5px",
    },
  [`${group}[data-orientation="horizontal"] &:not(:only-child):first-child`]: {
    borderBottomRightRadius: 0,
    borderRightWidth: "0.5px",
    borderTopRightRadius: 0,
  },
  [`${group}[data-orientation="horizontal"] &:not(:only-child):last-child`]: {
    borderBottomLeftRadius: 0,
    borderLeftWidth: "0.5px",
    borderTopLeftRadius: 0,
  },
  [`${group}[data-orientation="vertical"] &:not(:first-child):not(:last-child)`]:
    {
      borderBlockWidth: "0.5px",
    },
  [`${group}[data-orientation="vertical"] &:not(:only-child):first-child`]: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: "0.5px",
  },
  [`${group}[data-orientation="vertical"] &:not(:only-child):last-child`]: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopWidth: "0.5px",
  },
  [`${group}[data-orientation] &:not(:first-child):not(:last-child)`]: {
    borderRadius: 0,
  },
});
