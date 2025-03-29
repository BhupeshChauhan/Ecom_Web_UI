import StepsHead from "./CreateJob/StepsHead";
import { cn, retrieveValue } from "../../../utils";
import { useJobFormContext } from "../../../context/JobFormProvider";
import JobService from "../../../Api/JobService";
import { Header } from "./CreateJob/Header";
import { FormContainer } from "./CreateJob/FormContainer";
import { CompanyDetailsMissing } from "./CreateJob/CompanyDetailsMissing";

const EditJob = () => {
  const companyData = retrieveValue("companyData");
  const {
    step,
    FormData,
    JdData,
    JdDataAI,
    requiredSkillsArray,
    optionalSkillsArray,
    handleStepChange,
    LocationType,
    Jdtype,
    handleJobTabChange,
    ResetData,
  } = useJobFormContext();
  const { isLoading, handleUpdateJob } = JobService(
    FormData,
    LocationType,
    JdDataAI,
    Jdtype,
    requiredSkillsArray,
    optionalSkillsArray,
    handleJobTabChange,
    ResetData,
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
        type="edit"
        step={step}
        isLoading={isLoading}
        handleStepChange={handleStepChange}
        handleUpdateJob={handleUpdateJob}
      />

      <div className="flex gap-3 border-dashed border-2 rounded-lg min-h-full p-10">
        <FormContainer
          formContainerClasses={formContainerClasses}
          basicFormClasses={basicFormClasses}
          descriptionFormClasses={descriptionFormClasses}
          type="edit"
        />

        <div className={stepsHeadClasses}>
          <StepsHead type="edit" />
        </div>
      </div>
    </div>
  );
};

export default EditJob;
