"use client";

import {
  Button,
  EllipsisMenuButton,
  Flex,
  Menu,
  MenuContent,
  MenuTrigger,
  Text,
} from "@optiaxiom/react";
import {
  Card,
  CardHeader,
  CardLink,
  Sortable,
  SortableHandle,
  SortableItem,
} from "@optiaxiom/react/unstable";
import { IconGripVertical } from "@tabler/icons-react";
import { useState } from "react";

import { data } from "./data";

export function App() {
  const [items, setItems] = useState(() => Object.keys(data));

  return (
    <Sortable items={items} onItemsChange={setItems}>
      {(items) =>
        items.map((item, index) => (
          <Flex flexDirection="row" key={item}>
            <Text color="fg.secondary" fontSize="md" w="20">
              {index + 1}
            </Text>
            <SortableItem asChild index={index} item={item}>
              <Card flex="1">
                <CardHeader
                  addonAfter={
                    <Menu options={[{ label: "Edit" }]}>
                      <MenuTrigger asChild>
                        <EllipsisMenuButton
                          appearance="subtle"
                          aria-label="actions"
                          ml="auto"
                        />
                      </MenuTrigger>
                      <MenuContent />
                    </Menu>
                  }
                  addonBefore={
                    <SortableHandle
                      asChild
                      color="fg.tertiary"
                      transition="colors"
                    >
                      <Button appearance="subtle" icon={<IconGripVertical />} />
                    </SortableHandle>
                  }
                  description={data[item].description}
                >
                  <CardLink href="data:,">{data[item].title}</CardLink>
                </CardHeader>
              </Card>
            </SortableItem>
          </Flex>
        ))
      }
    </Sortable>
  );
}
