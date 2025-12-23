import { Fragment, type ReactNode } from "react";

import type {
  BlockActionData,
  BlockDocumentRendererProps,
  BlockNode,
} from "./types";

import { Card } from "../card";
import { Flex } from "../flex";
import { BlockAction } from "./BlockAction";
import { BlockCancelAction } from "./BlockCancelAction";
import { BlockField } from "./BlockField";
import { BlockGroup } from "./BlockGroup";
import { BlockHeading } from "./BlockHeading";
import { BlockInput } from "./BlockInput";
import { BlockText } from "./BlockText";
import { BlockTextarea } from "./BlockTextarea";
import {
  renderFallbackDisplay,
  validateBlockDocument,
  validateBlockElement,
} from "./validation";

export function BlockDocumentRenderer({
  data = {},
  element,
  onAction,
  onCancelAction,
  onDataChange,
  readonly = false,
}: BlockDocumentRendererProps) {
  // Validate document immediately
  const validationResult = validateBlockDocument(element);

  if (!validationResult.success) {
    // Complete failure: show fallback display
    return renderFallbackDisplay(element);
  }

  // Use validated element from this point forward
  const validatedElement = validationResult.data;

  const handleDataChange = (name: string, newValue: string) => {
    onDataChange?.({ ...data, [name]: newValue });
  };

  const handleAction = (actionName: string) => {
    onAction?.(actionName);
  };

  const handleCancelAction = (text: string) => {
    onCancelAction?.(text);
  };

  const renderChildren = (children: BlockNode): ReactNode => {
    if (typeof children === "string") {
      return children;
    }

    if (Array.isArray(children)) {
      return <>{children.map((child, i) => renderNode(child, i))}</>;
    }

    return renderNode(children, 0);
  };

  const renderNode = (node: BlockNode, index: number): ReactNode => {
    if (typeof node === "string") {
      return <Fragment key={index}>{node}</Fragment>;
    }

    if (Array.isArray(node)) {
      return (
        <Fragment key={index}>
          {node.map((item, i) => renderNode(item, i))}
        </Fragment>
      );
    }

    return renderElement(node, index);
  };

  const renderElement = (el: unknown, index: number): ReactNode => {
    // Validate element before rendering
    const validationResult = validateBlockElement(el, index);

    if (!validationResult.success) {
      // Graceful degradation: skip this element, continue with siblings
      return null;
    }

    const validElement = validationResult.data;
    const key = `${validElement.$type}-${index}`;

    switch (validElement.$type) {
      case "Block.Field": {
        let inputId: string | undefined;
        const children = Array.isArray(validElement.children)
          ? validElement.children
          : [validElement.children];
        for (const child of children) {
          if (typeof child === "object" && !Array.isArray(child)) {
            if (
              child.$type === "Block.Input" ||
              child.$type === "Block.Textarea"
            ) {
              inputId = child.name;
              break;
            }
          }
        }

        return (
          <BlockField
            description={validElement.description}
            error={validElement.error}
            info={validElement.info}
            inputId={inputId}
            key={key}
            label={validElement.label}
            required={validElement.required}
          >
            {renderChildren(validElement.children)}
          </BlockField>
        );
      }

      case "Block.Group":
        return (
          <BlockGroup
            flexDirection={validElement.flexDirection}
            gap={validElement.gap}
            key={key}
          >
            {renderChildren(validElement.children)}
          </BlockGroup>
        );

      case "Block.Heading":
        return (
          <BlockHeading key={key} level={validElement.level}>
            {renderChildren(validElement.children)}
          </BlockHeading>
        );

      case "Block.Input":
        return (
          <BlockInput
            key={key}
            name={validElement.name}
            onChange={(newValue) =>
              handleDataChange(validElement.name, newValue)
            }
            placeholder={validElement.placeholder}
            readOnly={readonly}
            value={data[validElement.name] || validElement.value || ""}
          />
        );

      case "Block.Text":
        return (
          <BlockText color={validElement.color} key={key}>
            {renderChildren(validElement.children)}
          </BlockText>
        );

      case "Block.Textarea":
        return (
          <BlockTextarea
            key={key}
            name={validElement.name}
            onChange={(newValue) =>
              handleDataChange(validElement.name, newValue)
            }
            placeholder={validElement.placeholder}
            readOnly={readonly}
            rows={validElement.rows}
            value={data[validElement.name] || validElement.value || ""}
          />
        );

      default:
        return null;
    }
  };

  const renderActions = (actions: BlockActionData[] | undefined) => {
    if (!actions || actions.length === 0) return null;
    if (readonly) return null;

    return (
      <Flex flexDirection="row" gap="8">
        {actions.map((action, index) => {
          if (action.$type === "Block.Action") {
            return (
              <BlockAction
                appearance={action.appearance}
                key={`action-${index}`}
                name={action.name}
                onClick={() => handleAction(action.name)}
              >
                {renderChildren(action.children)}
              </BlockAction>
            );
          }

          return (
            <BlockCancelAction
              key={`cancel-action-${index}`}
              onSubmit={handleCancelAction}
            >
              {renderChildren(action.children)}
            </BlockCancelAction>
          );
        })}
      </Flex>
    );
  };

  return (
    <Card flexDirection="column" gap="16" w="full">
      {validatedElement.children.map((child, index) =>
        renderNode(child, index),
      )}
      {renderActions(validatedElement.actions)}
    </Card>
  );
}

BlockDocumentRenderer.displayName = "@optiaxiom/react/BlockDocumentRenderer";
