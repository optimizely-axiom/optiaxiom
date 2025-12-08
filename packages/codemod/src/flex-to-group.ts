#!/usr/bin/env node
import type { API, FileInfo } from "jscodeshift";

/**
 * Codemod to migrate from Flex to Group component.
 *
 * Transformations:
 * - <Flex> → <Group flexDirection="column" gap="16">
 * - <Flex flexDirection="row"> → <Group gap="16">
 * - <Flex flexDirection="column"> → <Group flexDirection="column" gap="16">
 * - Updates imports: Flex → Group
 * - Preserves all other props
 */
export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;

  // Find all imports from @optiaxiom/react that include Flex
  root
    .find(j.ImportDeclaration, {
      source: { value: "@optiaxiom/react" },
    })
    .forEach((path) => {
      const importDeclaration = path.node;
      const specifiers = importDeclaration.specifiers;

      if (!specifiers) return;

      // Check if Flex is imported
      const hasFlexImport = specifiers.some(
        (spec) =>
          spec.type === "ImportSpecifier" &&
          spec.imported.type === "Identifier" &&
          spec.imported.name === "Flex",
      );

      if (hasFlexImport) {
        // Check if Group is already imported
        const hasGroupImport = specifiers.some(
          (spec) =>
            spec.type === "ImportSpecifier" &&
            spec.imported.type === "Identifier" &&
            spec.imported.name === "Group",
        );

        if (!hasGroupImport) {
          // Add Group import
          specifiers.push(
            j.importSpecifier(j.identifier("Group"), j.identifier("Group")),
          );
          modified = true;
        }
      }
    });

  // Find all JSX elements with Flex
  root.find(j.JSXElement).forEach((path) => {
    const openingElement = path.node.openingElement;

    if (
      openingElement.name.type !== "JSXIdentifier" ||
      openingElement.name.name !== "Flex"
    ) {
      return;
    }

    // Get flexDirection attribute if it exists
    const flexDirectionAttr = openingElement.attributes?.find(
      (attr) =>
        attr.type === "JSXAttribute" &&
        attr.name.type === "JSXIdentifier" &&
        attr.name.name === "flexDirection",
    );

    // Get gap attribute if it exists
    const gapAttr = openingElement.attributes?.find(
      (attr) =>
        attr.type === "JSXAttribute" &&
        attr.name.type === "JSXIdentifier" &&
        attr.name.name === "gap",
    );

    let flexDirectionValue: null | string = null;
    if (flexDirectionAttr && flexDirectionAttr.type === "JSXAttribute") {
      if (
        flexDirectionAttr.value?.type === "StringLiteral" ||
        flexDirectionAttr.value?.type === "Literal"
      ) {
        flexDirectionValue = String(flexDirectionAttr.value.value);
      } else if (flexDirectionAttr.value?.type === "JSXExpressionContainer") {
        const expression = flexDirectionAttr.value.expression;
        if (
          expression.type === "StringLiteral" ||
          expression.type === "Literal"
        ) {
          flexDirectionValue = String(expression.value);
        }
      }
    }

    // Rename Flex to Group
    openingElement.name.name = "Group";
    if (path.node.closingElement) {
      path.node.closingElement.name = j.jsxIdentifier("Group");
    }

    // Add default props based on Flex behavior
    if (!openingElement.attributes) {
      openingElement.attributes = [];
    }

    // If no flexDirection was specified, add flexDirection="column" and gap="16"
    if (!flexDirectionAttr) {
      // Add gap first (at the beginning)
      if (!gapAttr) {
        openingElement.attributes.unshift(
          j.jsxAttribute(j.jsxIdentifier("gap"), j.stringLiteral("16")),
        );
      }

      // Then add flexDirection (so it appears before gap)
      openingElement.attributes.unshift(
        j.jsxAttribute(
          j.jsxIdentifier("flexDirection"),
          j.stringLiteral("column"),
        ),
      );
    }
    // If flexDirection="row", remove it (Group's default)
    else if (flexDirectionValue === "row") {
      openingElement.attributes = openingElement.attributes.filter(
        (attr) =>
          !(
            attr.type === "JSXAttribute" &&
            attr.name.type === "JSXIdentifier" &&
            attr.name.name === "flexDirection"
          ),
      );

      // Add gap="16" at the beginning if not already present (Flex had default gap)
      if (!gapAttr) {
        openingElement.attributes.unshift(
          j.jsxAttribute(j.jsxIdentifier("gap"), j.stringLiteral("16")),
        );
      }
    }
    // If flexDirection is column, row-reverse, or column-reverse, keep it
    // Add gap="16" at the beginning if not already present (Flex had default gap)
    else if (!gapAttr) {
      openingElement.attributes.unshift(
        j.jsxAttribute(j.jsxIdentifier("gap"), j.stringLiteral("16")),
      );
    }

    modified = true;
  });

  return modified ? root.toSource() : null;
}
