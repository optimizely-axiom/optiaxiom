/** @type {import('nextra-theme-docs').DocsThemeConfig} */
export default {
  docsRepositoryBase:
    "https://github.com/optimizely-axiom/optiaxiom/tree/main/apps/docs",
  footer: {
    text: <span>Copyright {new Date().getFullYear()} © Optimizely.</span>,
  },
  logo: <strong>Axiom Design System</strong>,
  project: {
    link: "https://github.com/optimizely-axiom/optiaxiom",
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Axiom",
    };
  },
};
