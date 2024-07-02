import "@optiaxiom/web-components";
import { describe, expect, it } from "vitest";

import { render, screen, withinShadowRoot } from "../vitest.rtl";

const Button = "ax-button";

describe("Self-loading components", () => {
  function setup(overrides = {}) {
    return render(
      <Button appearance="primary" {...overrides}>
        Primary
      </Button>,
    );
  }

  it("should render properly", async () => {
    expect(customElements.get(Button)).not.to.exist;
    setup();
    await customElements.whenDefined(Button);
    expect(
      withinShadowRoot(screen.getByText("Primary")).getByText("Primary"),
    ).toBeInTheDocument();
  });
});
