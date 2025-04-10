import { formOptions } from "@tanstack/react-form";

export const bookFormOpts = formOptions({
  defaultValues: {
    title: "",
    author: "",
    description: "",
    price: 0,
  },
});
