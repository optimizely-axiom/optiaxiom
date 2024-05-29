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
    colors: [
      {
        path: "/background-color/",
        props: ["bg"],
      },
      {
        path: "/border-color/",
        props: [
          "borderBColor",
          "borderColor",
          "borderLColor",
          "borderRColor",
          "borderTColor",
        ],
      },
      {
        path: "/text-color/",
        props: ["color"],
      },
    ],
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
    maxSize: [
      {
        path: "/max-height/",
        props: ["maxH"],
      },
      {
        path: "/max-width/",
        props: ["maxW"],
      },
    ],
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
    spacing: [
      {
        path: "/top-right-bottom-left/",
        props: ["bottom", "left", "inset", "insetX", "insetY", "right", "top"],
      },
      {
        path: "/margin/",
        props: ["m", "mb", "ml", "mr", "mt", "mx", "my"],
      },
      {
        path: "/padding/",
        props: ["p", "pb", "pl", "pr", "pt", "px", "py"],
      },
    ],
  },
};
