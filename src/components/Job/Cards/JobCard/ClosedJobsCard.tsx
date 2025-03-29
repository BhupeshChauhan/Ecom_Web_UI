import {
  AlertDialog,
  Button,
  DropdownMenuComp,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@dashflowx/core";
import { Link } from "react-router-dom";
import JobService from "../../../../Api/JobService";
import { UseDataGrid } from "@dashflowx/datagrid";
import { FaLocationArrow } from "react-icons/fa6";
import { Dot } from "lucide-react";
import { BsThreeDots } from "react-icons/bs";
import { useJobFormContext } from "../../../../context/JobFormProvider";
import RelativeTime from "../../../../utils/RelativeTime";
import MessageDialog from "../../../../utils/MessageDialog";

export const ClosedJobsCard = ({ item }) => {
  const { title, type, id, jobDetails, experience, location, updatedAt } = item;
  const { handleJobTabChange } = useJobFormContext();
  const { isLoading, PublishJobApi, CloseJobApi, OpenJobApi } = JobService();
  const { handleReload } = UseDataGrid();
  return (
    <div className="flex flex-col text-left pt-3 w-full gap-1 bg-white p-6 rounded-lg justify-between h-full">
      <div className="flex w-full">
        <div className="flex justify-between w-full">
          <div className="flex flex-col w-[80%]">
            <Link
              to={`/jobs/jobdetails/${id}`}
              className="flex flex-col w-full"
            >
              <h2 className="typography-h3 sm:tracking-tight mb-0">{title}</h2>
              <div className="flex items-center">
                <FaLocationArrow className="h-4 w-4 text-gray-500 mr-1" />
                <span className="typography-caption m-0">{location}</span>
                <Dot className="w-4 h-4" />
                <span className="typography-caption m-0">
                  {experience} Years of Experience
                </span>
              </div>
            </Link>
          </div>
          <div className="flex justify-end w-[20%]">
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
          </div>
        </div>
      </div>
      <div>
        <MessageDialog
          actionButton={
            <p className="text-left text-xs line-clamp-2 max-w-[400px]">
              {jobDetails}
            </p>
          }
          title="Short Description"
          description={
            <p className="text-left text-xs max-w-[400px]">{jobDetails}</p>
          }
          buttonClassName="border-0 p-0 font-light text-black text-sm"
        />
      </div>
      <div className="flex items-start justify-start text-sm mt-2">
        <div className="flex gap-3 items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <AlertDialog
              variant="basic"
              actionButton="Re-Open Job"
              title="Re-Open Job"
              description="Are sure you want to Re-Open this Job?"
              onSubmit={async () => {
                await OpenJobApi(id, handleReload);
                handleJobTabChange(1);
              }}
              buttonClassName="border-0 p-2 font-light text-primary text-sm bg-primary/20"
            />
          </div>
          <h2 className="typography-caption sm:truncate sm:tracking-tight text-sm">
            {id} Closed on <RelativeTime timestamp={updatedAt} />
          </h2>
        </div>
      </div>
    </div>
  );
};
