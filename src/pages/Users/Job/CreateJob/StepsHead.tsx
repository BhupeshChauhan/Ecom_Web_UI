import { Button } from "@dashflowx/core";
import { useJobFormContext } from "../../../../context/JobFormProvider";
import { cn } from "../../../../utils";
import { BsCheck } from "react-icons/bs";

const StepsHead = ({ type }: any) => {
  const { step, handleStepChange } = useJobFormContext();
  return (
    // <div className="w-full h-fit bg-white border border-gray-200 shadow-sm rounded-2xl">
    //   {step !== 1 ? (
    //     <Button variant="ghost" onClick={() => handleStepChange(1)}>
    //       <span className="typography-h6 font-bold">Basic Requirements</span>
    //     </Button>
    //   ) : (
    //     <Button variant="ghost" className="text-black">
    //       <span className="typography-h6 font-bold">Basic Requirements</span>
    //     </Button>
    //   )}
    //   <span className="font-extrabold">{`>`}</span>
    //   {step > 2 ? (
    //     <Button variant="ghost" onClick={() => handleStepChange(2)}>
    //       <span className="typography-h6 font-bold">Job Description</span>
    //     </Button>
    //   ) : (
    //     <Button variant="ghost" className="text-black">
    //       <span className="typography-h6 font-bold">Job Description</span>
    //     </Button>
    //   )}
    //   <span className="font-extrabold">{`>`}</span>
    //   {step > 3 ? (
    //     <Button variant="ghost" onClick={() => handleStepChange(3)}>
    //       <span className="typography-h6 font-bold">Preview Job</span>
    //     </Button>
    //   ) : (
    //     <Button variant="ghost" className="text-black">
    //       <span className="typography-h6 font-bold">Preview Job</span>
    //     </Button>
    //   )}

    // </div>
    <div className="w-full h-fit bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
      <div className="relative flex flex-col space-y-4 m-6">
        <Button
          variant="ghost"
          onClick={() => handleStepChange(1)}
          className="w-fit p-0"
          disabled={step === 1}
        >
          <div className="flex items-center space-x-2">
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full border-2 border-orange-500 font-bold z-10 ",
                step === 1
                  ? "bg-[#FFE0D5] text-orange-500"
                  : "bg-primary text-white",
              )}
            >
              {step === 1 ? "1" : <BsCheck className="w-8 h-8" />}
            </div>
            <div className="text-orange-500 font-semibold">Basic info</div>
          </div>
        </Button>
        <div
          className={cn(
            "absolute left-4 top-0 bottom-16 w-0.5",
            step === 2 ? "bg-primary" : "bg-gray-300",
          )}
        ></div>
        <Button
          variant="ghost"
          onClick={() => handleStepChange(2)}
          className="w-fit p-0"
          disabled={step < 2}
        >
          <div className="flex items-center space-x-2 bg-white">
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full border-2",
                step === 2
                  ? "text-primary border-orange-500 font-bold z-10 bg-[#FFE0D5]"
                  : "border-gray-300 text-gray-300 font-bold z-10 bg-white",
              )}
            >
              2
            </div>
            <div className={cn(step === 2 ? "text-primary" : "text-gray-500")}>
              Job Description
            </div>
          </div>
        </Button>
        <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gray-300"></div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 text-gray-300 font-bold z-10 bg-white">
            3
          </div>
          <div className="text-gray-500">Preview</div>
        </div>
      </div>
    </div>
  );
};

export default StepsHead;
