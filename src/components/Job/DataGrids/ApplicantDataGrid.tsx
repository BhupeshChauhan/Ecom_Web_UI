import {
  AlertDialog,
  Button,
  DropdownMenuComp,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Tooltip,
} from "@dashflowx/core";
import { useLocation, useNavigate } from "react-router-dom";
import { Datagrid, UseDataGrid } from "@dashflowx/datagrid";
import { AppliedApplicantCard } from "../Cards/ApplicationCard/AppliedApplicantCard";
import { useEffect, useState } from "react";
import { retrieveValue, updateObjectInArray } from "../../../utils";
import useModal from "../../../hooks/useModal";
import useUpload from "../../../hooks/useUpload";
import JobService from "../../../Api/JobService";
import { LoaderMask } from "../../Loader";
import { ErrorPopUp, InfoPopUp } from "../../../utils/AlearUtils";
import { Download, Info, UploadCloud } from "lucide-react";
import { IPApplicantCard } from "../Cards/ApplicationCard/IPApplicantCard";
import { IDApplicantCard } from "../Cards/ApplicationCard/IDApplicantCard";
import { ShortListedApplicantCard } from "../Cards/ApplicationCard/ShortListedApplicantCard";
import { RejectedApplicantCard } from "../Cards/ApplicationCard/RejectedApplicantCard";
import ApplicantDropdown from "../ApplicantDropdown";
import { useJobContext } from "../../../context/JobProvider";
import JobMatchStrength from "../../../utils/JobMatchStrength";
import { NoResult } from "../../Nodata";
import { BsThreeDots } from "react-icons/bs";

