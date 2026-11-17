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
          addon: <IconFolder />,
          children: [
            {
              addon: <IconFolder />,
              children: [
                {
                  addon: <IconFileLines />,
                  label: "Features",
                  value: "features",
                },
                {
                  addon: <IconFileLines />,
                  label: "Pricing",
                  value: "pricing",
                },
              ],
              label: "Products",
              value: "products",
            },
            { addon: <IconFileLines />, label: "About us", value: "about" },
            { addon: <IconFileLines />, label: "Contact", value: "contact" },
          ],
          label: "Website",
          value: "website",
        },
        { addon: <IconFileLines />, label: "Landing page", value: "landing" },
      ]}
      w="224"
    />
  );
}
