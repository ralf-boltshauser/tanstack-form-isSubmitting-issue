import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/lib/hooks/form-context";

export function TextField({ label }: { label: string }) {
  // The `Field` infers that it should have a `value` type of `string`
  const field = useFieldContext<string>();
  return (
    <label>
      <div>{label}</div>
      <Input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </label>
  );
}
