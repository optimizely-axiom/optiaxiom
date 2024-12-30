export default {
  sprinkles: {
    animation: [
      {
        path: "/animation/",
        props: ["animation"],
      },
    ],
    border: [
      {
        path: "/border-width/",
        props: ["border", "borderB", "borderL", "borderR", "borderT"],
      },
    ],
    spacing: [
      { path: "/gap/", props: ["gap"] },
      {
        path: "/margin/",
        props: ["m", "mb", "ml", "mr", "mt", "mx", "my"],
      },
      {
        path: "/padding/",
        props: ["p", "pb", "pl", "pr", "pt", "px", "py"],
      },
    ],
    transition: [
      {
        path: "/transition-property/",
        props: ["transition"],
      },
    ],
  },
  theme: {
    borderRadius: {
      path: "/border-radius/",
      props: ["rounded"],
    },
    boxShadow: {
      path: "/box-shadow/",
      props: ["shadow"],
    },
    colors: [
      {
        path: "/background-color/",
        props: ["bg"],
      },
      {
        path: "/border-color/",
        props: ["borderColor"],
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
    size: [
      { path: "/height/", props: ["h"] },
      { path: "/max-height/", props: ["maxH"] },
      { path: "/max-width/", props: ["maxW"] },
      { path: "/size/", props: ["size"] },
      { path: "/width/", props: ["w"] },
    ],
    zIndex: {
      path: "/z-index/",
      props: ["z"],
    },
  },
};
