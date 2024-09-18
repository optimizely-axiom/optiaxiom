export const rem = <P extends `${string}px`>(px: P) =>
  `${parseFloat((parseFloat(px.slice(0, -2)) / 16).toFixed(3))}rem` as P;
