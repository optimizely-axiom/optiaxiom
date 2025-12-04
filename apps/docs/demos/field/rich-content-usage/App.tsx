import { Field, Flex, Input, Link } from "@optiaxiom/react";

export function App() {
  return (
    <Flex>
      <Field
        description={
          <>
            Read our{" "}
            <Link external href="#">
              privacy policy
            </Link>{" "}
            for more information.
          </>
        }
        label="Email address"
      >
        <Input placeholder="you@example.com" type="email" />
      </Field>

      <Field
        error={
          <>
            Password must be at least <strong>8 characters</strong> and include
            a number.
          </>
        }
        label="Password"
      >
        <Input placeholder="Enter password" type="password" />
      </Field>
    </Flex>
  );
}
