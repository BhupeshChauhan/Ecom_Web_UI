import { memo, useState } from "react";
import { Plus } from "lucide-react";
import { HiOutlinePencil } from "react-icons/hi2";

interface WorkExperience {
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
}

export const WorkHistorySection = memo(
  ({
    data,
    onAddExperience,
    onEditExperience,
  }: {
    data: WorkExperience[];
    onAddExperience: (value: boolean) => void;
    onEditExperience: (experience: WorkExperience) => void;
  }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const displayedItems = isExpanded ? data : data.slice(0, 2);

    return (
      <div className="self-stretch p-6 bg-white rounded-xl border border-[#e3eaee] flex-col justify-start items-start gap-4 flex">
        <div className="self-stretch justify-start items-start gap-6 inline-flex">
          <div className="grow shrink basis-0 self-stretch text-[#4e5760] text-base font-medium font-['Golos Text'] leading-normal">
            Work history
          </div>
          <Plus
            onClick={() => onAddExperience(true)}
            color="#4e5760"
            size={24}
            strokeWidth={1.5}
          />
        </div>

        <div className="self-stretch h-[0px] border-t border-[#eeeeee]" />

        {displayedItems.map((item, index) => (
          <div className="w-full" key={index}>
            <WorkHistoryItem
              title={item.title}
              company={item.company}
              type={item.employmentType}
              period={
                item.isCurrentlyWorking
                  ? `${item.startMonth} ${item.startYear} - Present`
                  : `${item.startMonth} ${item.startYear} - ${item.endMonth} ${item.endYear}`
              }
              location={item.location}
              locationType={item.locationType}
              onEditExperience={() => onEditExperience(item)}
            />
            <div className="self-stretch h-[0px] border-t border-[#eeeeee] mt-4" />
          </div>
        ))}

        {data.length > 2 && (
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#020c17] text-sm font-semibold font-['Golos Text'] underline leading-normal cursor-pointer hover:opacity-80"
          >
            {isExpanded ? "Show less" : `Show more (${data.length - 2} more)`}
          </div>
        )}
      </div>
    );
  },
);

interface WorkHistoryItemProps {
  title: string;
  company: string;
  type: string;
  period: string;
  location: string;
  locationType: string;
  onEditExperience: () => void;
}

const WorkHistoryItem = memo(
  ({
    title,
    company,
    type,
    period,
    location,
    locationType,
    onEditExperience,
  }: WorkHistoryItemProps) => (
    <div className="self-stretch justify-start items-start gap-6 inline-flex w-full">
      <div className="grow shrink basis-0 flex-col justify-center items-center gap-1 inline-flex">
        <div className="self-stretch text-[#020c17] text-base font-medium font-['Golos Text'] leading-normal">
          {title}
        </div>
        <div className="self-stretch text-[#4e5760] text-base font-normal font-['Golos Text'] leading-tight">
          {company} • {type}
        </div>
        <div className="self-stretch text-[#899198] text-sm font-normal font-['Golos Text'] leading-tight">
          {period}
        </div>
        <div className="self-stretch text-[#899198] text-sm font-normal font-['Golos Text'] leading-tight">
          {location ? `${location} • ${locationType}` : locationType}
        </div>
      </div>
      <HiOutlinePencil
        size={22}
        strokeWidth={1.5}
        className="cursor-pointer hover:opacity-80"
        onClick={onEditExperience}
      />
    </div>
  ),
);
