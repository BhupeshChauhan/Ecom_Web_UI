import { Button } from "@dashflowx/core";
import { PlayCircleIcon } from "lucide-react";
import { cn } from "../../../../utils";

const Indicator = ({ index, score, formattedScore }) => {
  return (
    <div
      className={cn(
        "w-12 h-6 rounded-md flex items-center justify-center",
        score < 4
          ? "bg-badge-red text-red-900"
          : score > 4 && score < 8
            ? "bg-badge-yellow text-yellow-900"
            : "bg-badge-green text-green-900",
        "mr-2 text-sm",
      )}
    >
      {formattedScore}
    </div>
  );
};

const RecordedResponsesCard = ({
  element,
  setSelectedResponse,
  index,
  refScrollUp,
  SelectedResponse,
}) => {
  return (
    <div
      className={cn(
        "bg-white",
        index === SelectedResponse ? "border border-primary" : "",
        "w-full rounded-xl p-2",
      )}
    >
      <Button
        variant="ghost"
        onClick={() => {
          setSelectedResponse(index);
          refScrollUp.current.scrollIntoView({ behavior: "smooth" });
        }}
        style={{ width: "100%" }}
      >
        <div className="flex text-start flex-col w-full">
          <div className="flex flex-row w-full items-center justify-between">
            <div className="flex flex-row items-center justify-center">
              <Indicator
                index={index}
                score={element.score}
                formattedScore={element.formattedScore}
              />
              <h5 className="text-md tracking-tight text-black dark:text-white font-normal pr-2">
                {index + 1}. {element.question}
              </h5>
            </div>

            {/* <h4  className={cn(
                    element.score < 4 ? "text-[#D74544]" : element.score > 4 && element.score < 8 ? "text-[#EF7B2A]" : "text-[#458946]",
                    "mb-0 font-bold",
      )}>{element.formattedScore}</h4> */}
          </div>
        </div>
      </Button>
    </div>
  );
};

export default RecordedResponsesCard;
