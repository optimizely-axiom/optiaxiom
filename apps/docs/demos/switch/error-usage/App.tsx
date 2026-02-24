"use client";

import { Field, Switch } from "@optiaxiom/react";

export function App() {
  return (
    <Field error="You must accept the terms to continue">
      <Switch>I accept the terms and conditions</Switch>
    </Field>
  );
}
