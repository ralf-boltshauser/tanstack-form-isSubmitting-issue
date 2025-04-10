"use server";

import {
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form/nextjs";
import { bookFormOpts } from "./book-form-options";

const serverValidate = createServerValidate({
  ...bookFormOpts,
  onServerValidate: ({ value }) => {
    if (value.price < 12) {
      return "Server validation: Price must be greater than 12";
    }
  },
});

export default async function someAction(prev: unknown, formData: FormData) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await serverValidate(formData);
  } catch (e) {
    if (e instanceof ServerValidateError) {
      console.log(e.formState);
      return e.formState;
    }

    // Some other error occurred while validating your form
    throw e;
  }

  // Your form has successfully validated!
}

export async function getInfo() {
  return ["Book 1", "Book 2", "Book 3"];
}
