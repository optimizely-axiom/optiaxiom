type Component = {
  connectedCallback: () => void;
  disconnectedCallback: () => void;
};

export const factory = (
  spec: ((element: HTMLElement) => Component) | string,
): CustomElementConstructor => {
  return class extends HTMLElement {
    _component?: Component;

    #connected = false;
    #disconnected = false;
    #loader: Promise<void>;

    constructor() {
      super();
      if (typeof spec === "string") {
        this.#loader = import(`./components/${spec}.js`).then((mod) => {
          this._component = this.build(mod.default);
        });
      } else {
        this.#loader = Promise.resolve();
        this._component = this.build(spec);
      }
    }

    build(builder: (element: HTMLElement) => Component) {
      return builder(this);
    }

    connectedCallback() {
      if (typeof spec === "string") {
        if (this.#disconnected) {
          return;
        }

        this.style.visibility = "hidden";
        void this.#loader.then(() => {
          if (this.#disconnected) {
            return;
          }

          this.style.visibility = "";

          this._component?.connectedCallback();
          this.#connected = true;

          this.classList.add("hydrated");
        });
      } else {
        this._component?.connectedCallback();
      }
    }

    disconnectedCallback() {
      if (typeof spec === "string") {
        if (!this.#connected) {
          this.#disconnected = true;
          return;
        }

        void this.#loader.then(() => {
          this._component?.disconnectedCallback();
        });
      } else {
        this._component?.disconnectedCallback();
      }
    }
  };
};
