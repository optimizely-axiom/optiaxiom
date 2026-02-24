"use client";

import { Button, Checkbox, Field, Group, Input } from "@optiaxiom/react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  newsletter: boolean;
  terms: boolean;
};

export function App() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormData>();

  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <Group flexDirection="column" gap="16">
        <Field error={errors.email?.message} label="Email" required>
          <Input
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
            })}
          />
        </Field>

        <Checkbox {...register("newsletter")}>Subscribe to newsletter</Checkbox>

        <Field error={errors.terms?.message}>
          <Checkbox
            {...register("terms", {
              required: "You must accept the terms",
            })}
          >
            Accept terms and conditions
          </Checkbox>
        </Field>

        <Button alignSelf="start" type="submit">
          Submit
        </Button>
      </Group>
    </form>
  );
}
