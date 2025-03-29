import React, { useEffect, useState } from "react";
import { BsArrowRight, BsCalendar } from "react-icons/bs";
import { FaRegCalendar } from "react-icons/fa";
import { HiOutlineBriefcase, HiOutlineSparkles } from "react-icons/hi";
import AuthService from "../../../Api/AuthService";
import { LoaderMask } from "../../../components/Loader";

const pricingPlans = [
  {
    name: "Pay as you go",
    price: 99,
    period: "per job",
    billing: "billed monthly",
    isCurrentPlan: true,
    buttonText: "Current plan",
    buttonVariant: "current",
    features: [
      "1 Job Post",
      "100 AI Interviews",
      "Auto JD Creation and regeneration",
      "Auto Resume Screening",
      "Auto Question Generation",
    ],
    ribbonText: null,
  },
  {
    name: "Starter",
    price: 249,
    period: "per month",
    billing: "billed yearly",
    isCurrentPlan: false,
    buttonText: "Get started",
    buttonVariant: "primary",
    features: [
      "5 Job Posts",
      "500 AI Interviews",
      "Auto JD Creation and regeneration",
      "Auto Resume Screening",
      "Auto Question Generation",
    ],
    ribbonText: "$49.99 / job",
  },
  {
    name: "Growth",
    price: 499,
    period: "per month",
    billing: "billed yearly",
    isCurrentPlan: false,
    buttonText: "Get started",
    buttonVariant: "primary",
    features: [
      "15 Job Posts",
      "1,500 AI Interviews",
      "Auto JD Creation and regeneration",
      "Auto Resume Screening",
      "Auto Question Generation",
    ],
    ribbonText: "$33.33 / job",
  },
  {
    name: "Peak 🔥",
    price: 999,
    period: "per month",
    billing: "billed yearly",
    isCurrentPlan: false,
    buttonText: "Upgrade",
    buttonVariant: "primary",
    features: [
      "40 Job Posts",
      "4,000 AI Interviews",
      "Auto JD Creation and regeneration",
      "Auto Resume Screening",
      "Auto Question Generation",
    ],
    ribbonText: "$24.99 / job",
  },
];

