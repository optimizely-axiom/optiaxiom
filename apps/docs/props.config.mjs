export default {
  theme: {
    borderRadius: {
      path: "/border-radius/",
      props: [
        "rounded",
        "roundedB",
        "roundedBL",
        "roundedBR",
        "roundedL",
        "roundedR",
        "roundedT",
        "roundedTL",
        "roundedTR",
      ],
    },
    borderWidth: {
      path: "/border-width/",
      props: [
        "borderBottom",
        "borderLeft",
        "borderRight",
        "borderTop",
        "border",
      ],
    },
    boxShadow: {
      path: "/box-shadow/",
      props: ["shadow", "Paper[elevation]"],
    },
    colors: {
      path: "/colors/",
      props: [
        "bg",
        "color",
        "borderBottomColor",
        "borderColor",
        "borderLeftColor",
        "borderRightColor",
        "borderTopColor",
      ],
    },
    fontFamily: {
      path: "/font-family/",
      props: ["fontFamily"],
    },
    fontSize: {
      path: "/font-size/",
      props: ["fontSize"],
    },
    letterSpacing: {
      path: "/letter-spacing/",
      props: ["tracking"],
    },
    lineHeight: {
      path: "/line-height/",
      props: ["leading"],
    },
    maxSize: {
      path: "/max-size/",
      props: ["maxH", "maxW"],
    },
    outlineColor: {
      path: "/outline-color/",
      props: ["outlineColor"],
    },
    outlineOffset: {
      path: "/outline-offset/",
      props: ["outlineOffset"],
    },
    outlineWidth: {
      path: "/outline-width/",
      props: ["outline"],
    },
    size: { path: "/size/", props: ["gap", "h", "Box[size]", "w"] },
    spacing: {
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
