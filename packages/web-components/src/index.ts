import { mapping } from "./mapping";

for (const [name, component] of Object.entries(mapping)) {
  if (!customElements.get(name)) {
    customElements.define(
      name,
      class extends HTMLElement {
        #connected = false;
        #disconnected = false;

        #internal?: {
          connectedCallback: () => void;
          disconnectedCallback: () => void;
        };
        #loader: Promise<void>;

        constructor() {
          super();
          this.#loader = import(`./components/${component}.js`).then((mod) => {
            this.#internal = mod.default(this);
          });
        }

        connectedCallback() {
          if (this.#disconnected) {
            return;
          }

          void this.#loader.then(() => {
            if (this.#disconnected) {
              return;
            }

            this.#internal?.connectedCallback();
            this.#connected = true;
          });
        }

        disconnectedCallback() {
          if (!this.#connected) {
            this.#disconnected = true;
            return;
          }

          void this.#loader.then(() => {
            this.#internal?.disconnectedCallback();
          });
        }
      },
    );
  }
}
