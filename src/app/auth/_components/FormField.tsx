import InputOverlappingLabel from "@/components/shadcn-studio/input/input-23";
import { Field } from "@/components/ui/field";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  name,
  label,
  className,
  ...props
}: {
  control: ControllerProps<TFieldValues, TName, TTransformedValues>["control"];
  label: string;
  name: TName;
} & Omit<React.ComponentProps<"input">, "name">) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <InputOverlappingLabel
            label={label}
            className="md:!text-lg md:!py-6 md:!px-5 border-gray-400"
            labelClassName="md:!text-base md:!left-4"
            {...field}
            {...props}
            aria-invalid={fieldState.invalid}
          />
        </Field>
      )}
    />
  );
}
