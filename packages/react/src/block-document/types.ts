/**
 * Block Document JSON schema types
 */

export type BlockActionData = BlockActionElement | BlockCancelActionElement;

export type BlockActionElement = {
  /**
   * Element type identifier
   */
  $type: "Block.Action";
  /**
   * Visual appearance of the action button
   */
  appearance?: "danger" | "default" | "primary" | "subtle";
  /**
   * Button label content
   */
  children: BlockNode;
  /**
   * Unique identifier for this action
   */
  name: string;
};

export type BlockCancelActionElement = {
  /**
   * Element type identifier
   */
  $type: "Block.CancelAction";
  /**
   * Button label content
   */
  children: BlockNode;
};

export type BlockDocumentElement = {
  /**
   * Element type identifier
   */
  $type: "Block.Document";
  /**
   * Action buttons displayed at the bottom of the document
   */
  actions?: BlockActionData[];
  /**
   * Whether the document blocks the chat prompt (forces interaction)
   */
  blocking?: boolean;
  /**
   * Child elements to render in the document body
   */
  children: BlockNode[];
  /**
   * Block Document specification version
   */
  version: "1.0";
};

export type BlockDocumentRendererProps = {
  /**
   * Current form data (flat object, FormData-like)
   */
  data?: Record<string, string>;
  /**
   * The Block document to render
   */
  element: BlockDocumentElement;
  /**
   * Callback when user clicks a Block.Action button
   */
  onAction?: (actionName: string) => void;
  /**
   * Callback when user submits the CancelAction input
   */
  onCancelAction?: (prompt: string) => void;
  /**
   * Callback when form fields change
   */
  onDataChange?: (data: Record<string, string>) => void;
  /**
   * Whether form is readonly
   */
  readonly?: boolean;
};

export type BlockElement =
  | BlockFieldElement
  | BlockGroupElement
  | BlockHeadingElement
  | BlockInputElement
  | BlockTextareaElement
  | BlockTextElement;

export type BlockFieldElement = {
  /**
   * Element type identifier
   */
  $type: "Block.Field";
  /**
   * Form field child elements
   */
  children: BlockNode;
  /**
   * Help text displayed below the field
   */
  description?: string;
  /**
   * Error message displayed when validation fails
   */
  error?: string;
  /**
   * Info text displayed as a tooltip or help icon
   */
  info?: string;
  /**
   * Label text displayed above the field
   */
  label?: string;
  /**
   * Whether this field is required
   */
  required?: boolean;
};

export type BlockGroupElement = {
  /**
   * Element type identifier
   */
  $type: "Block.Group";
  /**
   * Child elements to render in the group
   */
  children: BlockNode;
  /**
   * Layout direction for child elements
   */
  flexDirection?: "horizontal" | "vertical";
  /**
   * Spacing between child elements
   */
  gap?: "lg" | "md" | "sm" | "xl" | "xs";
};

export type BlockHeadingElement = {
  /**
   * Element type identifier
   */
  $type: "Block.Heading";
  /**
   * Heading content
   */
  children: BlockNode;
  /**
   * Heading level (1-4) that controls semantic tag and font size
   */
  level?: 1 | 2 | 3 | 4;
};

export type BlockInputElement = {
  /**
   * Element type identifier
   */
  $type: "Block.Input";
  /**
   * Unique identifier for this input field
   */
  name: string;
  /**
   * Placeholder text shown when input is empty
   */
  placeholder?: string;
  /**
   * Initial or current value of the input
   */
  value?: string;
};

export type BlockNode = BlockElement | BlockElement[] | string;

export type BlockTextareaElement = {
  /**
   * Element type identifier
   */
  $type: "Block.Textarea";
  /**
   * Unique identifier for this textarea field
   */
  name: string;
  /**
   * Placeholder text shown when textarea is empty
   */
  placeholder?: string;
  /**
   * Number of visible text rows
   */
  rows?: number;
  /**
   * Initial or current value of the textarea
   */
  value?: string;
};

export type BlockTextElement = {
  /**
   * Element type identifier
   */
  $type: "Block.Text";
  /**
   * Text content
   */
  children: BlockNode;
  /**
   * Text color variant
   */
  color?: "default" | "secondary" | "tertiary";
};
