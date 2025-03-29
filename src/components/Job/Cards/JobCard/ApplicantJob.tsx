import { Badge, Button, SeparatorComp } from "@dashflowx/core";
import { Link } from "react-router-dom";
export const ApplicationCard = ({ jobDetails }) => {
  const {
    title,
    type,
    id,
    status,
    experience,
    budget,
    contract,
    shift,
    notice,
    skills,
    createdAt,
    createdBy,
  } = jobDetails;
  return (
    <div className="flex flex-col text-left px-3 py-0 pt-8">
      <div className="flex w-full items-center justify-between">
        <Link to={`/applicant/jobs/${id}`}>
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              {title} {type}
            </h2>
            <p className="mt-3 text-md text-gray-800 dark:text-gray-400 w-fit flex items-center">
              <Badge
                type="p"
                variant="default"
                textContent={status}
                className="mr-4 px-1 py-0 rounded-md"
              />{" "}
              {id}
            </p>
          </div>
        </Link>
      </div>
      <div className="flex items-start justify-start pt-4 text-sm">
        <div className="flex flex-col w-full">
          <div className="flex pt-4 w-full font-light text-lg">
            <div className="w-[30%]">{experience}</div>
            <div className="w-[30%]">{budget}</div>
            <div className="w-[40%]">{status}</div>
          </div>
          <div className="flex pt-4 w-full font-light text-lg">
            <div className="w-[30%]">{contract}</div>
            <div className="w-[30%]">{shift}</div>
            <div className="w-[40%]">{notice}</div>
          </div>
          <div className="flex pt-4 w-full">
            {skills.map((tag) => (
              <Badge
                type="p"
                variant="default"
                textContent={tag.name}
                className="mr-4 px-1 py-0 bg-gray-600 rounded-md w-fit"
                textClassName="text-black"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
