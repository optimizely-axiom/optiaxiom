export const buildSurfacePath = (
  basePath: string | undefined,
  surface: {
    name: string;
    type: string;
  },
) => {
  return `${basePath ? `${basePath}/` : ""}${surface.type}<${surface.name}>`;
};
