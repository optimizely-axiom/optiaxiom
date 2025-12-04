"use client";

import { Field, Flex, Input } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailError =
    email && !email.includes("@") ? "Please enter a valid email" : undefined;
  const passwordError =
    password && password.length < 8
      ? "Password must be at least 8 characters"
      : undefined;

  return (
    <Flex>
      <Field
        description="We'll never share your email with anyone else."
        error={emailError}
        label="Email address"
        required
      >
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          type="email"
          value={email}
        />
      </Field>

      <Field
        description="Must be at least 8 characters"
        error={passwordError}
        info="Choose a strong password to protect your account"
        label="Password"
        required
      >
        <Input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          type="password"
          value={password}
        />
      </Field>
    </Flex>
  );
}
