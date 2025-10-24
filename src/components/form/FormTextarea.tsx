import { TextareaWithOverlappingLabel } from "@/components/shadcn-studio/textarea/textarea-13";
import { Field } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

export function FormTextarea<
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
} & Omit<ComponentProps<"textarea">, "name">) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <TextareaWithOverlappingLabel
            label={label}
            className={cn("md:!text-lg border border-gray-400", className)}
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
