"use client";

import { Button, Field, Group, Input } from "@optiaxiom/react";
import { useForm } from "react-hook-form";

export function App() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<{ email: string; name: string; password: string }>();

  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <Group flexDirection="column" gap="16">
        <Field error={errors.name?.message} label="Name" required>
          <Input
            placeholder="John Doe"
            {...register("name", {
              required: "Name is required",
            })}
          />
        </Field>

        <Field error={errors.email?.message} label="Email" required>
          <Input
            placeholder="name@example.com"
            type="email"
            {...register("email", {
              pattern: {
                message: "Please enter a valid email address",
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              },
              required: "Email is required",
            })}
          />
        </Field>

        <Field error={errors.password?.message} label="Password" required>
          <Input
            placeholder="Enter password"
            type="password"
            {...register("password", {
              minLength: {
                message: "Password must be at least 8 characters",
                value: 8,
              },
              required: "Password is required",
            })}
          />
        </Field>

        <Button alignSelf="start" type="submit">
          Submit
        </Button>
      </Group>
    </form>
  );
}
