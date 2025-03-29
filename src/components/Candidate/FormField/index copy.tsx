import { memo } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
} from "@dashflowx/core";

// export interface CandidateFormData {
//     name: string;
//     email: string;
//     designation: string;
//     phone: string;
//     experience: string;
//   }

//   export interface FormFieldProps {
//     label: string;
//     name: keyof CandidateFormData;
//     control: any;
//     placeholder: string;
//   }

// export const CustomFormField = memo(({ label, name, control, placeholder }: FormFieldProps) => (
//   <FormField
//     control={control}
//     name={name}
//     render={({ field }) => (
//       <FormItem className="w-full mb-2">
//         <FormLabel className="text-[#4e5760] text-base font-medium font-['Golos Text'] leading-tight block min-h-[1.5rem]">
//           {label}
//         </FormLabel>
//         <FormControl className="w-full">
//           <Input
//             placeholder={placeholder}
//             fullwidth={true}
//             {...field}
//           />
//         </FormControl>
//       </FormItem>
//     )}
//   />
// ));

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Add this import

export const CustomFormField = memo(
  ({ label, name, control, placeholder, type = "text" }: FormFieldProps) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full mb-2">
            <FormLabel className="text-[#4e5760] text-base font-medium font-['Golos Text'] leading-tight block min-h-[1.5rem]">
              {label}
            </FormLabel>
            <FormControl className="w-full">
              {name.toLowerCase().includes("month") ? (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : name.toLowerCase().includes("year") ? (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input placeholder={placeholder} fullwidth={true} {...field} />
              )}
            </FormControl>
          </FormItem>
        )}
      />
    );
  },
);
