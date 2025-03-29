import { Plus } from "lucide-react";
import { memo, useState } from "react";
import { HiOutlinePencil } from "react-icons/hi2";

interface Education {
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

export const EducationSection = memo(
  ({
    data,
    onAddEducation,
    onEditEducation,
  }: {
    data: Education[];
    onAddEducation: (value: boolean) => void;
    onEditEducation: (education: Education) => void;
  }) => {
    const [showAll, setShowAll] = useState(false);
    const displayItems = showAll ? data : data.slice(0, 2);

    return (
      <div className="self-stretch p-6 bg-white rounded-xl border border-[#e3eaee] flex-col justify-start items-start gap-4 flex">
        <div className="self-stretch justify-between items-center inline-flex">
          <div className="text-[#4e5760] text-base font-medium font-['Golos Text'] leading-normal">
            Education
          </div>
          <Plus
            onClick={() => onAddEducation(true)}
            color="#4e5760"
            size={24}
            strokeWidth={1.5}
            className="cursor-pointer hover:opacity-80"
          />
        </div>

        {displayItems.map((item: Education, index: number) => (
          <div key={index} className="self-stretch">
            <EducationItem
              degree={item.degree}
              institute={item.institute}
              period={`${item.startMonth} ${item.startYear} - ${item.endMonth} ${item.endYear}`}
              score={item.score}
              location={item.location}
              onEditEducation={() => onEditEducation(item)}
            />
            <div className="self-stretch h-[0px] border-t border-[#eeeeee]" />
          </div>
        ))}

        {data.length > 2 && (
          <div
            onClick={() => setShowAll(!showAll)}
            className="text-[#020c17] text-sm font-semibold font-['Golos Text'] underline leading-normal cursor-pointer hover:opacity-80"
          >
            {showAll ? "Show less" : `Show more (${data.length - 2})`}
          </div>
        )}
      </div>
    );
  },
);

interface EducationItemProps {
  degree: string;
  institute: string;
  period: string;
  score: string;
  location: string;
  onEditEducation: () => void;
}

const EducationItem = memo(
  ({
    degree,
    institute,
    period,
    score,
    location,
    onEditEducation,
  }: EducationItemProps) => (
    <div className="border-t border-[#eeeeee] pt-4">
      <div className="flex justify-between items-start">
        <div className="flex-col gap-1">
          <div className="text-[#020c17] text-base font-medium font-['Golos Text'] leading-normal">
            {degree}
          </div>
          <div className="text-[#4e5760] text-base font-normal font-['Golos Text'] leading-tight">
            {institute}
          </div>
          <div className="text-[#899198] text-sm font-normal font-['Golos Text'] leading-tight">
            {period}
          </div>
          <div className="text-[#899198] text-sm font-normal font-['Golos Text'] leading-tight">
            {score} • {location}
          </div>
        </div>
        <HiOutlinePencil
          size={22}
          strokeWidth={1.5}
          className="cursor-pointer hover:opacity-80"
          onClick={onEditEducation}
        />
      </div>
    </div>
  ),
);
