const mapping = {
  "ax-box": "Box",
  "ax-button": "Button",
  "ax-paper": "Paper",
  "ax-tooltip": "Tooltip",
} as const;

function processNode(node: Node) {
  const nodeName = node.nodeName.toLowerCase();
  if (!(nodeName in mapping)) {
    return;
  }
  import(`./${mapping[nodeName as keyof typeof mapping]}.js`);
}

document.querySelectorAll("*").forEach(processNode);

new MutationObserver((records) => {
  records.forEach(({ addedNodes }) => {
    addedNodes.forEach(processNode);
  });
}).observe(document.body, { childList: true, subtree: true });
