import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "@dashflowx/core";
import { Trash2 } from "lucide-react";
import { z } from "zod";
import { CustomFormField } from "../FormField";

const monthArray = [
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
const yearArray = Array.from({ length: 50 }, (_, i) =>
  String(new Date().getFullYear() - i),
);

interface EducationModalContentProps {
  onSave: (data: any) => void;
  onCancel?: () => void;
  onDelete?: () => void;
  initialData?: Education;
  mode?: "add" | "edit";
}

interface Education {
  id?: number;
  degree: string;
  institute: string;
  degreeLevel: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  score: string;
  location: string;
}

export const EducationModalContent = ({
  onSave,
  onCancel,
  onDelete,
  initialData,
  mode = "add",
}: EducationModalContentProps) => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        degree: z.string().min(1, "Degree is required"),
        institute: z.string().min(1, "Institute is required"),
        degreeLevel: z.string().min(1, "Degree level is required"),
        startMonth: z.string().min(1, "Start month is required"),
        startYear: z.string().min(1, "Start year is required"),
        endMonth: z.string().min(1, "End month is required"),
        endYear: z.string().min(1, "End year is required"),
        score: z.string(),
        location: z.string().min(1, "Location is required"),
      }),
    ),
    defaultValues: initialData || {
      degree: "",
      institute: "",
      degreeLevel: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      score: "",
      location: "",
    },
  });

  const onSubmit = (data: Education) => {
    console.log("data", data);
    onSave(data);
  };

  return (
    <Form {...form}>
      <form
        id="add-education-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="self-stretch flex-col justify-start items-start gap-2 flex overflow-y-auto"
      >
        <CustomFormField
          control={form.control}
          name="degree"
          label="Degree"
          placeholder="Enter your degree"
          form={form}
        />

        <CustomFormField
          control={form.control}
          name="institute"
          label="Institute"
          placeholder="Enter your institute name"
          form={form}
        />

        <CustomFormField
          control={form.control}
          name="degreeLevel"
          label="Degree Level"
          placeholder="Select degree level"
          type="dropdown"
          dropdownData={["Bachelor", "Master", "Doctorate", "Associate"]}
          form={form}
        />

        <div className="self-stretch justify-start items-start gap-4 inline-flex">
          <CustomFormField
            control={form.control}
            name="startMonth"
            label="Start date"
            placeholder="Month"
            className="grow"
            type="dropdown"
            dropdownData={monthArray}
            form={form}
          />
          <CustomFormField
            control={form.control}
            name="startYear"
            label="Year"
            placeholder="Year"
            className="grow"
            type="dropdown"
            dropdownData={yearArray}
            form={form}
          />
        </div>

        <div className="self-stretch justify-start items-start gap-4 inline-flex">
          <CustomFormField
            control={form.control}
            name="endMonth"
            label="End date"
            placeholder="Month"
            className="grow"
            type="dropdown"
            dropdownData={monthArray}
            form={form}
          />
          <CustomFormField
            control={form.control}
            name="endYear"
            label="Year"
            placeholder="Year"
            className="grow"
            type="dropdown"
            dropdownData={yearArray}
            form={form}
          />
        </div>

        <CustomFormField
          control={form.control}
          name="score"
          label="Score"
          placeholder="Enter your score (e.g., 8.5 CGPA)"
          form={form}
        />

        <CustomFormField
          control={form.control}
          name="location"
          label="Location"
          placeholder="Enter location"
          form={form}
        />

        <div className="self-stretch justify-between items-start inline-flex w-full">
          {mode === "edit" && onDelete && (
            <div
              className="py-2 rounded-lg justify-center items-center gap-2 flex cursor-pointer"
              onClick={onDelete}
            >
              <Trash2 color="#d74544" size={20} strokeWidth={1.5} />
              <div className="text-[#d74544] text-base font-semibold font-['Golos Text'] leading-normal">
                Delete education
              </div>
            </div>
          )}
          {mode === "add" && <div />}

          <div className="justify-start items-center flex gap-2">
            <Button onClick={onCancel}>
              <div className="px-4 py-2 bg-white rounded-lg border border-[#e3eaee] justify-center items-center ">
                <div className="text-[#4e5760] text-base font-semibold font-['Golos Text'] leading-normal">
                  Cancel
                </div>
              </div>
            </Button>

            <Button
              variant="solid"
              color="primary"
              className="w-fit"
              type="submit"
            >
              {mode === "edit" ? "Save Changes" : "Add Education"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
