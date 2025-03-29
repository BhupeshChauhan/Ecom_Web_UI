import { Button } from "@dashflowx/core";
import { useNavigate } from "react-router-dom";
import { UseDataGrid } from "@dashflowx/datagrid";
import JobService from "../../../../Api/JobService";
import { Download } from "lucide-react";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { CiMail } from "react-icons/ci";

export const CandidateCard = ({ item, onCardClick }) => {
  const { isLoading, DownloadResume } = JobService();
  console.log(item);
  const {
    name,
    designation,
    email,
    phone,
    experience,
    applicationId,
    resumeUrl,
    applicationStatus,
    updatedAt,
  } = item;

  const getNameInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    return `${nameParts[0][0]}${nameParts[1] ? nameParts[1][0] : ""}`;
  };

  const handleDownloadResume = async (applicationId, resumeUrl) => {
    resumeUrl
      ? window.open(resumeUrl, "_blank")
      : await DownloadResume(applicationId);
  };

  const { handleReload } = UseDataGrid();
  const lastContactedOn =
    applicationStatus !== "applied"
      ? new Date(updatedAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Never";
  return (
    <div className="bg-white p-6  rounded-lg w-full" onClick={onCardClick}>
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full">
          <span className="text-gray-700 font-semibold text-lg">
            {getNameInitials(name)}
          </span>
        </div>
        <div className="ml-3">
          <Button variant="ghost" className="p-0" onClick={onCardClick}>
            <h4 className="p-0 m-0 text-primary">{name || "N/A"}</h4>
          </Button>
          <p className="text-gray-500 text-sm">{experience || "N/A"} yrs</p>
        </div>
      </div>
      <p className="text-[#020C17] mb-4 text-lg">{designation}</p>
      <div className="flex items-center text-gray-700 mb-2">
        <CiMail size={20} color="#899198" strokeWidth={1} />
        <span className="ml-2 text-[#020C17]">{email || "N/A"}</span>
      </div>
      <div className="flex items-center text-gray-700 mb-4">
        <HiOutlineDevicePhoneMobile size={20} color="#899198" />
        <span className="ml-2 text-[#020C17]">{phone || "N/A"}</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center text-orange-500">
          <Button
            onClick={() => handleDownloadResume(applicationId, resumeUrl)}
            variant="ghost"
            className="font-semibold p-0"
          >
            <Download className="mr-2" /> Download CV{" "}
          </Button>
        </div>
        <p className="text-gray-400 text-sm text-right">
          {lastContactedOn === "Never" ? "Last contacted" : "Last contacted on"}
          <br />
          {lastContactedOn}
        </p>
      </div>
    </div>
  );
};

export default CandidateCard;
