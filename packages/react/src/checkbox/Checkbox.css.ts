import { theme } from "../styles";
import { style } from "../vanilla-extract";

export const optionWrapper = style({
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  gap: "8px",
  // selectors: {
  //   ["&:not(:first-child)"]: {
  //     marginTop: "12px",
  //   },
  // },
});

export const CheckboxGroupItem = style({
  // all: "unset",
  // backgroundColor: "white",
  // border: "1px",
  // borderColor: theme.colors["fg.tertiary"],
  // borderRadius: "100%",
  // borderStyle: "solid",
  // height: 16,
  // width: 16,
  // selectors: {
  //   "&:focus-visible": {
  //     outline: "2px",
  //     outlineColor: theme.colors["brand.300"],
  //     outlineOffset: "1px",
  //     outlineStyle: "solid",
  //   },
  //   ["&:not(:first-child)"]: {
  //     marginTop: "12px",
  //   },
  //   "&[data-disabled]": {
  //     borderColor: theme.colors["border.secondary"],
  //   },
  //   "&[data-state='checked']&:not([data-disabled])": {
  //     borderColor: theme.colors["brand.500"],
  //   },
  // },
});

export const CheckboxGroupIndicator = style({
  // alignItems: "center",
  // display: "flex ",
  // height: "100%",
  // justifyContent: "center",
  // position: "relative",
  // width: "100%",
  // selectors: {
  //   "&::after": {
  //     backgroundColor: theme.colors["brand.500"],
  //     borderRadius: "50%",
  //     content: "",
  //     display: "block",
  //     height: 11,
  //     width: 11,
  //   },
  //   "&[data-disabled]::after": {
  //     backgroundColor: theme.colors["border.secondary"],
  //     borderRadius: "50%",
  //     content: "",
  //     display: "block",
  //     height: 11,
  //     width: 11,
  //   },
  // },
});
