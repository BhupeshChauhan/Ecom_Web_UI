import {
  AlertDialog,
  Badge,
  Button,
  DropdownMenuComp,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  SeparatorComp,
  Tooltip,
} from "@dashflowx/core";
import { Link, useNavigate } from "react-router-dom";
import { UseDataGrid } from "@dashflowx/datagrid";
import JobService from "../../../../Api/JobService";
import { FaLocationArrow } from "react-icons/fa6";
import Timeline from "../../Timeline";
import { Dot } from "lucide-react";
import { BsThreeDots } from "react-icons/bs";
import RelativeTime from "../../../../utils/RelativeTime";
import MessageDialog from "../../../../utils/MessageDialog";

export const ActiveJobsCard = ({ item }) => {
  const navigate = useNavigate();
  const { isLoading, CloseJobApi } = JobService();
  const {
    title,
    type,
    id,
    location,
    experience,
    jobDetails,
    createdAt,
    createdBy,
    show_on_jobboard,
  } = item;

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
        <div className="mt-6 w-fit">
          <Timeline jobDetails={item} />
        </div>
      </div>
      <div className="flex items-start justify-start text-sm mt-2">
        <div className="flex items-center justify-between w-full">
          <Link to={`/jobs/screeningques/${id}`}>
            <Button
              variant="ghost"
              color="primary"
              className="w-fit bg-primary/15 text-primary"
            >
              <img src="/Questions.svg" className="mr-2" />
              Questions
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            {show_on_jobboard === "public" ? (
              <div className="bg-green-100 text-green-800 font-semibold py-1 px-3 rounded-full">
                Public
              </div>
            ) : show_on_jobboard === "private" ? (
              <div className="bg-purple-100 text-purple-600 font-semibold py-1 px-3 rounded-full">
                Private
              </div>
            ) : null}
            <h2 className="typography-caption sm:truncate sm:tracking-tight text-sm">
              Created <RelativeTime timestamp={createdAt} /> <br />
              by {createdBy}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
