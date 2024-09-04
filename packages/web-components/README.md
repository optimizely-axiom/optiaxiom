# Axiom Web Components

A framework agnostic variant of the Optimizely Design System.

## Getting Started

Please read the full [documentation](https://optimizely-axiom.github.io/optiaxiom/) for guides, examples, and API.

### Bundler usage

Use your favorite package manager to install the package:

```sh
npm install @optiaxiom/web-components
```

Wrap your application with `AxiomProvider` and simply import and use the components:

```tsx
import { AxiomProvider, Button } from "@optiaxiom/web-components";

function App() {
  return (
    <AxiomProvider>
      <Button>Hello World!</Button>
    </AxiomProvider>
  );
}
```

### CDN usage

Use your favorite CDN to import the package:

```html
<script
  <!-- Make sure to replace `latest` with a fixed version number. -->
  src="https://cdn.jsdelivr.net/npm/@optiaxiom/web-components@latest/dist/index.js"
  type="module"
></script>
```

Wrap your application with `ax-axiom-provider` element and then use all components available under the `ax-*` prefix:

```html
<ax-axiom-provider>
  <ax-button>Hello World!</ax-button>
</ax-axiom-provider>
```

## Lazy loading

By default the index entry of the library lazy loads components to avoid loading the full bundle on page load.

```html
<script
  src="https://cdn.jsdelivr.net/npm/@optiaxiom/web-components@latest/dist/index.js" <!-- `index.js` entry -->
  type="module"
></script>

<!--
  The script for `ax-button` is not loaded until an element is inserted into
  the DOM.
-->
<ax-button>Hello World!</ax-button>
```

We use proxy components to detect when an `ax-*` element is connected in the DOM and only then load the actual code for the corresponding component.

### Explicit loading

If you know which components you need beforehand you can use path exports to explicitly load the code.

#### Bundler

```tsx
import { Button } from "@optiaxiom/web-components/Button";

function App() {
  return <Button>Hello World!</Button>;
}
```

#### CDN

```html
<script
  src="https://cdn.jsdelivr.net/npm/@optiaxiom/web-components@latest/dist/components/Button.js" <!-- `Button.js` entry -->
  type="module"
></script>

<!--
  The script for `ax-button` has been explicitly loaded and the component is immediately defined.
-->
<ax-button>Hello World!</ax-button>
```

## Slots

We use `Shadow DOM` for our web components and support slot usages for components.

Simply set the `slot` attribute to the corresponding prop name in your HTML.

```html
<ax-input>
  <svg slot="startDecorator">
    <!-- ... -->
  </svg>
</ax-input>
```
