export const sheets: CSSStyleSheet[] = [];

export function injectGlobalStyle(text: string) {
  const style = document.createElement("style");
  style.appendChild(
    document.createTextNode(
      text.replaceAll(
        /url\(["']?([^"')]+)["']?\)/g,
        (_, m1) => `url("${import.meta.resolve("./" + m1)}")`,
      ),
    ),
  );
  document.head.append(style);
}

export function injectLocalStyle(text: string) {
  const sheet = new CSSStyleSheet();
  void sheet.replace(text);
  sheets.push(sheet);
}
