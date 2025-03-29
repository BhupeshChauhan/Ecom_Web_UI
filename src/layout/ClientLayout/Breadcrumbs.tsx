import { retrieveValue } from "../../utils";
import { Button } from "@dashflowx/core";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Breadcrumbs = () => {
  const pathname = window.location.pathname;
  const userData = retrieveValue("userData");
  const navigate = useNavigate();

  if (pathname === "/dashboard") {
    return (
      <p className="text-lg">
        Welcome,{" "}
        <span className="typography-h4 font-bold text-primary">
          {userData?.username}
        </span>
      </p>
    );
  }

  if (pathname === "/jobs") {
    return (
      <span className="typography-h4 font-bold capitalize text-primary">
        Job Openings
      </span>
    );
  }

  if (pathname === "/billing") {
    return (
      <span className="typography-h4 font-bold capitalize text-primary">
        {pathname.split("/")[1]}
      </span>
    );
  }

  if (pathname.includes("/assessment/report")) {
    return (
      <>
        <div className="flex gap-3 items-center">
          <Button
            variant="ghost"
            className="p-0 h-4 rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Link to={`/jobs`}>
            <span className="typography-h4 font-bold capitalize text-slate-500 m-0">
              Jobs
            </span>
          </Link>{" "}
          <span className="text-sm text-slate-500 m-0">{">"}</span>{" "}
          <Link to={`/jobs/jobdetails/${location.pathname.split("/")[3]}`}>
            <span className="typography-h4 font-bold text-slate-500 m-0">
              Job Details
            </span>
          </Link>{" "}
          <span className="text-sm capitalize text-slate-500  m-0">{">"}</span>{" "}
          <span className="typography-h4 font-bold capitalize text-primary  m-0">
            AI Assessment Report
          </span>
        </div>
      </>
    );
  }

  if (pathname.includes("/jobs/jobdetails")) {
    return (
      <>
        <div className="flex gap-3 items-center">
          <Button
            variant="ghost"
            className="p-0 h-4 rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Link to={`/jobs`}>
            <span className="typography-h4 font-bold capitalize text-slate-500 m-0">
              Jobs
            </span>
          </Link>{" "}
          <span className="typography-h4 capitalize text-slate-500  m-0">
            {">"}
          </span>{" "}
          <span className="typography-h4 font-bold capitalize text-primary  m-0">
            Job Details
          </span>
        </div>
      </>
    );
  }

  if (pathname.includes("/users")) {
    return (
      <span className="typography-h5 font-bold capitalize text-primary">
        Users
      </span>
    );
  }

  if (pathname === "/settings") {
    return (
      <span className="typography-h5 font-bold capitalize text-primary">
        User Profile
      </span>
    );
  }

  if (pathname === "/settings/company") {
    return (
      <span className="typography-h5 font-bold capitalize text-primary">
        Company Settings
      </span>
    );
  }

  if (pathname.includes("/jobs/edit")) {
    return (
      <>
        <div className="flex gap-3 items-center">
          <Button
            variant="ghost"
            className="p-0 h-4 rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Link to={`/jobs`}>
            <span className="typography-h4 font-bold capitalize text-slate-500 m-0">
              Jobs
            </span>
          </Link>{" "}
          <span className="text-sm text-slate-500 m-0">{">"}</span>{" "}
          <Link to={`/jobs/jobdetails/${location.pathname.split("/")[3]}`}>
            <span className="typography-h4 font-bold text-slate-500 m-0">
              Job Details
            </span>
          </Link>{" "}
          <span className="text-sm capitalize text-slate-500  m-0">{">"}</span>{" "}
          <span className="typography-h4 font-bold capitalize text-primary  m-0">
            Edit Job Details
          </span>
        </div>
      </>
    );
  }

  if (pathname.includes("/jobs/screeningques")) {
    return (
      <>
        <div className="flex gap-3 items-center">
          <Button
            variant="ghost"
            className="p-0 h-4 rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Link to={`/jobs`}>
            <span className="typography-h4 font-bold capitalize text-slate-500 m-0">
              Jobs
            </span>
          </Link>{" "}
          <span className="text-sm text-slate-500 m-0">{">"}</span>{" "}
          <Link to={`/jobs/jobdetails/${location.pathname.split("/")[3]}`}>
            <span className="typography-h4 font-bold text-slate-500 m-0">
              Job Details
            </span>
          </Link>{" "}
          <span className="text-sm capitalize text-slate-500  m-0">{">"}</span>{" "}
          <span className="typography-h4 font-bold capitalize text-primary  m-0">
            Assessment Questions
          </span>
        </div>
      </>
    );
  }

  if (pathname.includes("/jobs/create")) {
    return (
      <>
        <div className="flex gap-3 items-center">
          <Button
            variant="ghost"
            className="p-0 h-4 rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Link to={`/jobs`}>
            <span className="typography-h4 font-bold capitalize text-slate-500 m-0">
              Jobs
            </span>
          </Link>{" "}
          <span className="text-sm capitalize text-slate-500  m-0">{">"}</span>{" "}
          <span className="typography-h4 font-bold capitalize text-primary  m-0">
            Create Job
          </span>
        </div>
      </>
    );
  }

  if (pathname.includes("/applicant/edit/")) {
    return (
      <>
        <div className="flex gap-3 items-center">
          <Button
            variant="ghost"
            className="p-0 h-4 rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Link to={`/jobs`}>
            <span className="typography-h4 font-bold capitalize text-slate-500 m-0">
              Jobs
            </span>
          </Link>{" "}
          <span className="text-sm text-slate-500 m-0">{">"}</span>{" "}
          <Link to={`/jobs/jobdetails/${location.pathname.split("/")[2]}`}>
            <span className="typography-h4 font-bold text-slate-500 m-0">
              Job Details
            </span>
          </Link>{" "}
          <span className="text-sm capitalize text-slate-500  m-0">{">"}</span>{" "}
          <span className="typography-h4 font-bold capitalize text-primary  m-0">
            Edit Applicant's Details
          </span>
        </div>
      </>
    );
  }

  if (pathname.includes("/jobs/preview")) {
    return (
      <>
        <div className="flex gap-3 items-center">
          <Button
            variant="ghost"
            className="p-0 h-4 rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Link to={`/jobs`}>
            <span className="typography-h4 font-bold capitalize text-slate-500 m-0">
              Jobs
            </span>
          </Link>{" "}
          <span className="text-sm text-slate-500 m-0">{">"}</span>{" "}
          <Link to={`/jobs/jobdetails/${location.pathname.split("/")[3]}`}>
            <span className="typography-h4 font-bold text-slate-500 m-0">
              Job Details
            </span>
          </Link>{" "}
          <span className="text-sm capitalize text-slate-500  m-0">{">"}</span>{" "}
          <span className="typography-h4 font-bold capitalize text-primary  m-0">
            View Job
          </span>
        </div>
      </>
    );
  }

  return null;
};

export default Breadcrumbs;
