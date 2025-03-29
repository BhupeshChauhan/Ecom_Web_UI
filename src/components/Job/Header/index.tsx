import { Link, useNavigate } from "react-router-dom";
import { Button } from "@dashflowx/core";
import JobStats from "../Stats";
import { useJobFormContext } from "../../../context/JobFormProvider";
import CompanyLogo from "../../Auth/CompanyLogo";
import { retrieveValue } from "../../../utils";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { CiSettings } from "react-icons/ci";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";

const JobHeader = ({ data, handleSettingModal }) => {
  const navigate = useNavigate();
  const { step, handleStepChange } = useJobFormContext();

  const companyData = retrieveValue("companyData");
  return (
    <>
      <div className="flex justify-between w-full items-center border-b-1 p-4 bg-white shadow-md">
        <div className="flex gap-3 items-center justify-center p-2">
          <Link to="/jobs">
            <h4 className="mb-0 font-normal">Jobs</h4>
          </Link>
          <>{">"}</>
          <h3 className="mb-0 font-bold">Job Details</h3>
        </div>
        <div className="flex gap-3 items-end">
          <Link to={`/jobs/preview/${location.pathname.split("/")[3]}`}>
            <Button variant="ghost" className="text-sm">
              Preview
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="bg-primary/20 text-sm"
            onClick={() => {
              navigate(`/jobs/edit/${location.pathname.split("/")[3]}`);
              handleStepChange(1);
            }}
          >
            Edit Job
          </Button>
          <Link to={`/jobs/screeningques/${location.pathname.split("/")[3]}`}>
            <Button variant="solid" color="primary" className="text-sm">
              Edit Questions
            </Button>
          </Link>
          <Button variant="solid" className="text-sm" onClick={handleSettingModal}>
            <IoSettingsOutline className="w-6 h-6" />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4 px-8">
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h1 className="font-semibold text-gray-900 mb-2">{data?.title}</h1>
          <div className="flex items-center text-gray-500 mb-4">
            <LiaMapMarkerAltSolid />
            <span>{data?.location || "Remote"}</span>
            <span className="mx-2">•</span>
            <span>{data?.experience} years of exp.</span>
          </div>
          <p className="text-gray-700">{data?.jobDetails}</p>
        </div>
      </div>
    </>
  );
};

export default JobHeader;
