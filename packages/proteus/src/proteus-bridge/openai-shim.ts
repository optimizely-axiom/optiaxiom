import { App } from "@modelcontextprotocol/ext-apps";
import { PostMessageTransport } from "@modelcontextprotocol/ext-apps";

const app = new App({ name: "OpenAI-Compat-Widget", version: "1.0.0" }, {});

let toolInput: Record<string, unknown> = {};
let toolOutput: unknown = null;
let hostContext: Record<string, unknown> = {};

function dispatchGlobals() {
  window.dispatchEvent(
    new CustomEvent("openai:set_globals", {
      detail: {
        globals: {
          displayMode: hostContext.displayMode,
          locale: hostContext.locale,
          maxHeight: (
            hostContext.containerDimensions as Record<string, unknown>
          )?.maxHeight,
          toolInput,
          toolOutput,
        },
      },
    }),
  );
}

app.ontoolinput = (params) => {
  toolInput = params.arguments ?? {};
  dispatchGlobals();
};

app.ontoolresult = (params) => {
  toolOutput = params.content;
  dispatchGlobals();
};

app.onhostcontextchanged = (params) => {
  hostContext = { ...hostContext, ...params };
  dispatchGlobals();
};

(window as unknown as Record<string, unknown>).mcpApp = app;
(window as unknown as Record<string, unknown>).openai = {
  get displayMode() {
    return hostContext.displayMode;
  },
  get locale() {
    return hostContext.locale;
  },
  get maxHeight() {
    return (hostContext.containerDimensions as Record<string, unknown>)
      ?.maxHeight;
  },
  get toolInput() {
    return toolInput;
  },
  get toolOutput() {
    return toolOutput;
  },

  callTool: (name: string, args: Record<string, unknown>) =>
    app.callServerTool({ arguments: args, name }),
  openExternal: (args: string | { href: string }) =>
    app.openLink({ url: typeof args === "string" ? args : args.href }),
  requestClose: () => Promise.resolve(),
  requestDisplayMode: (mode?: "fullscreen" | "inline" | "pip") =>
    app.requestDisplayMode({ mode: mode ?? "inline" }),
  requestModal: () => Promise.resolve(),
  sendFollowUpMessage: (args: string | { prompt: string }) =>
    app.sendMessage({
      content: [
        {
          text: typeof args === "string" ? args : args.prompt,
          type: "text",
        },
      ],
      role: "user",
    }),
};

const transport = new PostMessageTransport(window.parent, window.parent);
void app.connect(transport);
