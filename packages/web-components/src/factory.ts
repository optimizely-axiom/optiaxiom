import type { components } from "./mapping";

type Component = {
  connectedCallback: () => void;
  disconnectedCallback: () => void;
  ref: { current: HTMLInputElement | null };
};

export const formAssociated: Set<string> = new Set([
  "ax-checkbox",
  "ax-input",
  "ax-radio",
  "ax-search-input",
  "ax-switch",
  "ax-textarea",
]) satisfies typeof components;

export const factory = (
  name: string,
  spec: ((element: HTMLElement) => Component) | string,
  propTypes: Record<string, unknown>,
): CustomElementConstructor => {
  const AxiomHTMLElement = class extends HTMLElement {
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
      for (const prop of Object.keys(propTypes)) {
        if (!(prop in this)) {
          // @ts-expect-error -- too complex
          this[prop] = undefined;
        }
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

  return formAssociated.has(name)
    ? class extends AxiomHTMLElement {
        static formAssociated = true;

        get checked() {
          return this._component?.ref.current
            ? this._component.ref.current.checked
            : this.#_checked;
        }
        set checked(checked) {
          if (this._component?.ref.current) {
            this._component.ref.current.checked = checked ?? false;
          } else {
            this.#_checked = checked;
          }
        }
        get form() {
          return this.#internals.form;
        }
        get name() {
          return this.getAttribute("name");
        }
        get type() {
          return this.localName;
        }
        get validationMessage() {
          return this.#internals.validationMessage;
        }
        get validity() {
          return this.#internals.validity;
        }
        get value() {
          return this._component?.ref.current
            ? this._component.ref.current.value
            : this.#_value;
        }
        set value(value) {
          if (this._component?.ref.current) {
            this._component.ref.current.value = value ?? "";
          } else {
            this.#_value = value;
          }
        }
        get willValidate() {
          return this.#internals.willValidate;
        }

        #_checked?: boolean;
        #_value?: string;
        #internals;

        constructor() {
          super();
          this.#internals = this.attachInternals();
        }

        build(
          builder: (
            element: HTMLElement,
            internals: ElementInternals,
          ) => Component,
        ) {
          return builder(this, this.#internals);
        }

        checkValidity() {
          return this.#internals.checkValidity();
        }

        reportValidity() {
          return this.#internals.reportValidity();
        }
      }
    : AxiomHTMLElement;
};
