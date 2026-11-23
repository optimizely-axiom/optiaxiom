import { IconFileLines, IconFolder } from "@optiaxiom/icons";
import { Tree } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Tree
      aria-label="Pages"
      defaultExpanded={["website", "products"]}
      defaultValue={["pricing"]}
      options={[
        {
          children: [
            {
              children: [
                {
                  icon: <IconFileLines />,
                  label: "Features",
                  value: "features",
                },
                {
                  icon: <IconFileLines />,
                  label: "Pricing",
                  value: "pricing",
                },
              ],
              icon: <IconFolder />,
              label: "Products",
              value: "products",
            },
            {
              icon: <IconFileLines />,
              label: "About us",
              value: "about",
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
        {
          icon: <IconFileLines />,
          label: "Landing page",
          value: "landing",
        },
      ]}
      w="224"
    />
  );
}
