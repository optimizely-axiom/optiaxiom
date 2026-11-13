import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./index";

describe("Tabs", () => {
  function setup() {
    const onValueChange = vi.fn();

    function Settings() {
      const [value, setValue] = useState("profile");

      return (
        <Tabs
          onValueChange={(value) => {
            setValue(value);
            onValueChange(value);
          }}
          value={value}
        >
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">Profile settings</TabsContent>
          <TabsContent value="billing">Billing settings</TabsContent>
        </Tabs>
      );
    }

    return { ...render(<Settings />), onValueChange };
  }

  it("switches to the clicked tab when controlled", async () => {
    const { onValueChange, user } = setup();

    await user.click(screen.getByRole("tab", { name: "Billing" }));

    expect(onValueChange).toHaveBeenCalledWith("billing");
    expect(screen.getByRole("tab", { name: "Billing" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Billing settings");
  });
});
