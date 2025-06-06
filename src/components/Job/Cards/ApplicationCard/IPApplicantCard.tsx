import { Button } from "@dashflowx/core";
import { useState } from "react";
import { retrieveValue } from "../../../../utils";
import { UseDataGrid } from "@dashflowx/datagrid";
import JobService from "../../../../Api/JobService";

export const IPApplicantCard = ({ jobDetails }) => {
  const {
    name,
    designation,
    id,
    profileImageUrl,
    experience,
    email,
    contact,
    interviewId,
    resumeUrl,
  } = jobDetails;
  const token = retrieveValue("accessToken");
  const { handleReload, error } = UseDataGrid();
  const { isLoading, CancelInviteStatus } = JobService();

  const handleCancelInvite = async (id) => {
    await CancelInviteStatus({ interviewId: id });
    handleReload(
      `${import.meta.env.VITE_API_JOB_BASE_URI}/jobs/applicants/${location.pathname.split("/")[2]}?status=interview-pending`,
      token,
    );
  };
  const [ImageFallback, setImageFallback] = useState(profileImageUrl);
  return (
    <div className="flex flex-col text-left px-3 py-0 pt-8  w-full">
      <div className="flex flex-col w-full">
        <div className="mr-2">
          {ImageFallback ? (
            <img
              src={profileImageUrl}
              alt={name}
              className="w-14 aspect-square rounded-full"
              onError={() => setImageFallback(false)}
            />
          ) : (
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-slate-200">
              {name.split(" ")[0][0]}
              {name.split(" ")[1][0]}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-bold leading-7 text-gray-900 text-xl">{name}</h2>
          <p className="mt-2 text-md text-gray-800 dark:text-gray-400 w-fit flex items-center">
            {designation}
          </p>
        </div>
        <div className="flex items-center justify-end">
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" fullwidth={true}>
              Download Resume
            </Button>
          </a>
        </div>

        <div className="h-[1px] bg-gray-200 w-full my-4" />
      </div>
      <div className="flex items-start justify-start pt-4 text-sm">
        <div className="flex flex-col w-[80%]">
          <div className="grid grid-cols-4 gap-3 pt-4 w-full text-sm">
            <div className="flex flex-col text-md">
              <span className="font-thin">Years of Experience</span>
              <span>{experience}</span>
            </div>
            <div className="flex flex-col  text-md">
              <span className="font-thin">Email</span>
              <span>{email}</span>
            </div>
            <div className="flex flex-col  text-md">
              <span className="font-thin">Phone No.</span>
              <span>{contact}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 w-[20%] text-sm">
          <Button
            variant="solid"
            color="primary"
            fullwidth={true}
            disabled={isLoading}
            onClick={() => handleCancelInvite(interviewId)}
          >
            Revoke invite
          </Button>
        </div>
      </div>
    </div>
  );
};
