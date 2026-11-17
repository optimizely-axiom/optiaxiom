import { IconFileLines, IconFolder } from "@optiaxiom/icons";
import { Tree } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Tree
      aria-label="Pages"
      defaultExpanded={["website"]}
      options={[
        {
          addon: <IconFolder />,
          children: [
            { addon: <IconFileLines />, label: "About us", value: "about" },
            {
              addon: <IconFileLines />,
              disabledReason: "You don't have access to this page",
              label: "Careers",
              value: "careers",
            },
            { addon: <IconFileLines />, label: "Contact", value: "contact" },
          ],
          label: "Website",
          value: "website",
        },
      ]}
      w="224"
    />
  );
}
