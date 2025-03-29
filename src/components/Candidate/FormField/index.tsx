import { memo } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormMessage,
} from "@dashflowx/core";
import { cn } from "../../../utils";

export interface CandidateFormData {
  name: string;
  email: string;
  designation: string;
  phone: string;
  experience: string;
}

export interface FormFieldProps {
  label: string;
  name: string;
  control: any;
  placeholder: string;
  type?: string;
  className?: string;
  dropdownData?: string[];
  form?: any;
}

const selectClassName =
  "w-full py-3 px-4 border-2 placeholder-gray-500 focus:ring-[#eeeeee] focus:border-[#eeeeee] sm:text-sm border-gray-200 rounded-md capitalize outline-none focus:outline-none";
const placeholderColor =
  "text-[#A6AEB4] font-medium font-['Golos Text'] leading-tight block min-h-[1.5rem] text-gray-400 px-2 ";
export const CustomFormField = memo(
  ({
    label,
    name,
    control,
    placeholder,
    type,
    dropdownData,
    className,
    form,
  }: FormFieldProps) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          const renderSelect = (options: string[]) => (
            <>
              <select
                {...field}
                className={cn(
                  selectClassName,
                  placeholderColor,
                  form?.formState?.errors?.[`${name}`]?.message
                    ? "border-red-500 border-[1px]"
                    : "",
                )}
              >
                <option value="" className={cn(placeholderColor)}>
                  {placeholder}
                </option>
                {options.map((option) => (
                  <option key={option} value={option} className="capitalize">
                    {option}
                  </option>
                ))}
              </select>
              <FormMessage className="text-red-500" />
            </>
          );

          return (
            <FormItem className={cn("w-full mb-2", className)}>
              <FormLabel className="text-[#4e5760] text-base font-medium font-['Golos Text'] leading-tight block min-h-[1.5rem]">
                {label}
              </FormLabel>
              <FormControl className="w-full">
                {type === "dropdown" ? (
                  renderSelect(dropdownData)
                ) : (
                  <Input
                    required={false}
                    placeholder={placeholder}
                    fullwidth={true}
                    {...field}
                    errorMsg={form?.formState?.errors?.[`${name}`]?.message}
                  />
                )}
              </FormControl>
            </FormItem>
          );
        }}
      />
    );
  },
);
