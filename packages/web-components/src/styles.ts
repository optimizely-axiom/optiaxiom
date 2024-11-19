const styles: string[] = [
  `slot[name]::slotted(*) {
  display: inline-flex;
  height: 100%;
  width: 100%;
}`,
];

export const styleSheet = new CSSStyleSheet();

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
  styles.push(
    text.replaceAll(/Fira Code Variable|InterVariable/g, (m) => `${uuid} ${m}`),
  );
  void styleSheet.replace(styles.join("\n"));
}
