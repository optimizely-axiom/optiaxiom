export const sheets: CSSStyleSheet[] = [];

export function injectStyle(text: string) {
  const sheet = new CSSStyleSheet();
  void sheet.replace(text);
  sheets.push(sheet);

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
