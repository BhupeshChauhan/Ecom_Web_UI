import { useEffect, useState } from "react";
import AuthService from "../../Api/AuthService";
import { Button } from "@dashflowx/core";
import { retrieveValue } from "../../utils";
import { LoaderMask } from "../Loader";
import { useMainContext } from "../../context/MainProvider";
import { DatagridProvider } from "@dashflowx/datagrid";
import UsageDataGrid from "../DataGrid/UsageDataGrid";
import JobWiseUsageDataGrid from "../DataGrid/JobWiseUsageDataGrid";

const AccountUsage = () => {
  const { isLoading, GetActivePlanDetails } = AuthService();
  const [data, setData] = useState<any>({});
  const [ClientSecret, setClientSecret] = useState("");
  const userData = retrieveValue("userData");
  const { handlePlanTabChange } = useMainContext();

  useEffect(() => {
    GetActivePlanDetails(
      (data) => {
        setData(data.planDetails.plans);
        setClientSecret(data.clientSecret);
      },
      () => {},
    );
  }, []);
  return (
    <div className="flex gap-3">
      {isLoading && <LoaderMask />}
      <div className="flex flex-col w-[70%] gap-6">
        <div className="flex flex-col gap-3 text-gray-900 rounded-2xl p-6 xl:py-9 xl:px-12 transition-all duration-500 hover:bg-gray-50 shadow-md">
          <h3 className="font-manrope text-2xl font-bold mb-3">
            Current Month Usage
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col w-[80%]">
              <h3 className="font-manrope text-lg mb-3">AI Video Interviews</h3>
              <span className="text-sm">
                100/700 (500/month + 200 Rollover)
                <span className="text-red-400 ml-2">
                  *Rollover expires 11/30/2024
                </span>
              </span>
            </div>
            <div className="flex flex-col w-[80%]">
              <h3 className="font-manrope text-lg mb-3">Resume AI Match</h3>
              <span className="text-sm">100/Unlimited</span>
            </div>
          </div>
        </div>
        <DatagridProvider>
          <UsageDataGrid isLoading={false} data={[]} />
        </DatagridProvider>
        <DatagridProvider>
          <JobWiseUsageDataGrid isLoading={false} data={[]} />
        </DatagridProvider>
        <div className="flex flex-col gap-3 text-gray-900 rounded-2xl p-6 xl:py-9 xl:px-12 transition-all duration-500 hover:bg-gray-50 shadow-md">
          <h3 className="font-manrope text-2xl font-bold mb-3">Add-ons</h3>
          <div className="flex gap-3">
            <div className="flex flex-col w-[80%]">
              <h3 className="font-manrope text-lg mb-3">Total Users</h3>
              <span className="text-sm">2 / 10 Users</span>
            </div>
            <div className="w-[20%]">
              <Button variant="ghost" fullwidth={true} className="p-0">
                Add Users
              </Button>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col w-[80%]">
              <h3 className="font-manrope text-lg mb-3">Total Open Jobs</h3>
              <span className="text-sm">20 / Unlimited Jobs</span>
            </div>
            {/* <div className="w-[20%]">
                <Button variant="ghost" fullwidth={true} className="p-0">
                  Add Jobs
                </Button>
            </div> */}
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col w-[80%]">
              <h3 className="font-manrope text-xl mb-3">
                Pay as you go - AI Video Interview
              </h3>
              <span className="text-sm">10USD / 10 Video Interview</span>
            </div>
            <div className="w-[20%]">
              <a
                href={`https://pay.hireomatic.com/b/test_14k7ww9Qc2Lm5zO3cm?prefilled_email=${userData.email}&client_reference_id=${ClientSecret}`}
              >
                <Button variant="ghost" fullwidth={true} className="p-0">
                  Add Video Interview
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[30%] gap-6">
        <div className="flex flex-col text-gray-900 rounded-2xl p-6 xl:py-9 xl:px-12 transition-all duration-500 hover:bg-gray-50 shadow-md">
          <div className="flex items-center mb-6 w-full">
            <div className="w-[70%]">
              <h3 className="font-manrope text-2xl font-bold mb-3">
                {data?.name}
              </h3>
              <span className="font-manrope mr-2 text-2xl font-semibold">
                ${data?.price}
              </span>
              <span className="text-xl text-gray-500 ">/ month</span>
            </div>
            <div className="flex items-end justify-end w-[30%]">
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  handlePlanTabChange(2);
                }}
              >
                Upgrade
              </Button>
            </div>
          </div>
          <ul className="mb-6 ml-0 grid grid-cols-2 align-top gap-6 text-left text-lg text-gray-500">
            {data?.description?.split(", ").map((data, index) => (
              <li className="flex" key={index}>
                <svg
                  className="flex-shrink-0 w-6 h-6 text-primary"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>{data}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col text-gray-900 rounded-2xl bg-gray-50 p-6 xl:py-9 xl:px-12 transition-all duration-500 hover:bg-gray-100">
          <h3 className="font-manrope text-xl mb-3">
            You need some help to know the right plan that fits your needs?
            Please let our support team answer you.
          </h3>
          <Button variant="ghost">Contact our support team</Button>
        </div>
      </div>
    </div>
  );
};

export default AccountUsage;
