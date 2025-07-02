import { Menu, MenuContent, MenuTrigger } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Menu
      options={[
        {
          keywords:
            "general weekends working days publishing budgeting financial default language business days",
          label: "Organization",
        },
        {
          keywords: "create workflow step substep placeholder tasks",
          label: "Workflows",
        },
        {
          keywords: "custom fields",
          label: "Fields",
        },
        {
          keywords:
            "form task campaign content model component types content types",
          label: "Templates",
        },
      ]}
    >
      <MenuTrigger>Profile</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
