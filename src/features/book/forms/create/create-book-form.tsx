"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mergeForm, useForm, useTransform } from "@tanstack/react-form";
import { initialFormState } from "@tanstack/react-form/nextjs";
import { useStore } from "@tanstack/react-store";
import { useActionState } from "react";
import someAction from "../book-form-actions";
import { bookFormOpts } from "../book-form-options";
export const ClientComp = () => {
  const [state, action] = useActionState(someAction, initialFormState);

  const form = useForm({
    ...bookFormOpts,
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, state ?? {}),
      [state]
    ),
  });

  console.log(form.state);

  const formErrors = useStore(form.store, (formState) => formState.errors);

  return (
    <form action={action as never} onSubmit={() => form.handleSubmit()}>
      {formErrors.map((error) => (
        <p key={error as unknown as string}>{error}</p>
      ))}

      <form.Field
        name="price"
        validators={{
          onBlur: ({ value }) =>
            value < 8
              ? "Client validation: Price must be greater than 8"
              : undefined,
        }}
      >
        {(field) => {
          return (
            <div>
              <Input
                onBlur={field.handleBlur}
                name="price"
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
              {field.state.meta.errors.map((error) => (
                <p key={error as string}>{error}</p>
              ))}
            </div>
          );
        }}
      </form.Field>
      <form.Field
        name="title"
        validators={{
          onBlur: ({ value }) => {
            const info = ["Book 1", "Book 2", "Book 3"];
            console.log(info);
            console.log(value);
            console.log(info.includes(value));
            if (info.includes(value)) {
              return "Client validation: Title must be unique";
            }
          },
        }}
      >
        {(field) => {
          return (
            <>
              <Input
                name="title"
                onBlur={field.handleBlur}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.map((error) => (
                <p key={error as string}>{error}</p>
              ))}
            </>
          );
        }}
      </form.Field>
      <form.Subscribe
        selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? "..." : "Submit"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
};
