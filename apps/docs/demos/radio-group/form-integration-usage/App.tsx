"use client";

import {
  Button,
  Field,
  Group,
  Input,
  Radio,
  RadioGroup,
} from "@optiaxiom/react";
import { Controller, useForm } from "react-hook-form";

export function App() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<{
    name: string;
    priority: string;
  }>();

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
            {...register("name", { required: "Please enter a name" })}
            placeholder="Enter name"
          />
        </Field>

        <Controller
          control={control}
          name="priority"
          render={({ field }) => (
            <Field error={errors.priority?.message} label="Priority" required>
              <RadioGroup
                name="form-hook-form-usage"
                onValueChange={field.onChange}
                value={field.value ?? ""}
              >
                <Radio value="low">Low</Radio>
                <Radio value="medium">Medium</Radio>
                <Radio value="high">High</Radio>
              </RadioGroup>
            </Field>
          )}
          rules={{ required: "Please select a priority" }}
        />

        <Button alignSelf="start" type="submit">
          Submit
        </Button>
      </Group>
    </form>
  );
}
