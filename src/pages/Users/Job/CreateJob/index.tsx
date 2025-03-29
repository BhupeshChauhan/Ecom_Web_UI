/**
 * CreateJob Component
 *
 * This component handles the job creation workflow with a multi-step form:
 * Step 1: Basic job information (title, location, experience etc.)
 * Step 2: Detailed job description
 * Step 3: Preview and publish
 *
 * The component also handles validation of company details before allowing job creation.
 */

import StepsHead from "./StepsHead";
import { cn, retrieveValue } from "../../../../utils";
import { useJobFormContext } from "../../../../context/JobFormProvider";
import JobService from "../../../../Api/JobService";
import { FormContainer } from "./FormContainer";
import { CompanyDetailsMissing } from "./CompanyDetailsMissing";
import { Header } from "./Header";

const CreateJob = () => {
  // Get company data from storage
  const companyData = retrieveValue("companyData");

  // Get form context values and handlers
  const {
    step,
    FormData,
    JdDataAI,
    requiredSkillsArray,
    optionalSkillsArray,
    handleStepChange,
    LocationType,
    handleJobTabChange,
    ResetData,
    visibility,
    handleChangeVisibility,
  } = useJobFormContext();

  // Initialize job service with required data
  const { isLoading, handlePublishJob, handleSaveJob } = JobService(
    FormData,
    LocationType,
    JdDataAI,
    requiredSkillsArray,
    optionalSkillsArray,
    handleJobTabChange,
    ResetData,
    visibility,
  );

  // Memoize class names for conditional rendering
  const formContainerClasses = cn(step === 3 ? "flex" : "flex w-[70%]");
  const basicFormClasses = cn(
    "w-full bg-white border border-gray-200 shadow-sm rounded-2xl",
    step === 1 ? "block" : "hidden",
  );
  const descriptionFormClasses = cn(
    "w-full h-full bg-white border border-gray-200 shadow-sm rounded-2xl",
    step === 2 ? "flex" : "hidden",
  );
  const stepsHeadClasses = cn(step === 3 ? "hidden" : "flex w-[30%]");

  // Render company details missing view if company data is incomplete
  if (!companyData.name) {
    return <CompanyDetailsMissing />;
  }

  return (
    <div className="bg-gray-100">
      <Header
        type="add"
        step={step}
        isLoading={isLoading}
        handleStepChange={handleStepChange}
        handleSaveJob={handleSaveJob}
        handlePublishJob={handlePublishJob}
        handleChangeVisibility={handleChangeVisibility}
      />

      <div className="flex gap-3 border-dashed border-2 rounded-lg min-h-full p-6">
        <FormContainer
          formContainerClasses={formContainerClasses}
          basicFormClasses={basicFormClasses}
          descriptionFormClasses={descriptionFormClasses}
          type="add"
        />

        <div className={stepsHeadClasses}>
          <StepsHead type="add" />
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
