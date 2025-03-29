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
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { ActiveJobsCard } from "../Cards/JobCard/ActiveJobsCard";
import { Datagrid, UseDataGrid } from "@dashflowx/datagrid";
import { retrieveValue } from "../../../utils";
import useUpload from "../../../hooks/useUpload";
import JobService from "../../../Api/JobService";
import { useJobFormContext } from "../../../context/JobFormProvider";
import { LoaderMask } from "../../Loader";
import { useEffect, useState } from "react";
import { ErrorPopUp } from "../../../utils/AlearUtils";
import { ClosedJobsCard } from "../Cards/JobCard/ClosedJobsCard";
import { DraftJobsCard } from "../Cards/JobCard/DraftJobsCard";
import NoData from "../../Nodata";
import RelativeTime from "../../../utils/RelativeTime";
import MessageDialog from "../../../utils/MessageDialog";

const JobsDataGrid = ({ status, ModalComp, setOpenModal }) => {
  const navigate = useNavigate();
  const token = retrieveValue("accessToken");
  const { handleReload, error } = UseDataGrid();
  const { selectedFiles, setSelectedFiles, setError, UploadComponent } =
    useUpload();
  const {
    FormData,
    Jdtype,
    JdData,
    JdDataAI,
    LocationType,
    handleJobTabChange,
  } = useJobFormContext();
  const {
    isLoading,
    DownloadCSV,
    CloseJobApi,
    UploadJobApi,
    OpenJobApi,
    PublishJobApi,
  } = JobService(FormData, LocationType, JdData, JdDataAI, Jdtype);
  const [firstRender, setFirstRender] = useState(true);

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }: any) => (
        <div className="text-left">{row.getValue("id")}</div>
      ),
      size: "10%",
    },
    {
      accessorKey: "title",
      header: "Title",
      size: "20%",
      cell: ({ row }: any) => {
        const { id, title, jobDetails, queue } = row.original;
        return (
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Link to={`/jobs/jobdetails/${id}`}>
                <h1 className="text-left text-sm font-semibold m-0">
                  {title}{" "}
                  <span className="text-xs text-gray-500 font-normal">
                    - {id}
                  </span>
                </h1>
              </Link>
              <MessageDialog
                actionButton={
                  <p className="text-left text-xs line-clamp-2 max-w-[400px]">
                    {jobDetails}
                  </p>
                }
                title="Short Description"
                description={
                  <p className="text-left text-xs max-w-[400px]">
                    {jobDetails}
                  </p>
                }
                buttonClassName="border-0 p-0 font-light text-black text-sm"
              />
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "experience",
      header: "Exp",
      size: "10%",
      cell: ({ row }: any) => (
        <div className="text-left">
          {row.getValue("experience") > 1
            ? `${row.getValue("experience")}Yrs`
            : `${row.getValue("experience")}Yr`}
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      size: "20%",
      cell: ({ row }: any) => (
        <div className="text-left">{row.getValue("location")}</div>
      ),
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
      size: "10%",
      cell: ({ row }: any) => (
        <div className="text-left">{row.getValue("createdBy")}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      size: "10%",
      cell: ({ row }: any) => (
        <div className="text-left">
          <RelativeTime timestamp={row.getValue("createdAt")} />
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "",
      size: "10%",
      disableSort: true,
      cell: ({ row }: any) => {
        const { id } = row.original;
        return (
          <div className=" flex justify-end">
            <Link to={`/jobs/screeningques/${id}`} className="mr-2">
              <Button
                variant="ghost"
                color="primary"
                className="w-fit bg-primary/15  text-primary"
              >
                <img src="/Questions.svg" className="w-4" />
              </Button>
            </Link>
            <div>
              {status === "active" && (
                <DropdownMenuComp>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 bg-gray-100 text-gray-700"
                    >
                      <span className="sr-only">Open menu</span>
                      <BsThreeDots className="h-4 w-4 rotate-90" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => navigate(`/jobs/jobdetails/${id}`)}
                    >
                      View Details
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>Clone this Job</DropdownMenuItem> */}
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => navigate(`/jobs/screeningques/${id}`)}
                    >
                      View / Edit Screening Questions
                    </DropdownMenuItem>
                    <AlertDialog
                      variant="basic"
                      actionButton=" Close this Job"
                      title=" Close this Job"
                      description="Are sure you want to Close this Job?"
                      onSubmit={async () => {
                        await CloseJobApi(id, handleReload);
                      }}
                      buttonClassName="border-0 p-2 font-light text-black text-sm"
                    />
                  </DropdownMenuContent>
                </DropdownMenuComp>
              )}
              {status === "closed" && (
                <DropdownMenuComp>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 bg-gray-100 text-gray-700"
                    >
                      <span className="sr-only">Open menu</span>
                      <BsThreeDots className="h-4 w-4 rotate-90" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <AlertDialog
                      variant="basic"
                      actionButton="Re-Open this Job"
                      title="Re-Open this Job"
                      description="Are sure you want to Re-Open this Job?"
                      onSubmit={async () => {
                        await OpenJobApi(id, handleReload);
                        handleJobTabChange(1);
                      }}
                      buttonClassName="border-0 p-2 font-light text-black text-sm"
                    />
                  </DropdownMenuContent>
                </DropdownMenuComp>
              )}
              {status === "draft" && (
                <DropdownMenuComp>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 bg-gray-100 text-gray-700"
                    >
                      <span className="sr-only">Open menu</span>
                      <BsThreeDots className="h-4 w-4 rotate-90" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <AlertDialog
                      variant="basic"
                      actionButton="Publish this Job"
                      title="Publish this Job"
                      description="Are sure you want to Publish this Job?"
                      onSubmit={async () => {
                        await PublishJobApi(id, handleReload);
                      }}
                      buttonClassName="border-0 p-2 font-light text-black text-sm"
                    />
                    <AlertDialog
                      variant="basic"
                      actionButton="Cancel this Job"
                      title="Cancel this Job"
                      description="Are sure you want to Cancel this Job?"
                      onSubmit={async () => {
                        await CloseJobApi(id, handleReload);
                      }}
                      buttonClassName="border-0 p-2 font-light text-black text-sm"
                    />
                  </DropdownMenuContent>
                </DropdownMenuComp>
              )}
            </div>
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
    if (firstRender) {
      setFirstRender(false);
    }
    if (!firstRender) {
      console.log("here");
      handleReload(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/jobs/list-jobs?status=${status}`,
        token,
      );
    }
  }, [status]);

  return (
    <div>
      {isLoading && <LoaderMask />}
      <Datagrid
        listColumns={columns}
        CardComponent={
          status === "active"
            ? ActiveJobsCard
            : status === "closed"
              ? ClosedJobsCard
              : status === "draft"
                ? DraftJobsCard
                : null
        }
        variant="ssr2"
        getApi={`${import.meta.env.VITE_API_JOB_BASE_URI}/jobs/list-jobs?status=${status}`}
        defaultView="grid"
        unableDefaultSort={true}
        showSelectAction={false}
        showChangeButton={true}
        auth={token}
        noDataComp={<NoData />}
      />
      <ModalComp
        dialogTitle="Upload Jobs"
        dialogContentClassName="bg-white w-[1200px] max-w-screen-lg"
        dialogDescription=""
        dialogContent={
          <>
            <UploadComponent
              multiple={false}
              acceptedFileExtensions={["csv"]}
            />
          </>
        }
        dialogFooter={
          <div className="flex gap-3 items-center justify-start w-full mt-6">
            <Button
              variant="outline"
              className="w-fit"
              disabled={isLoading}
              onClick={() => DownloadCSV()}
            >
              Download Template
            </Button>
            {selectedFiles.length > 0 && (
              <div className="flex items-center gap-2">
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
                  onClick={() =>
                    UploadJobApi(
                      selectedFiles,
                      setSelectedFiles,
                      setError,
                      handleReload,
                      setOpenModal,
                    )
                  }
                >
                  Upload
                </Button>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
};

export default JobsDataGrid;
