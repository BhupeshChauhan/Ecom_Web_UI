import {
  Button,
  DropdownMenuContent,
  DropdownMenuComp,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@dashflowx/core";
import { Link, useNavigate } from "react-router-dom";
import { Datagrid, UseDataGrid } from "@dashflowx/datagrid";
import { useEffect, useState } from "react";
import { retrieveValue } from "../../../utils";
import JobService from "../../../Api/JobService";
import { LoaderMask } from "../../Loader";
import { ErrorPopUp } from "../../../utils/AlearUtils";
import { Download } from "lucide-react";
import { NoResult } from "../../Nodata";
import { JobsApiRoutes } from "../../../utils/Routes";
import { CandidateCard } from "../Cards/JobCard/CandidateCard";
import useModal from "../../../hooks/useModal";

const ApplicationDataGrid = () => {
  const navigate = useNavigate();
  const token = retrieveValue("accessToken");
  const { openModal, setOpenModal, ModalComp } = useModal();
  const [JobApplied, setJobApplied] = useState([]);

  const { error } = UseDataGrid();
  const { isLoading, DownloadResume } = JobService();

  const handleDownloadResume = async (applicationId, resumeUrl) => {
    resumeUrl
      ? window.open(resumeUrl, "_blank")
      : await DownloadResume(applicationId);
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      size: 300,
      cell: ({ row }) => {
        const { name, profileImageUrl, applicationId, jobApplied } =
          row.original;

        const renderNameContent = () => {
          const content = (
            <div className="flex items-center justify-between">
              <div className="flex justify-between gap-3 w-full">
                <div className="flex items-center gap-2">
                  {profileImageUrl ? (
                    <img
                      src={profileImageUrl}
                      alt={name}
                      className="w-10 h-10 rounded-full border border-gray-300"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                      <h1 className={`text-left text-sm font-semibold mb-0`}>
                        {name.charAt(0).toUpperCase()}
                      </h1>
                    </div>
                  )}
                  <h1
                    className={`text-left text-base font-semibold mb-0 capitalize ml-2`}
                  >
                    {name}
                  </h1>
                </div>
              </div>
            </div>
          );

          // If no jobs applied, return content without navigation
          if (!jobApplied || jobApplied.length === 0) {
            return content;
          }

          // If single job, wrap with direct Link
          if (jobApplied.length === 1) {
            return (
              <Link
                to={`/candidates/${applicationId}`}
                className="p-0 m-0 text-black"
              >
                {content}
              </Link>
            );
          }

          // If multiple jobs, use dropdown
          return (
            <Button
              variant="ghost"
              className="w-fit p-0 m-0 text-black"
              onClick={() => {
                setOpenModal(true);
                setJobApplied(jobApplied);
              }}
            >
              {content}
            </Button>
          );
        };

        return (
          <div className="flex items-center gap-6 min-w-[300px]">
            {renderNameContent()}
          </div>
        );
      },
    },
    {
      accessorKey: "experience",
      header: "Exp",
      size: 100,
      cell: ({ row }) => (
        <div className="text-left">
          {row.getValue("name") ? (
            row.getValue("experience") || "N/A"
          ) : (
            <div className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      disableSort: true,
      cell: ({ row }) => (
        <div className="text-left">
          {row.getValue("name") ? (
            row.getValue("email") || "N/A"
          ) : (
            <div className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Contact",
      disableSort: true,
      cell: ({ row }) => (
        <div className="text-left">
          {row.getValue("name") ? (
            row.getValue("phone") || "N/A"
          ) : (
            <div className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "jobApplied",
      header: "Job Applied",
      size: 300,
      disableSort: true,
      cell: ({ row }: any) => {
        const { jobApplied } = row.original;
        let content;

        if (jobApplied.length === 0) {
          content = "No jobs applied";
        } else if (jobApplied.length === 1) {
          content = (
            <Link to={`/jobs/jobdetails/${jobApplied[0].jobId}`}>
              {jobApplied[0].title}
            </Link>
          );
        } else {
          content = (
            <DropdownMenuComp>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  Applied to {jobApplied.length} jobs
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuLabel>Applied Jobs</DropdownMenuLabel>
                {jobApplied.map((job, index) => (
                  <DropdownMenuItem
                    key={job.jobId}
                    className="cursor-pointer"
                    onClick={() => navigate(`/jobs/jobdetails/${job.jobId}`)}
                  >
                    {job.jobId} - {job.title} (Job {index + 1})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenuComp>
          );
        }
        return <div className="text-left">{content}</div>;
      },
    },
    {
      accessorKey: "interviewCreatedAt",
      header: "Last Contacted",
      size: 250,
      disableSort: true,
      cell: ({ row }: any) => {
        const { interviewCreatedAt } = row.original;
        const lastContactedOn = interviewCreatedAt
          ? new Date(interviewCreatedAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Never";

        return <div className="text-left">{lastContactedOn}</div>;
      },
    },
    {
      accessorKey: "resumeUrl",
      header: "CV",
      size: "auto",
      disableSort: true,
      cell: ({ row }) => {
        const { applicationId, jobApplied, resumeUrl } = row.original;
        let content;

        if (jobApplied.length === 0) {
          content = "No jobs applied";
        } else if (jobApplied.length === 1) {
          content = (
            <Button
              variant="ghost"
              className="cursor-pointer"
              onClick={() =>
                handleDownloadResume(
                  jobApplied[0].applicationId,
                  jobApplied[0].resumeUrl,
                )
              }
            >
              <Download />
            </Button>
          );
        } else {
          content = (
            <DropdownMenuComp>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="cursor-pointer">
                  <Download />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuLabel>Multiple CVs</DropdownMenuLabel>
                {jobApplied.map((job, index) => (
                  <DropdownMenuItem
                    key={job.jobId}
                    className="cursor-pointer"
                    onClick={() =>
                      handleDownloadResume(job.applicationId, job.resumeUrl)
                    }
                  >
                    {job.jobId} - {job.title} (Job {index + 1})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenuComp>
          );
        }
        return <div className="text-left">{content}</div>;
      },
    },
  ];

  useEffect(() => {
    if (error?.message === "Session Expired") {
      localStorage.clear();
      navigate(`/`);
      ErrorPopUp(error.message);
    }
  }, [error]);

  return (
    <div className="pt-4">
      {isLoading && <LoaderMask />}
      <Datagrid
        listColumns={columns}
        CardComponent={(props) => (
          <CandidateCard
            item={props?.item}
            onCardClick={() => {
              setOpenModal(true);
              setJobApplied(props?.item?.jobApplied);
            }}
          />
        )}
        variant="ssr2"
        getApi={`${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.GetAllApplications}?`}
        defaultView="list"
        unableDefaultSort={true}
        showSelectAction={false}
        showChangeButton={true}
        auth={token}
        noDataComp={<NoResult />}
      />
      <ModalComp
        dialogTitle="Multiple Jobs Found"
        dialogContentClassName="bg-white w-[1200px] max-w-screen-lg"
        dialogDescription=""
        dialogContent={
          <>
            <div className="space-y-4">
              {JobApplied.map((job, index) => (
                <div
                  key={job.applicationId}
                  className="cursor-pointer p-4 hover:bg-gray-50 rounded-lg"
                  onClick={() => navigate(`/candidates/${job.applicationId}`)}
                >
                  {job.jobId} - {job.title} (Application {index + 1})
                </div>
              ))}
            </div>
          </>
        }
        dialogFooter={
          <div className="flex gap-3 items-center justify-start w-full mt-6">
            <Button
              variant="outline"
              className="w-fit"
              disabled={isLoading}
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default ApplicationDataGrid;
