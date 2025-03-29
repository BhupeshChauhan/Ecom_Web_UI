import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "@dashflowx/core";
import { Trash2 } from "lucide-react";
import { z } from "zod";
import { CustomFormField } from "../FormField";
import { useState } from "react";

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

interface ExperienceModalContentProps {
  onSave: (data: any) => void;
  onCancel?: () => void;
  onDelete?: () => void;
  initialData?: {
    title: string;
    employmentType: string;
    company: string;
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
    location: string;
    locationType: string;
    isCurrentlyWorking?: boolean;
  };
  mode?: "add" | "edit";
}

export const ExperienceModalContent = ({
  onSave,
  onCancel,
  onDelete,
  initialData,
  mode = "add",
}: ExperienceModalContentProps) => {
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(
    initialData?.isCurrentlyWorking || false,
  );

  const form = useForm({
    resolver: zodResolver(
      z.object({
        title: z.string().min(1, { message: "Title is required" }),
        employmentType: z
          .string()
          .min(1, { message: "Employment type is required" }),
        company: z.string().min(1, { message: "Company is required" }),
        startMonth: z.string().min(1, { message: "Start month is required" }),
        startYear: z.string().min(1, { message: "Start year is required" }),
        endMonth: z.string().optional(),
        endYear: z.string().optional(),
        location: z.string().optional(),
        locationType: z
          .string()
          .min(1, { message: "Location type is required" }),
        isCurrentlyWorking: z.boolean().optional(),
      }),
    ),
    defaultValues: initialData || {
      title: "",
      employmentType: "",
      company: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      location: "",
      locationType: "",
      isCurrentlyWorking: false,
    },
  });

  const onSubmit = (data: any) => {
    onSave(data);
  };

  return (
    <Form {...form}>
      <form
        id="add-experience-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="self-stretch flex-col justify-start items-start gap-2 flex overflow-y-auto"
      >
        <CustomFormField
          control={form.control}
          name="title"
          label="Title"
          placeholder="Ex: Head of Sales"
          form={form}
        />

        <CustomFormField
          control={form.control}
          name="employmentType"
          label="Employment type"
          placeholder="Please select"
          type="dropdown"
          dropdownData={[
            "Full-time",
            "Part-time",
            "Internship",
            "Contract",
            "Other",
          ]}
          form={form}
        />

        <CustomFormField
          control={form.control}
          name="company"
          label="Company or organisation"
          placeholder="Ex: Google"
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

        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            id="currentlyWorking"
            checked={isCurrentlyWorking}
            onChange={(e) => {
              setIsCurrentlyWorking(e.target.checked);
              form.setValue("isCurrentlyWorking", e.target.checked);
              if (e.target.checked) {
                form.setValue("endMonth", "");
                form.setValue("endYear", "");
              }
            }}
          />
          <label htmlFor="currentlyWorking">
            I'm currently working in this company
          </label>
        </div>

        {!isCurrentlyWorking && (
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
        )}

        <div className="self-stretch justify-start items-start gap-4 inline-flex">
          <CustomFormField
            control={form.control}
            name="location"
            label="Location"
            placeholder="Ex: New York, USA"
            className="grow"
            form={form}
          />
          <CustomFormField
            control={form.control}
            name="locationType"
            label="Location type"
            placeholder="Please select"
            className="grow"
            type="dropdown"
            dropdownData={["Remote", "In-person", "Hybrid"]}
            form={form}
          />
        </div>

        <div className="self-stretch justify-between items-start inline-flex w-full">
          {mode === "edit" && onDelete && (
            <div
              className="py-2 rounded-lg justify-center items-center gap-2 flex cursor-pointer"
              onClick={onDelete}
            >
              <Trash2 color="#d74544" size={20} strokeWidth={1.5} />
              <div className="text-[#d74544] text-base font-semibold font-['Golos Text'] leading-normal">
                Delete experience
              </div>
            </div>
          )}
          {mode === "add" && <div />}{" "}
          {/* Empty div for spacing when in add mode */}
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
              {mode === "edit" ? "Save Changes" : "Add Experience"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
