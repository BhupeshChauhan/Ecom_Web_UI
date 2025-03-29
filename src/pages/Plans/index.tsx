import { TabsComp, TabsContent, TabsList, TabsTrigger } from "@dashflowx/core";
import { cn } from "../../utils";
import { useMainContext } from "../../context/MainProvider";
import UpgradePlan from "../../components/Plans/UpgradePlan";
import AccountUsage from "../../components/Plans/AccountUsage";

export type Jobs = {
  id: string;
  title: string;
  type: "Remote";
  experience: string;
  contract: string;
  budget: string;
  status: string;
  location: string;
  description: string;
  shift: string;
  notice: string;
  tags: {
    id: string;
    name: string;
  }[];
  createdAt: string;
  createdBy: string;
  shortListed: number;
};

const Plans = () => {
  const { activePlans, handlePlanTabChange } = useMainContext();

  const tabsArray = [
    {
      content: <>{activePlans === 1 && <AccountUsage />}</>,
      id: 1,
      title: "Account usage",
      path: "/jobs/active",
    },
    {
      content: <>{activePlans === 2 && <UpgradePlan />}</>,
      id: 2,
      title: "Upgrade Plan",
      path: "/jobs/closed",
    },
    // {
    //   content: <>{activePlans === 3 && <PaymentMethods />}</>,
    //   id: 3,
    //   title: "Payment methods",
    //   path: "/jobs/draft",
    // },
    // {
    //   content: <>{activePlans === 3 && <BillingInformation />}</>,
    //   id: 4,
    //   title: "Billing information",
    //   path: "/jobs/draft",
    // },
    // {
    //   content: <>{activePlans === 3 && <BillingHistory />}</>,
    //   id: 5,
    //   title: "Billing history",
    //   path: "/jobs/draft",
    // },
  ];
  return (
    <div>
      <TabsComp defaultValue="account" className={cn("w-full")}>
        <TabsList className="flex items-start justify-start">
          {tabsArray.map((tab: any) => (
            <TabsTrigger
              value="account"
              key={tab.id}
              className={cn(
                "inline-block p-4 pl-2 border-b-2 typography-h5 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 pt-2",
                activePlans === tab.id
                  ? "text-primary-light font-extrabold"
                  : "text-gray-500",
              )}
              onClick={() => handlePlanTabChange(tab.id)}
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="account" className="w-full">
          {tabsArray[activePlans - 1]?.content}
        </TabsContent>
      </TabsComp>
    </div>
  );
};

export default Plans;
