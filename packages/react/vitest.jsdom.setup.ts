// The stubs the test-environments guide tells jsdom users to add.
globalThis.ResizeObserver ??= class {
  disconnect() {}
  observe() {}
  unobserve() {}
};
Element.prototype.hasPointerCapture ??= () => false;
Document.prototype.elementFromPoint ??= () => null;