const ApplicantDataGrid = ({ GetJobDetails, status }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = retrieveValue("accessToken");
  const limit = retrieveValue("limit");
  const userData = retrieveValue("userData");
  const { handleReload, error, handleChangeListData, listData, rowSelection } =
    UseDataGrid();

  const [ResumeMatch, setResumeMatch] = useState("");

  const { messages, setMessages } = useJobContext();
  const { openModal, setOpenModal, ModalComp } = useModal();
  const { setOpenModal: setOpenModal1, ModalComp: ModalComp1 } = useModal();
  const { selectedFiles, setSelectedFiles, setError, UploadComponent } =
    useUpload();
  const {
    isLoading,
    UploadResume,
    SendApplicantBulkInvite,
    SendApplicantInvite,
    CancelInviteStatus,
    UpdateApplicationStatus,
    DownloadAiAssement,
    DownloadResume,
  } = JobService();

  const handleAiReportDownload = (interviewId, reportGenerated) => {
    if (reportGenerated) {
      DownloadAiAssement(interviewId);
    } else {
      InfoPopUp("Please Wait... AI Report is being generated.");
    }
  };
  const handleAiAssessment = (reportGenerated, interviewId, applicationId) => {
    if (reportGenerated) {
      navigate(
        `/jobs/jobdetails/${location.pathname.split("/")[3]}/assessment/report/${interviewId}/${applicationId}?status=${status}`,
      );
    } else {
      InfoPopUp("Please Wait... AI Report is being generated.");
    }
  };

  const handleDownloadResume = async (applicationId, resumeUrl?) => {
    resumeUrl
      ? window.open(resumeUrl, "_blank")
      : await DownloadResume(applicationId);
  };

  const HandleReloadFunc = () => {
    handleReload(
      status === "interviewdone"
        ? `${import.meta.env.VITE_API_JOB_BASE_URI}/jobs/applications/${location.pathname.split("/")[3]}?status=interview-done`
        : `${import.meta.env.VITE_API_JOB_BASE_URI}/jobs/applications/${location.pathname.split("/")[3]}?status=${status}`,
      token,
    );
  };

  const columnsCard = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }: any) => {
        return (
          <>
            {status === "applied" && (
              <AppliedApplicantCard jobDetails={row.original} />
            )}
            {status === "interview-pending" && (
              <IPApplicantCard jobDetails={row.original} />
            )}
            {status === "interviewdone" && (
              <IDApplicantCard jobDetails={row.original} />
            )}
            {status === "shortlisted" && (
              <ShortListedApplicantCard jobDetails={row.original} />
            )}
            {status === "rejected" && (
              <RejectedApplicantCard jobDetails={row.original} />
            )}
          </>
        );
      },
    },
  ];

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      size: "auto",
      cell: ({ row }: any) => {
        const { name, designation, profileImageUrl, applicationId } =
          row.original;
        const [ImageFallback, setImageFallback] = useState(profileImageUrl);
        return (
          <ApplicantDropdown
            ImageFallback={ImageFallback}
            profileImageUrl={profileImageUrl}
            name={name}
            setImageFallback={setImageFallback}
            designation={designation}
            applicationId={applicationId}
          />
        );
      },
    },
    {
      accessorKey: "match",
      header: "Resume Match",
      size: 250,
      cell: ({ row }: any) => {
        return (
          <div className="text-left flex gap-3">
            {row.getValue("name") ? (
              <>
                <JobMatchStrength testResult={row.getValue("match")} />
                <Button
                  variant="ghost"
                  onClick={() => {
                    setResumeMatch(row?.original?.resumeEvaluationSummary);
                    setOpenModal1(true);
                  }}
                >
                  <Info className="h-4 w-4 text-blue-500" />
                </Button>
              </>
            ) : (
              <div className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "experience",
      header: "Exp",
      size: 100,
      cell: ({ row }: any) => (
        <div className="text-left">
          {row.getValue("name") ? (
            row.getValue("experience")
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
      cell: ({ row }: any) => (
        <div className="text-left">
          {row.getValue("name") ? (
            row.getValue("email")
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
      cell: ({ row }: any) => (
        <div className="text-left">
          {row.getValue("name") ? (
            row.getValue("phone")
          ) : (
            <div className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "resumeUrl",
      header: "",
      size: 300,
      disableSort: true,
      cell: ({ row }: any) => {
        const { resumeUrl, applicationId } = row.original;
        return (
          <div className="text-right">
            {status === "applied" && (
              <>
                <div className="flex gap-3 h-fit justify-center items-center">
                  {row.getValue("resumeUrl") ? (
                    <Button
                      variant="ghost"
                      className="cursor-pointer"
                      onClick={() =>
                        handleDownloadResume(applicationId, resumeUrl)
                      }
                    >
                      <Download />
                    </Button>
                  ) : (
                    <div className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
                  )}
                  {/* {limit > 0 ? ( */}
                  {true ? (
                    <AlertDialog
                      variant="basic"
                      actionButton={
                        <Button
                          variant="ghost"
                          className="bg-primary/20 text-sm"
                        >
                          Invite
                        </Button>
                      }
                      title="Send Invite"
                      description="Are you sure you want to send an invite to this applicant?"
                      onSubmit={async () => {
                        await SendApplicantInvite({
                          jobId: location.pathname.split("/")[3],
                          applicationId: applicationId,
                        });
                        HandleReloadFunc();
                        GetJobDetails();
                      }}
                      buttonClassName="border-0 p-2 font-light text-black text-sm"
                    />
                  ) : (
                    <Tooltip
                      tooltipTrigger={
                        <Button
                          variant="solid"
                          className="cursor-pointer h-fit text-sm text-gray-500 bg-gray-200"
                          disabled
                        >
                          Invite
                        </Button>
                      }
                      tooltipContent="Limit Reached"
                      side="top"
                      className="bg-gray-200 text-gray-500"
                    />
                  )}
                  <Button
                    variant="solid"
                    color="primary"
                    className="cursor-pointer h-fit text-sm"
                    onClick={() =>
                      navigate(
                        `/jobs/${location.pathname.split("/")[3]}/applicant/edit/${applicationId}`,
                      )
                    }
                  >
                    Edit
                  </Button>
                </div>
              </>
            )}
            {status === "interview-pending" && (
              <>
                {row.getValue("resumeUrl") ? (
                  <Button
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() =>
                      handleDownloadResume(applicationId, resumeUrl)
                    }
                  >
                    <Download />
                  </Button>
                ) : (
                  <div className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
                )}
                <DropdownMenuComp>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <BsThreeDots className="h-4 w-4 rotate-90" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/jobs/${applicationId}/applicant/edit/${location.pathname.split("/")[3]}`,
                        )
                      }
                    >
                      Edit
                    </DropdownMenuItem>
                    <AlertDialog
                      variant="basic"
                      actionButton={"Resend Invite"}
                      title="Resend Invite"
                      description="Are sure you want to Resend Invite to this applicant?"
                      onSubmit={async () => {
                        await SendApplicantInvite({
                          jobId: location.pathname.split("/")[3],
                          applicationId: applicationId,
                        });
                        HandleReloadFunc();
                        GetJobDetails();
                      }}
                      buttonClassName="border-0 p-2 font-light text-black text-sm"
                    />
                    <br />
                    <AlertDialog
                      variant="basic"
                      actionButton="Revoke Invite"
                      title="Revoke Invite"
                      description="Are sure you want to Revoke Invite to this applicant?"
                      onSubmit={async () => {
                        await CancelInviteStatus({
                          applicationId: applicationId,
                        });
                        HandleReloadFunc();
                      }}
                      buttonClassName="border-0 p-2 font-light text-black text-sm"
                    />
                  </DropdownMenuContent>
                </DropdownMenuComp>
              </>
            )}
          </div>
        );
      },
    },
  ];

  const columns2 = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }: any) => {
        const { name, designation, profileImageUrl, applicationId } =
          row.original;
        const [ImageFallback, setImageFallback] = useState(profileImageUrl);
        return (
          <ApplicantDropdown
            ImageFallback={ImageFallback}
            profileImageUrl={profileImageUrl}
            name={name}
            setImageFallback={setImageFallback}
            designation={designation}
            applicationId={applicationId}
          />
        );
      },
    },
    {
      accessorKey: "match",
      header: "Resume Match",
      size: 300,
      cell: ({ row }: any) => {
        return (
          <div className="text-left flex gap-3">
            {row.getValue("name") ? (
              <>
                <JobMatchStrength testResult={row.getValue("match")} />
                <Button
                  variant="ghost"
                  onClick={() => {
                    setResumeMatch(row?.original?.resumeEvaluationSummary);
                    setOpenModal1(true);
                  }}
                >
                  <Info className="h-4 w-4 text-blue-500" />
                </Button>
              </>
            ) : (
              <div className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "aiAssessmentScore",
      header: "AI Score",
      cell: ({ row }: any) => (
        <div className="text-left">{row.getValue("aiAssessmentScore")}</div>
      ),
    },
    {
      accessorKey: "experience",
      header: "Exp",
      cell: ({ row }: any) => (
        <div className="text-left">
          {row.getValue("name") ? (
            row.getValue("experience")
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
      cell: ({ row }: any) => (
        <div className="text-left">
          {row.getValue("name") ? (
            row.getValue("email")
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
      cell: ({ row }: any) => (
        <div className="text-left">
          {row.getValue("name") ? (
            row.getValue("phone")
          ) : (
            <div className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "resumeUrl",
      header: "",
      size: 30,
      disableSort: true,
      cell: ({ row }: any) => {
        const { resumeUrl, interviewId, applicationId, reportGenerated } =
          row.original;
        return (
          <div className="text-right flex justify-center items-center">
            {row.getValue("resumeUrl") ? (
              <Button
                variant="ghost"
                className="cursor-pointer"
                onClick={() => handleDownloadResume(applicationId, resumeUrl)}
              >
                <Download />
              </Button>
            ) : (
              <div className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
            )}
            {status === "interviewdone" && (
              <DropdownMenuComp>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <BsThreeDots className="h-4 w-4 rotate-90" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() =>
                      handleAiAssessment(
                        reportGenerated,
                        interviewId,
                        applicationId,
                      )
                    }
                  >
                    View Report
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() =>
                      handleAiReportDownload(interviewId, reportGenerated)
                    }
                  >
                    Download Report
                  </DropdownMenuItem>
                  <AlertDialog
                    variant="basic"
                    actionButton="Shortlist"
                    title="Shortlist"
                    description="Are sure you want to Shortlist?"
                    onSubmit={async () => {
                      await UpdateApplicationStatus({
                        applicationId: applicationId,
                        status: "shortlisted",
                      });
                      HandleReloadFunc();
                      await GetJobDetails();
                    }}
                    buttonClassName="border-0 p-2 font-light text-black text-sm"
                  />
                  <br />
                  <AlertDialog
                    variant="basic"
                    actionButton="Reject"
                    title="Reject"
                    description="Are sure you want to Reject?"
                    onSubmit={async () => {
                      await UpdateApplicationStatus({
                        applicationId: applicationId,
                        status: "rejected",
                      });
                      await HandleReloadFunc();
                      await GetJobDetails();
                    }}
                    buttonClassName="border-0 p-2 font-light text-black text-sm"
                  />
                </DropdownMenuContent>
              </DropdownMenuComp>
            )}
            {status === "shortlisted" && (
              <DropdownMenuComp>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <BsThreeDots className="h-4 w-4 rotate-90" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>

                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() =>
                      handleAiAssessment(
                        reportGenerated,
                        interviewId,
                        applicationId,
                      )
                    }
                  >
                    View Report
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() =>
                      handleAiReportDownload(interviewId, reportGenerated)
                    }
                  >
                    Download Report
                  </DropdownMenuItem>
                  <AlertDialog
                    variant="basic"
                    actionButton="Reject"
                    title="Reject"
                    description="Are sure you want to Reject?"
                    onSubmit={async () => {
                      await UpdateApplicationStatus({
                        applicationId: applicationId,
                        status: "rejected",
                      });
                      await HandleReloadFunc();
                      await GetJobDetails();
                    }}
                    buttonClassName="border-0 p-2 font-light text-black text-sm"
                  />
                </DropdownMenuContent>
              </DropdownMenuComp>
            )}
            {status === "rejected" && (
              <DropdownMenuComp>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <BsThreeDots className="h-4 w-4 rotate-90" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>

                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() =>
                      handleAiAssessment(
                        reportGenerated,
                        interviewId,
                        applicationId,
                      )
                    }
                  >
                    View Report
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() =>
                      handleAiReportDownload(interviewId, reportGenerated)
                    }
                  >
                    Download Report
                  </DropdownMenuItem>
                  <AlertDialog
                    variant="basic"
                    actionButton="Shortlist"
                    title="Shortlist"
                    description="Are sure you want to Shortlist?"
                    onSubmit={async () => {
                      await UpdateApplicationStatus({
                        applicationId: applicationId,
                        status: "shortlisted",
                      });
                      HandleReloadFunc();
                      await GetJobDetails();
                    }}
                    buttonClassName="border-0 p-2 font-light text-black text-sm"
                  />
                </DropdownMenuContent>
              </DropdownMenuComp>
            )}
          </div>
        );
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

  useEffect(() => {
    HandleReloadFunc();
  }, [status]);

  useEffect(() => {
    if (messages) {
      if (messages.message === "Applicant Details Uploaded") {
        HandleReloadFunc();
        // const updatedObject = updateObjectInArray(
        //   messages?.details?.application,
        //   listData,
        // );
        // handleChangeListData(updatedObject);
        setMessages(null);
      } else if (messages?.message.includes("An applicant already exists")) {
        InfoPopUp(messages.message);
        HandleReloadFunc();
      }
    }
  }, [messages]);

  return (
    <div className="pt-4">
      {isLoading && <LoaderMask />}
      <Datagrid
        listColumns={
          status !== "applied" && status !== "interview-pending"
            ? columns2
            : columns
        }
        CardColumn={columnsCard}
        variant="ssr"
        getApi={
          status === "interviewdone"
            ? `${import.meta.env.VITE_API_JOB_BASE_URI}/jobs/applications/${location.pathname.split("/")[3]}?status=interview-done`
            : `${import.meta.env.VITE_API_JOB_BASE_URI}/jobs/applications/${location.pathname.split("/")[3]}?status=${status}`
        }
        actions={
          <>
            {Object.keys(rowSelection)?.length > 0 && (
              <AlertDialog
                variant="basic"
                actionButton={
                  <Button variant="ghost" className="p-0">
                    Send Bulk Invite
                  </Button>
                }
                title="Send Invite"
                description="Are sure you want to Send Invite to this applicant?"
                onSubmit={async () => {
                  await SendApplicantBulkInvite({
                    jobId: location.pathname.split("/")[3],
                    applicantId: Object.keys(rowSelection),
                  });
                  HandleReloadFunc();
                  GetJobDetails();
                }}
                buttonClassName="border-0 p-2 font-light text-black text-sm"
              />
            )}
            {status === "applied" && (
              <Button
                variant="ghost"
                onClick={() => setOpenModal(true)}
                className="p-0 px-1"
              >
                <UploadCloud className="mr-2" /> Upload Resume(s)
              </Button>
            )}{" "}
          </>
        }
        defaultView="list"
        unableDefaultSort={true}
        showSelectAction={status === "applied" ? true : false}
        showChangeButton={true}
        auth={token}
        noDataComp={<NoResult />}
      />
      <ModalComp
        dialogTitle="Upload Jobs"
        dialogContentClassName="bg-white w-[1200px] max-w-screen-lg"
        dialogDescription=""
        dialogContent={
          <>
            <UploadComponent
              multiple={true}
              acceptedFileExtensions={["pdf", "docx", "doc", "txt"]}
            />
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
            <Button
              variant="solid"
              color="primary"
              className="w-fit"
              disabled={isLoading}
              onClick={async () => {
                await UploadResume(
                  selectedFiles,
                  setSelectedFiles,
                  setError,
                  setOpenModal,
                );
                HandleReloadFunc();
              }}
            >
              Upload
            </Button>
          </div>
        }
      />
      <ModalComp1
        dialogTitle="Resume Match"
        dialogContentClassName="bg-white w-[1200px] max-w-screen-lg text-md"
        dialogDescriptionClassName="text-md"
        dialogDescription={ResumeMatch}
        dialogContent={<>{/* <p>{ResumeMatch}</p> */}</>}
        dialogFooter={<></>}
      />
    </div>
  );
};

export default ApplicantDataGrid;
