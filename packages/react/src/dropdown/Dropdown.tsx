import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { forwardRef, type ComponentPropsWithRef, type ReactNode } from 'react';
import { Box } from '../box';


type DropdownProps =
  ComponentPropsWithRef<typeof Box> &
  {
    trigger: ReactNode;
    label: string;
  };

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ trigger }) => {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Box >
            {trigger}
          </Box>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item >Edit</DropdownMenu.Item>
          <DropdownMenu.Item >Duplicate</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Archive</DropdownMenu.Item>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
              <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

              <DropdownMenu.Separator />
              <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator />
          <DropdownMenu.Item>Share</DropdownMenu.Item>
          <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item color="red">
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  });

Dropdown.displayName = "@optiaxiom/react/Dropdown";

