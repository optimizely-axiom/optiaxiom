import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../../vitest.rtl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./index";

function Settings({
  onValueChange,
}: {
  onValueChange: (value: string) => void;
}) {
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

describe("Tabs", () => {
  it("switches to the clicked tab when controlled", async () => {
    const onValueChange = vi.fn();
    const { user } = render(<Settings onValueChange={onValueChange} />);

    await user.click(screen.getByRole("tab", { name: "Billing" }));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith("billing");
    expect(screen.getByRole("tab", { name: "Billing" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Billing settings");
  });
});
