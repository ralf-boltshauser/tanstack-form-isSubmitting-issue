import { ClientComp } from "@/features/book/forms/create/create-book-form";
import { ClientCompAsyncBlurValidator } from "@/features/book/forms/create/create-book-form-blur-async-validator";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">
        Client Comp -&gt; isSubmitting state is not working on button!
      </h1>
      <ClientComp />
      <h1 className="text-2xl font-bold">Client Comp Async Blur Validator</h1>
      <ClientCompAsyncBlurValidator />
      <h1 className="text-2xl font-bold">
        Only Difference between the two is the onBlurAsync validator
      </h1>
      <pre className="block whitespace-pre">
        <code>{`validators={{
  onBlur: ({ value }) => {
    const info = ["Book 1", "Book 2", "Book 3"];
    console.log(info);
    console.log(value); 
    console.log(info.includes(value));
    if (info.includes(value)) {
      return "Client validation: Title must be unique";
    }
  },
}}`}</code>
      </pre>
      <pre className="block whitespace-pre">
        <code>{`validators={{
  onBlurAsync: async ({ value }) => {
    const info = await getInfo();
    console.log(info);
    console.log(value);
    console.log(info.includes(value));
    if (info.includes(value)) {
      return "Client validation: Title must be unique"; 
    }
  },
}}`}</code>
      </pre>
    </div>
  );
}
