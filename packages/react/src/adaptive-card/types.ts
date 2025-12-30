/**
 * Adaptive Card JSON schema types
 */

export type AdaptiveCardActionData =
  | ExecuteActionElement
  | OpenUrlActionElement
  | SubmitActionElement;

export type AdaptiveCardData = {
  actions?: AdaptiveCardActionData[];
  body?: AdaptiveCardElement[];
  /**
   * Optional header
   */
  header?: {
    description?: string;
    title: string;
  };
  type: "AdaptiveCard";
  version: string;
};

export type AdaptiveCardElement =
  | ContainerElement
  | FactSetElement
  | ImageElement
  | InputCheckboxElement
  | InputDateElement
  | InputNumberElement
  | InputRadioGroupElement
  | InputTextElement
  | InputToggleElement
  | TextBlockElement;

export type AdaptiveCardProps = {
  /**
   * Adaptive Card JSON to render
   */
  card: AdaptiveCardData;
  /**
   * Callback when an action is triggered
   */
  onAction?: (actionType: string, data?: Record<string, unknown>) => void;
};

export type ContainerElement = {
  items: AdaptiveCardElement[];
  style?: "danger" | "information" | "neutral" | "success" | "warning";
  type: "Container";
};

export type ExecuteActionElement = {
  data?: Record<string, unknown>;
  title: string;
  type: "Action.Execute";
  verb: string;
};

export type FactSetElement = {
  facts: Array<{
    title: string;
    value: string;
  }>;
  type: "FactSet";
};

export type ImageElement = {
  altText?: string;
  size?: "large" | "medium" | "small";
  type: "Image";
  url: string;
};

export type InputCheckboxElement = {
  choices: Array<{
    title: string;
    value: string;
  }>;
  id: string;
  isRequired?: boolean;
  label?: string;
  type: "Input.Checkbox";
};

export type InputDateElement = {
  id: string;
  isRequired?: boolean;
  label?: string;
  type: "Input.Date";
};

export type InputNumberElement = {
  id: string;
  isRequired?: boolean;
  label?: string;
  max?: number;
  maxLength?: number;
  min?: number;
  placeholder?: string;
  type: "Input.Number";
  value?: number;
};

export type InputRadioGroupElement = {
  choices: Array<{
    title: string;
    value: string;
  }>;
  id: string;
  isRequired?: boolean;
  label?: string;
  type: "Input.RadioGroup";
};

export type InputTextElement = {
  id: string;
  isMultiline?: boolean;
  isRequired?: boolean;
  label?: string;
  maxLength?: number;
  placeholder?: string;
  type: "Input.Text";
};

export type InputToggleElement = {
  id: string;
  title: string;
  type: "Input.Toggle";
  value?: string;
  valueOff?: string;
  valueOn?: string;
};

export type OpenUrlActionElement = {
  title: string;
  type: "Action.OpenUrl";
  url: string;
};

export type SubmitActionElement = {
  data?: Record<string, unknown>;
  title: string;
  type: "Action.Submit";
};

export type TextBlockElement = {
  color?:
    | "accent"
    | "attention"
    | "dark"
    | "default"
    | "good"
    | "light"
    | "warning";
  size?: "default" | "extraLarge" | "large" | "medium" | "small";
  text: string;
  type: "TextBlock";
  weight?: "bolder" | "default" | "lighter";
  wrap?: boolean;
};
