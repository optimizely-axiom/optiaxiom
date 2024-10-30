const shadowRoots = new Set<ShadowRoot>();
const sheets: CSSStyleSheet[] = [];

const uuid = "ax" + crypto.getRandomValues(new Uint32Array(1))[0].toString(36);

export function injectGlobalStyle(text: string) {
  const style = document.createElement("style");
  style.appendChild(
    document.createTextNode(
      text
        .replaceAll(
          /font-family:\s?(Fira Code Variable|InterVariable+);/g,
          (_, m1) => `font-family: ${uuid} ${m1};`,
        )
        .replaceAll(
          /url\(["']?([^"')]+)["']?\)/g,
          (_, m1) => `url("${import.meta.resolve("./" + m1)}")`,
        ),
    ),
  );
  document.head.append(style);
}

export function injectLocalStyle(text: string) {
  const sheet = new CSSStyleSheet();
  void sheet.replace(
    text.replaceAll(/Fira Code Variable|InterVariable/g, (m) => `${uuid} ${m}`),
  );
  sheets.push(sheet);

  for (const shadowRoot of shadowRoots) {
    shadowRoot.adoptedStyleSheets = sheets;
  }
}

export function registerShadowRoot(shadowRoot: ShadowRoot) {
  shadowRoots.add(shadowRoot);
  shadowRoot.adoptedStyleSheets = sheets;
}

export function unregisterShadowRoot(shadowRoot: ShadowRoot) {
  shadowRoots.delete(shadowRoot);
}
