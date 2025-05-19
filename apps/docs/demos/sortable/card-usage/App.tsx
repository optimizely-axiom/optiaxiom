"use client";

import { Button, EllipsisMenuButton, Flex, Text } from "@optiaxiom/react";
import {
  Card,
  CardHeader,
  CardLink,
  Menu,
  MenuContent,
  MenuTrigger,
  Sortable,
  SortableElement,
  SortableHandle,
  SortableItem,
} from "@optiaxiom/react/unstable";
import { IconGripVertical } from "@tabler/icons-react";
import { useState } from "react";

import { data } from "./data";

export function App() {
  const [items, setItems] = useState(data);

  return (
    <Sortable onValueChange={setItems} value={items}>
      <Flex>
        {items.map((item, index) => (
          <SortableItem asChild index={index} item={item} key={item.id}>
            <Flex flexDirection="row">
              <Text color="fg.secondary" fontSize="md" w="20">
                {index + 1}
              </Text>
              <SortableElement asChild>
                <Card flex="1">
                  <CardHeader
                    addonAfter={
                      <Menu options={[{ label: "Edit" }]}>
                        <MenuTrigger asChild>
                          <EllipsisMenuButton appearance="subtle" ml="auto" />
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
                        <Button
                          appearance="subtle"
                          icon={<IconGripVertical />}
                        />
                      </SortableHandle>
                    }
                    description={item.description}
                  >
                    <CardLink href="data:,">{item.title}</CardLink>
                  </CardHeader>
                </Card>
              </SortableElement>
            </Flex>
          </SortableItem>
        ))}
      </Flex>
    </Sortable>
  );
}
