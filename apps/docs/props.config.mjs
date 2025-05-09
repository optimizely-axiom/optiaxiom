export default {
  sprinkles: {
    alignItems: [
      {
        path: "/align-items/",
        props: ["alignItems"],
      },
    ],
    alignSelf: [
      {
        path: "/align-self/",
        props: ["alignSelf"],
      },
    ],
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
    display: [
      {
        path: "/display/",
        props: ["display"],
      },
    ],
    flex: [
      {
        path: "/flex/",
        props: ["flex"],
      },
    ],
    flexDirection: [
      {
        path: "/flex-direction/",
        props: ["flexDirection"],
      },
    ],
    flexWrap: [
      {
        path: "/flex-wrap/",
        props: ["flexWrap"],
      },
    ],
    justifyContent: [
      {
        path: "/justify-content/",
        props: ["justifyContent"],
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
    fontWeight: {
      path: "/font-weight/",
      props: ["fontWeight"],
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
