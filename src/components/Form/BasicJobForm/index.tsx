/**
 * BasicJobForm Component
 *
 * This component handles the basic job information form including:
 * - Job title
 * - Job description
 * - Location type (Remote/On-site/Hybrid)
 * - Experience requirements
 * - Skills requirements
 *
 * The form uses Zod for validation and React Hook Form for form management.
 */

import { Button, Form } from "@dashflowx/core";
import { z } from "zod";
import SkillsCompontent from "../SkillsCompontent";
import { useJobFormContext } from "../../../context/JobFormProvider";
import { useEffect } from "react";
import JobService from "../../../Api/JobService";
import { LoaderMask } from "../../Loader";
import { TitleField } from "./TitleField";
import { LocationDetailsField } from "./LocationDetailsField";
import { DescriptionField } from "./DescriptionField";
import { ExperienceField } from "./ExperienceField";
import { LocationTypeField } from "./LocationTypeField";
import { UseFormReturn } from "react-hook-form";

interface BasicJobFormProps {
  type: "add" | "edit";
  formSchema: z.Schema<any>;
  form: UseFormReturn;
}

const BasicJobForm = ({ type, formSchema, form }: BasicJobFormProps) => {
  // Custom hooks
  const { isLoading, data, GetJobDetails } = JobService();

  // Get context values and handlers
  const {
    LocationType,
    mounted,
    handleLocationTypeChange,
    handleStepChange,
    handleFormDataChange,
    handleSkillUpdate,
    handleOptionalSkillUpdate,
    handleJdDataAIChange,
  } = useJobFormContext();

  // Form submission handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleFormDataChange(values);
    handleStepChange(2);
  };

  // Load job details if in edit mode
  useEffect(() => {
    if (type === "edit") GetJobDetails();
  }, []);

  // Update form with existing job data
  const updateData = () => {
    if (!data) return;

    form.setValue("title", data.title || "");
    form.setValue("experience", data.experience || "");
    form.setValue("jobDetails", data.jobDetails || "");
    form.setValue("location", data.location?.split(" - ")[1] || "");

    if (data.location) {
      handleLocationTypeChange(data.location.split(" - ")[0]);
    }
    if (data.requiredSkills) handleSkillUpdate(data.requiredSkills);
    if (data.optionalSkills) handleOptionalSkillUpdate(data.optionalSkills);
    if (data.description) handleJdDataAIChange(data.description);
  };

  // Reset skills and update form when data changes
  useEffect(() => {
    handleSkillUpdate("");
    handleOptionalSkillUpdate("");
    if (data) {
      mounted.current = false;
      updateData();
    }
  }, [data]);

  return (
    <div>
      {isLoading && <LoaderMask />}
      <h2 className="px-6 pt-6">Basic Info</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-6 w-full overflow-x-hidden"
        >
          <div className="w-full">
            <div className="w-full px-6 shadow-sm grid grid-cols-2 gap-3">
              <TitleField
                control={form.control}
                errors={form.formState.errors}
              />
              <DescriptionField
                control={form.control}
                errors={form.formState.errors}
              />
              <LocationTypeField
                LocationType={LocationType}
                handleLocationTypeChange={handleLocationTypeChange}
              />
              <LocationDetailsField
                control={form.control}
                errors={form.formState.errors}
                LocationType={LocationType}
              />
              <ExperienceField
                control={form.control}
                errors={form.formState.errors}
              />
            </div>

            <div className="w-full flex p-6 shadow-sm gap-3">
              <SkillsCompontent />
            </div>

            <div className="w-full flex p-6 gap-3 justify-end">
              <Button
                variant="solid"
                color="primary"
                type="submit"
                disabled={Object.keys(form.formState.dirtyFields).length === 0}
              >
                Continue
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BasicJobForm;
