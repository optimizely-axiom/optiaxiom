type FederatedWidgetProps = {
  data: Record<string, unknown>;
  onEvent: (
    event:
      | { interaction: string; params?: Record<string, unknown> }
      | { message: string },
  ) => Promise<unknown>;
};

export default function Widget({ data, onEvent }: FederatedWidgetProps) {
  return (
    <div
      style={{
        background: "#f5f3ff",
        border: "2px dashed #4f46e5",
        borderRadius: 8,
        fontFamily: "sans-serif",
        padding: 16,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 8 }}>
        Federated Widget (remote)
      </div>
      <div style={{ fontSize: 13, marginBottom: 12 }}>
        <strong>Received data:</strong>
        <pre
          style={{
            background: "#ede9fe",
            borderRadius: 4,
            maxHeight: 120,
            overflow: "auto",
            padding: 8,
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
      <button
        onClick={() => {
          void onEvent({
            interaction: "widget-click",
            params: { source: "federated-widget" },
          });
        }}
        style={{
          background: "#4f46e5",
          border: "none",
          borderRadius: 4,
          color: "white",
          cursor: "pointer",
          padding: "6px 12px",
        }}
      >
        Send Event
      </button>
    </div>
  );
}
