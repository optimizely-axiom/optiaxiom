import { mapping } from "./mapping";

function processNode(node: Node) {
  const nodeName = node.nodeName.toLowerCase();
  if (!(nodeName in mapping)) {
    return;
  }
  void import(`./components/${mapping[nodeName as keyof typeof mapping]}.js`);
}

document.querySelectorAll("*").forEach(processNode);

new MutationObserver((records) => {
  records.forEach(({ addedNodes }) => {
    addedNodes.forEach(processNode);
  });
}).observe(document.body, { childList: true, subtree: true });
