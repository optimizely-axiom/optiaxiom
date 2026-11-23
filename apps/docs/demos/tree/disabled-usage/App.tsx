import { IconFileLines, IconFolder } from "@optiaxiom/icons";
import { Tree } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Tree
      aria-label="Pages"
      defaultExpanded={["website"]}
      options={[
        {
          children: [
            {
              icon: <IconFileLines />,
              label: "About us",
              value: "about",
            },
            {
              disabledReason: "You don't have access to this page",
              icon: <IconFileLines />,
              label: "Careers",
              value: "careers",
            },
            {
              icon: <IconFileLines />,
              label: "Contact",
              value: "contact",
            },
          ],
          icon: <IconFolder />,
          label: "Website",
          value: "website",
        },
      ]}
      w="224"
    />
  );
}
