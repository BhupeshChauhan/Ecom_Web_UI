import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import AuthService from "../../../Api/AuthService";
import { LoaderMask } from "../../../components/Loader";
import { CurrentPlanCard } from "../../../components/Admin/CurrentPlanCard";
import { retrieveValue } from "../../../utils";
import { Check, X } from "lucide-react";

const transformPlanData = (
  planData: any[],
  currentPlanId: number,
  isYearly: boolean,
) => {
  // Transform regular plans
  const regularPlans = planData.map((plan) => ({
    id: plan.id,
    name: plan.name,
    price: isYearly ? plan.discountedPrice : plan.price,
    period: "per month",
    billing: isYearly ? "billed yearly" : "billed monthly",
    isCurrentPlan: currentPlanId === plan.id,
    buttonText: currentPlanId === plan.id ? "Current plan" : "Get started",
    buttonVariant: currentPlanId === plan.id ? "current" : "primary",
    features: plan.description.split(", "),
    priceId: plan.priceId,
    ribbonText:
      plan.name === "Starter"
        ? "$49.99 / job"
        : plan.name === "Growth"
          ? "$33.33 / job"
          : plan.name === "Peak"
            ? "$24.99 / job"
            : null,
    paymentLink: plan.paymentLink,
  }));

  return [...regularPlans].filter(Boolean);
};

const Billing = () => {
  const {
    isLoading,
    GetPlansDetails,
    CreatePaymentIntent,
    CancelSubscription,
    CreateCheckoutSession,
    CreateCustomerPortalSession,
  } = AuthService();
  const [MonthlyData, setMonthlyData] = useState([]);
  const [YearlyData, setYearlyData] = useState([]);
  const [FreePlan, setFreePlan] = useState([]);
  const [currentPlan, setCurrentPlan] = useState<any>({});
  const [isYearly, setIsYearly] = useState(false);
  const [planData, setPlanData] = useState<any>([]);
  const [ClientSecret, setClientSecret] = useState("");
  const companyData = retrieveValue("companyData");

  useEffect(() => {
    GetPlansDetails(
      (data) => {
        const monthlyData = data.planDetails.filter(
          (plan) => plan.duration === "monthly",
        );
        const yearlyData = data.planDetails.filter(
          (plan) => plan.duration === "annually",
        );
        setMonthlyData(monthlyData);
        setYearlyData(yearlyData);

        // add details from planDetails with planId
        const planDetails = data.planDetails.find(
          (plan) => plan.id === data.subscriptionDetails.planId,
        );
        setCurrentPlan({ ...data.subscriptionDetails, ...planDetails });
        setPlanData(yearlyData);

        if (
          data.subscriptionDetails.planId === 3 ||
          data.subscriptionDetails.planId === 5 ||
          data.subscriptionDetails.planId === 7
        ) {
          setIsYearly(true);
        }
      },
      () => {},
    );

    CreatePaymentIntent((data) => {
      setClientSecret(data.clientSecret);
    });
  }, []);

  const transformedPlans = transformPlanData(
    planData,
    currentPlan?.planId || 0,
    isYearly,
  );

  const handleCancelSubscription = async () => {
    try {
      await CancelSubscription({ subscriptionId: currentPlan.subscriptionId });
    } catch (error) {
      console.error("Error in cancellation:", error);
    }
  };

  const handlePlanSelection = async (plan: any) => {
    try {
      // Create checkout session for the selected plan
      const res = await CreateCheckoutSession({
        priceId: plan.priceId,
        customerId: companyData.stripeCustomerId,
        referenceId: ClientSecret,
      });
      window.open(`${res.url}`, "_blank");
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const res = await CreateCustomerPortalSession({
        customerId: companyData.stripeCustomerId,
      });
      window.open(`${res.url}?client_reference_id=${ClientSecret}`, "_blank");
    } catch (error) {
      console.error("Error accessing customer portal:", error);
    }
  };

  return (
    <>
      {isLoading && <LoaderMask />}
      <div className="h-[100%] w-full bg-neutral-50 justify-start items-start inline-flex overflow-hidden">
        <div className="w-full h-full flex-col justify-start items-start inline-flex">
          <div className="self-stretch p-6 flex-col justify-start items-start gap-6 flex">
            <CurrentPlanCard
              currentPlan={currentPlan}
              onManageSubscription={handleManageSubscription}
              stripeCustomerId={companyData.stripeCustomerId}
            />
            <div className="self-stretch flex-col justify-start items-start gap-4 flex">
              <div className="justify-start items-start gap-2 inline-flex">
                <div
                  onClick={() => {
                    setIsYearly(!isYearly);
                    setPlanData(!isYearly ? YearlyData : MonthlyData);
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
                {transformedPlans.map((plan, index) => (
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

                    <a
                      href={!companyData.stripeCustomerId ? plan.paymentLink : undefined}
                      className={`self-stretch py-3 ${plan.isCurrentPlan ? "bg-[#fff1eb]" : plan.name === "Free" ? "bg-red-500" : "bg-[#ff4f01]"} rounded-lg justify-center items-center inline-flex mt-4 cursor-pointer`}
                      onClick={(e) => {
                        if (companyData.stripeCustomerId) {
                          e.preventDefault();
                          if (!plan.isCurrentPlan) {
                            handlePlanSelection(plan);
                          }
                        }
                      }}
                    >
                      {plan.name === "Free" && (
                        <X className="h-5 w-5 text-white" />
                      )}
                      <div
                        className={`text-${plan.isCurrentPlan ? "[#ff4f01]" : "white"} text-base font-semibold font-['Golos Text'] leading-normal`}
                      >
                        {plan.buttonText}
                      </div>
                      {!plan.isCurrentPlan && plan.name !== "Free" && (
                        <BsArrowRight
                          color="#FFFFFF"
                          strokeWidth={0}
                          size={20}
                          className="ml-2"
                        />
                      )}
                    </a>

                    <div className="self-stretch h-[168px] flex-col justify-start items-start gap-3 flex">
                      {plan.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="self-stretch justify-start items-center gap-2 inline-flex"
                        >
                          <Check className="w-4 h-4 text-[#ff4f01]" />
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