const Billing = () => {
  const { isLoading, GetActivePlanDetails, GetPlansDetails } = AuthService();
  const [data, setData] = useState<any>({});
  const [MonthlyData, setMonthlyData] = useState([]);
  const [YearlyData, setYearlyData] = useState([]);
  const [payAsYouGo, setPayAsYouGo] = useState([]);
  const [currentPlan, setCurrentPlan] = useState<any>({});
  const [isYearly, setIsYearly] = useState(false);
  const [planData, setPlanData] = useState<any>([]);

  // useEffect(() => {
  //     GetActivePlanDetails(
  //         (data) => {
  //             setData(data.planDetails.plans);
  //         },
  //         () => {},
  //     );
  // }, []);

  useEffect(() => {
    GetPlansDetails(
      (data) => {
        const monthlyData = data.planDetails.filter(
          (plan) => plan.duration === "monthly",
        );
        const yearlyData = data.planDetails.filter(
          (plan) => plan.duration === "annually",
        );
        const payAsYouGo = data.planDetails.filter(
          (plan) => plan.duration === "pay as you go",
        );
        setMonthlyData(monthlyData);
        setYearlyData(yearlyData);
        setPayAsYouGo(payAsYouGo);
        setCurrentPlan(data.subscriptionDetails);
        setPlanData(yearlyData);

        console.log("monthlyData", monthlyData);
        console.log("yearlyData", yearlyData);
        console.log("payAsYouGo", payAsYouGo);
        console.log("data.subscriptionDetails", data.subscriptionDetails);

        if (
          data.subscriptionDetails.planId === 2 ||
          data.subscriptionDetails.planId === 4 ||
          data.subscriptionDetails.planId === 6
        ) {
          //   setSelectedDuration(true);
        }
      },
      () => {},
    );
  }, []);

  return (
    <>
      {isLoading && <LoaderMask />}
      <div className="h-[100%] w-full bg-neutral-50 justify-start items-start inline-flex overflow-hidden">
        <div className="w-full h-full flex-col justify-start items-start inline-flex">
          <div className="self-stretch p-6 flex-col justify-start items-start gap-6 flex">
            <CurrentPlanCard />
            <div className="self-stretch flex-col justify-start items-start gap-4 flex">
              <div className="justify-start items-start gap-2 inline-flex">
                <div
                  onClick={() => {
                    setIsYearly(!isYearly);
                    setPlanData(isYearly ? YearlyData : MonthlyData);
                  }}
                  className={`w-9 h-5 p-0.5 ${isYearly ? "bg-[#ff4f01]" : "bg-gray-300"} rounded-xl justify-${isYearly ? "end" : "start"} items-center flex overflow-hidden cursor-pointer`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10)]" />
                </div>
                <div className="text-[#344053] text-sm font-medium font-['Inter'] leading-tight">
                  Yearly discount -30%
                </div>
              </div>
              <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
                {pricingPlans.map((plan, index) => (
                  <div
                    key={index}
                    className={`relative grow shrink basis-0 self-stretch p-6 bg-white rounded-2xl border border-[#e3eaee] flex-col justify-start items-start gap-6 inline-flex overflow-hidden`}
                  >
                    <div className="self-stretch text-center text-[#020c17] text-lg font-semibold font-['Golos Text'] leading-normal">
                      {plan.name}
                    </div>
                    <div className="self-stretch h-[78px] flex-col justify-center items-center gap-1.5 flex">
                      <div className="text-[#ff4f01] text-[40px] font-semibold font-['Golos Text'] leading-loose">
                        ${plan.price}
                      </div>
                      <div className="flex-col justify-start items-center flex">
                        <div className="opacity-70 text-[#ff4f01] text-base font-medium font-['Golos Text'] leading-normal">
                          {plan.period}
                        </div>
                        <div className="opacity-70 text-[#4e5760] text-xs font-medium font-['Golos Text'] leading-none">
                          {plan.billing}
                        </div>
                      </div>
                    </div>

                    {plan.ribbonText && (
                      <div className="w-[200px] top-10 -left-10 absolute -rotate-45 bg-[#020c17] justify-center items-center inline-flex">
                        <div className="text-white text-sm font-medium font-['Golos Text'] uppercase leading-normal">
                          {plan.ribbonText}
                        </div>
                      </div>
                    )}

                    <div
                      className={`self-stretch py-3 ${plan.isCurrentPlan ? "bg-[#fff1eb]" : "bg-[#ff4f01]"} rounded-lg justify-center items-center inline-flex mt-4`}
                    >
                      <div
                        className={`text-${plan.isCurrentPlan ? "[#ff4f01]" : "white"} text-base font-semibold font-['Golos Text'] leading-normal`}
                      >
                        {plan.buttonText}
                      </div>
                      {!plan.isCurrentPlan && (
                        <BsArrowRight
                          color="#FFFFFF"
                          strokeWidth={0}
                          size={20}
                          className="ml-2"
                        />
                      )}
                    </div>

                    <div className="self-stretch h-[168px] flex-col justify-start items-start gap-3 flex">
                      {plan.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="self-stretch justify-center items-center gap-2 inline-flex"
                        >
                          <div className="w-3 h-3 relative overflow-hidden" />
                          <div className="grow shrink basis-0 text-[#020c17] text-base font-normal font-['Golos Text'] leading-tight">
                            {feature}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Billing;

const CurrentPlanCard = () => {
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
              Growth
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <HiOutlineBriefcase
                  color="#ff4f01"
                  strokeWidth={1.5}
                  size={25}
                />
                <div className="text-[#020c17] font-['Golos Text'] leading-5">
                  4 job posts remaining
                </div>
              </div>
              <div className="flex items-center gap-1">
                <HiOutlineSparkles
                  color="#ff4f01"
                  strokeWidth={1.5}
                  size={25}
                />

                <div className="text-[#020c17] font-['Golos Text'] leading-5">
                  548 AI interviews remaining
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center gap-2 py-3 px-0 rounded-lg">
                <div className="text-[#ff4f01] font-['Golos Text'] font-semibold leading-6">
                  Upgrade
                </div>
                <BsArrowRight color="#ff4f01" strokeWidth={0} size={25} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 self-stretch p-4 rounded-lg bg-[#ffdccc]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaRegCalendar size={24} />
              <div className="text-[#020c17] font-['Golos Text'] leading-5">
                Your next bill is&nbsp;$499&nbsp;on&nbsp;Nov 23, 2025. Your card
                ending in ••••&nbsp;4781&nbsp;will be charged.
              </div>
              <div className="flex justify-center items-center gap-2 rounded-lg text-[#020c17] font-['Golos Text'] font-semibold leading-6">
                Update payment method
              </div>
            </div>
          </div>
        </div>
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
          <div className="w-6 h-6 relative" />
          {/* <div className="w-[200px] top-10 -left-10 absolute -rotate-45 bg-[#020c17] justify-center items-center inline-flex">
                                    <div className="text-white text-base font-medium font-['Golos Text'] uppercase leading-normal">$49.99 / job</div>
        </div> */}
        </div>
      </div>
    )
  );
};
