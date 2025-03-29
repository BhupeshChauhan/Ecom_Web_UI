import { BsArrowRight } from "react-icons/bs";
import { FaRegCalendar } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import { format } from "date-fns";

export const CurrentPlanCard = ({
  currentPlan,
  onManageSubscription,
  stripeCustomerId
}: {
  currentPlan: any;
  onManageSubscription: () => void;
  stripeCustomerId: any
}) => {
  const price = currentPlan.price;
  const endDate =
    currentPlan.endDate && format(currentPlan.endDate, "MM/dd/yyyy");
  return (
    // TODO: Add condition to show plan card or no plan selected card
    true ? (
      <div className="flex flex-col items-start gap-2 p-6 w-full rounded-2xl border border-[#ffdccc] bg-[#fff1eb]">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col justify-center items-start">
            <div className="text-opacity-[0.6] text-[#020c17] font-['Golos Text'] text-xs">
              Current plan
            </div>
            <div className="text-[#020c17] font-['Golos Text'] text-lg font-medium leading-6">
              {currentPlan.name}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <HiOutlineSparkles
                  color="#ff4f01"
                  strokeWidth={1.5}
                  size={25}
                />

                <div className="text-[#020c17] font-['Golos Text'] leading-5">
                  {currentPlan.interviewLimit} AI interviews remaining
                </div>
              </div>
            </div>
            {stripeCustomerId && <div className="flex items-center gap-4">
              <div
                className="flex justify-center items-center gap-2 py-3 px-0 rounded-lg"
                onClick={onManageSubscription}
              >
                <div className="text-[#ff4f01] font-['Golos Text'] font-semibold leading-6">
                  Manage subscription
                </div>
                <BsArrowRight color="#ff4f01" strokeWidth={0} size={25} />
              </div>
            </div>}
          </div>
        </div>
        {stripeCustomerId && <div className="flex items-center gap-3 self-stretch p-4 rounded-lg bg-[#ffdccc]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaRegCalendar size={24} />
              <div className="text-[#020c17] font-['Golos Text'] leading-5">
                Your next bill is&nbsp;${price}&nbsp;{" "}
                {endDate ? `on ${endDate}` : ""}
              </div>
            </div>
          </div>
        </div>}
      </div>
    ) : (
      <div className="self-stretch px-6 py-4 bg-[#fff1eb] rounded-2xl border border-[#ffdccc] justify-start items-center gap-2 inline-flex">
        <div className="grow shrink basis-0 h-6 justify-start items-center gap-4 flex">
          <div className="text-[#020c17] text-lg font-medium font-['Golos Text'] leading-normal">
            Not sure which plan to choose?
          </div>
        </div>
        <div className="py-3 rounded-lg justify-center items-center gap-2 flex">
          <div className="text-[#ff4f01] text-base font-semibold font-['Golos Text'] leading-normal">
            Take a 2 mins quiz
          </div>
        </div>
      </div>
    )
  );
};
