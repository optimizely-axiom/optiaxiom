import { factory } from "./factory";
import { mapping } from "./mapping";

for (const [name, component] of Object.entries(mapping)) {
  if (!customElements.get(name)) {
    customElements.define(name, factory(component));
  }
}
