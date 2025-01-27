export const forceValueChange = (input: HTMLInputElement, value: string) => {
  Object.getOwnPropertyDescriptor(
    input.constructor.prototype,
    "value",
  )?.set?.call(input, value);
  input.dispatchEvent(new Event("change", { bubbles: true }));
};
