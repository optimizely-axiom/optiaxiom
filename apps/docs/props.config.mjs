export default {
  theme: {
    borderRadius: { path: "/border-radius/", props: ["rounded"] },
    borderWidth: {
      props: [
        "borderBottom",
        "borderLeft",
        "borderRight",
        "borderTop",
        "border",
      ],
    },
    colors: {
      path: "/colors/",
      props: ["bg", "color", "borderBottomColor"],
    },
    fontSize: { props: ["fontSize"] },
    letterSpacing: { props: ["tracking"] },
    maxWidth: { props: ["maxWidth"] },
    shadow: { props: ["shadow", "Paper[elevation]"] },
    size: { path: "/sizing/", props: ["gap", "h", "Box[size]", "w"] },
    space: {
      path: "/spacing/",
      props: [
        "m",
        "mb",
        "ml",
        "mr",
        "mt",
        "mx",
        "my",
        "p",
        "pb",
        "pl",
        "pr",
        "pt",
        "px",
        "py",
      ],
    },
  },
};
