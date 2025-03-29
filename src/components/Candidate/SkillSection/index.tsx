import { Button } from "@dashflowx/core";
import { CgClose } from "react-icons/cg";

interface SkillSectionProps {
  title: string;
  skills: string;
  skillsArray: { id: string; value: string }[];
  onSkillChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSkillSubmit: () => void;
  onClearSkill: (id: string) => void;
}

const SkillSection: React.FC<SkillSectionProps> = ({
  title,
  skills,
  skillsArray,
  onSkillChange,
  onSkillSubmit,
  onClearSkill,
}) => {
  return (
    <div className="self-stretch h-[164px] flex-col justify-start items-start gap-2 flex">
      <div className="self-stretch h-[76px] flex-col justify-start items-start gap-2 flex">
        <div className="justify-center items-center gap-1 inline-flex">
          <div className="text-[#4e5760] text-base font-medium font-['Golos Text'] leading-tight">
            {title}
          </div>
        </div>
        <div className="self-stretch px-4 py-3 rounded-lg border border-[#e3eaee] justify-center items-center gap-2.5 inline-flex">
          <input
            className="grow shrink basis-0 text-[#a6aeb4] text-base font-normal font-['Golos Text'] leading-normal"
            placeholder="Communication, Problem-solving, Facilitation"
            value={skills}
            onChange={onSkillChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSkillSubmit();
                e.preventDefault();
              }
            }}
          />
        </div>
      </div>
      <div className="self-stretch justify-start items-start gap-2 inline-flex flex-wrap">
        {skillsArray.map((skill) => (
          <div
            className="px-3 py-1.5 bg-[#f7fafc] rounded-lg border border-[#e3eaee] justify-center items-center gap-1 flex cursor-pointer"
            key={skill.id}
          >
            <div className="text-black text-base font-normal font-['Golos Text'] leading-normal">
              {skill.value}
            </div>
            <Button
              variant="ghost"
              className="ml-1 p-0"
              onClick={() => onClearSkill(skill.id)}
            >
              <CgClose color="#899198" size={16} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillSection;
