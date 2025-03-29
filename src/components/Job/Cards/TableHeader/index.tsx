import { Button } from "@dashflowx/core";
import { LucideSortAsc, LucideSortDesc } from "lucide-react";
import { cn } from "../../../../utils";
import { IoCloseCircle } from "react-icons/io5";

const TableHeader = ({
  title,
  accessorKey,
  sortBy,
  sortOrder,
  setSortBy,
  setSortOrder,
  handleClickSort,
  handleChangeSort,
}) => {
  return (
    <div className="flex items-center justify-between">
      <p>{title}</p>
      <div className="relative">
        <Button
          variant="ghost"
          onClick={() => {
            handleClickSort(
              accessorKey,
              sortOrder === "asc" && sortBy === accessorKey ? "desc" : "asc",
            );
          }}
        >
          {sortOrder === "asc" ? (
            <LucideSortDesc
              className={cn(
                "ml-2 h-4 w-4",
                sortBy !== "" && sortBy === accessorKey
                  ? "text-primary"
                  : "text-gray-500",
              )}
            />
          ) : (
            <LucideSortAsc
              className={cn(
                "ml-2 h-4 w-4",
                sortBy !== "" && sortBy === accessorKey
                  ? "text-primary"
                  : "text-gray-500",
              )}
            />
          )}
        </Button>
        {sortBy !== "" && sortBy === accessorKey && (
          <button
            className="rounded-full absolute -top-0 -right-0 text-red-500"
            onClick={() => {
              setSortBy("");
              setSortOrder("");
              handleChangeSort(
                "${import.meta.env.VITE_API_JOB_BASE_URI}/jobs?status=active",
                "",
                "",
              );
            }}
          >
            <IoCloseCircle className=" h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TableHeader;
