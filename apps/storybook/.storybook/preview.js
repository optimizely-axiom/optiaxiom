// eslint-disable-next-line @typescript-eslint/no-var-requires
const components = require("@optiaxiom/react");
for (const c in components) {
  // eslint-disable-next-line no-undef
  window[c] = components[c];
}
require("raw-loader!@optiaxiom/react/dist/index.d.ts");
