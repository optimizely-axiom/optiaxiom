let React;

const widgetStyle = {
  background: "#f5f3ff",
  border: "2px dashed #4f46e5",
  borderRadius: 8,
  fontFamily: "sans-serif",
  padding: 16,
};
const headerStyle = { fontWeight: 600, marginBottom: 8 };
const dataWrapperStyle = { fontSize: 13, marginBottom: 12 };
const preStyle = {
  background: "#ede9fe",
  borderRadius: 4,
  maxHeight: 120,
  overflow: "auto",
  padding: 8,
};
const buttonStyle = {
  background: "#4f46e5",
  border: "none",
  borderRadius: 4,
  color: "white",
  cursor: "pointer",
  padding: "6px 12px",
};

function Widget({ data, onEvent }) {
  const h = React.createElement;
  return h("div", { style: widgetStyle }, [
    h("div", { key: "title", style: headerStyle }, "Federated Widget (remote)"),
    h("div", { key: "data", style: dataWrapperStyle }, [
      h("strong", { key: "label" }, "Received data:"),
      h("pre", { key: "json", style: preStyle }, JSON.stringify(data, null, 2)),
    ]),
    h(
      "button",
      {
        key: "btn",
        onClick: () =>
          onEvent({
            interaction: "widget-click",
            params: { source: "federated-widget" },
          }),
        style: buttonStyle,
      },
      "Send Event",
    ),
  ]);
}

const modules = {
  ".": () => ({ default: Widget }),
  "./App": () => ({ default: Widget }),
  "./Dashboard": () => ({ default: Widget }),
};

export function get(id) {
  if (!(id in modules)) {
    throw new Error(`Module ${id} not found in federated-widget`);
  }
  return modules[id];
}

export function init(shareScope) {
  if (shareScope && shareScope.react) {
    const versions = Object.keys(shareScope.react);
    if (versions.length > 0) {
      const entry = shareScope.react[versions[0]];
      const lib = typeof entry.lib === "function" ? entry.lib() : entry.lib;
      React = lib ?? entry;
    }
  }
}
