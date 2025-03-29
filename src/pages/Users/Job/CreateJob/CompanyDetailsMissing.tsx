import { Button } from "@dashflowx/core";
import { Info } from "lucide-react";
import { Link } from "react-router-dom";

// Component for displaying missing company details message
export const CompanyDetailsMissing = () => (
  <div className="flex bg-white border-dashed border-2 rounded-lg h-full">
    <div className="flex gap-6 items-center h-[calc(100vh-400px)] p-28 w-[60%]">
      <div className="bg-slate-100 p-8 rounded-full">
        <Info className="h-32 w-32 text-slate-500" />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Company Details Missing</h1>
        <p className="text-md font-thin">
          Before creating the job post, please ensure all company details are
          complete, including the logo, name, and description. Missing
          information can affect the accuracy and effectiveness of your job
          listing.
        </p>
        <Link to="/settings/organization">
          <Button variant="ghost" className="p-0">
            Go to organization settings
          </Button>
        </Link>
      </div>
    </div>
    <div className="h-full flex items-center justify-center w-[40%]">
      <img
        src="/companymissing.jpeg"
        alt="Missing company details"
        className="w-full h-full"
      />
    </div>
  </div>
);
