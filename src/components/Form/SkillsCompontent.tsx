import { Button, Input } from "@dashflowx/core";
import { IoClose, IoCloseCircle } from "react-icons/io5";
import { useJobFormContext } from "../../context/JobFormProvider";

export const renderSkillInput = (
  skills,
  handleChange,
  handleSubmit,
  placeholder,
) => (
  <div className="flex items-center w-full gap-3">
    <div className="w-full">
      <Input
        className="my-2 w-full"
        fullwidth={true}
        placeholder={placeholder}
        value={skills}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
            e.preventDefault();
          }
        }}
      />
    </div>
  </div>
);

export const renderSkillsList = (skillsArray, handleClear) => (
  <div className="flex mb-6 gap-3 w-full flex-wrap">
    {skillsArray.map(({ id, value }) => (
      <div
        className="flex items-center p-2 rounded-lg bg-slate-50 border border-gray-200"
        key={id}
      >
        <p className="mr-2 text-xs">{value}</p>
        <Button variant="ghost" className="p-0" onClick={() => handleClear(id)}>
          <IoClose className="text-gray-500" />
        </Button>
      </div>
    ))}
  </div>
);

const SkillsComponent = () => {
  const {
    requiredSkills,
    optionalSkills,
    requiredSkillsArray,
    optionalSkillsArray,
    handleRequiredSkillsChange,
    handleOptionalSkillsChange,
    handleSkillSubmit,
    handleOptionalSkillSubmit,
    handleClearSkill,
    handleClearOptionalSkill,
  } = useJobFormContext();

  return (
    <div className="w-full">
      <span className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-bold">
        Must have skills
      </span>
      {renderSkillInput(
        requiredSkills,
        handleRequiredSkillsChange,
        handleSkillSubmit,
        "Communication Skills, Technical Proficiency, Problem-Solving Skills...",
      )}
      {renderSkillsList(requiredSkillsArray, handleClearSkill)}

      <span className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-bold">
        Nice to have skills
      </span>
      {renderSkillInput(
        optionalSkills,
        handleOptionalSkillsChange,
        handleOptionalSkillSubmit,
        "Communication Skills, Technical Proficiency, Problem-Solving Skills...",
      )}
      {renderSkillsList(optionalSkillsArray, handleClearOptionalSkill)}
    </div>
  );
};

export default SkillsComponent;
