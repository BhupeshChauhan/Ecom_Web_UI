import { DfxStats } from "@dashflowx/ui";
import { FaLocationArrow } from "react-icons/fa6";
import { GrUserExpert } from "react-icons/gr";

const JobStats = ({ JobDetails }) => {
  const sectionItems = [
    {
      content: (
        <div className="flex items-center  rounded">
          <div className="flex-grow flex gap-2 items-center justify-center">
            <FaLocationArrow className="h-4 w-4 text-white" />
            <span className="text-xs text-white font-semibold">
              {JobDetails?.location}
            </span>
          </div>
        </div>
      ),
    },
    {
      content: (
        <div className="flex items-center  rounded">
          <div className="flex-grow flex gap-2 items-center justify-center">
            <GrUserExpert className="h-4 w-4 text-white" />
            <span className="text-xs text-white font-semibold">
              {JobDetails?.experience} Years of Experience
            </span>
          </div>
        </div>
      ),
    },
  ];
  return (
    <DfxStats
      variant="one"
      items={sectionItems}
      className="py-0 px-0 md:px-0 lg:px-0 lg:py-0 w-full"
      itemContainerClassName="w-full lg:grid-cols-3 p-2 bg-primary/80 rounded-lg"
      itemClassName="flex justify-center items-center"
    />
  );
};

export default JobStats;
