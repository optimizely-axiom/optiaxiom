import { App, PostMessageTransport } from "@modelcontextprotocol/ext-apps";

const app = new App({ name: "Opal Widget", version: "1.0.0" }, {});

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

// @ts-expect-error -- injected
window.openai = {
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
  openExternal: (args: { href: string }) => app.openLink({ url: args.href }),
  sendFollowUpMessage: (args: { prompt: string }) =>
    app.sendMessage({
      content: [
        {
          text: args.prompt,
          type: "text",
        },
      ],
      role: "user",
    }),
};

const transport = new PostMessageTransport(window.parent, window.parent);
void app.connect(transport);
