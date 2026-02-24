"use client";

import { Button, Field, Group, Input, Switch } from "@optiaxiom/react";
import { useForm } from "react-hook-form";

export function App() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<{
    emailNotifications: boolean;
    smsNotifications: boolean;
    username: string;
  }>({
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
    },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <Group flexDirection="column" gap="16">
        <Field error={errors.username?.message} label="Username" required>
          <Input
            placeholder="Enter username"
            {...register("username", {
              required: "Username is required",
            })}
          />
        </Field>

        <Switch {...register("emailNotifications")}>Email notifications</Switch>

        <Switch {...register("smsNotifications")}>SMS notifications</Switch>

        <Button alignSelf="start" type="submit">
          Save settings
        </Button>
      </Group>
    </form>
  );
}
