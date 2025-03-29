import { DfxPageHead, DfxTabsLayout } from "@dashflowx/ui";
import { useState } from "react";
import { JobsData } from "../../../Data//constData";
import { ApplicationCard } from "../../../components/Job/Cards/JobCard/ApplicantJob";
import { CardGrid } from "@dashflowx/datagrid";

export type Jobs = {
  id: string;
  title: string;
  type: "Remote";
  experience: string;
  contract: string;
  budget: string;
  status: string;
  location: string;
  description: string;
  shift: string;
  notice: string;
  skills: {
    id: string;
    name: string;
  }[];
  createdAt: string;
  createdBy: string;
  shortListed: number;
};

export const columns = [
  {
    accessorKey: "title",
    header: "title",
    cell: ({ row }) => {
      return <ApplicationCard jobDetails={row.original} />;
    },
  },
];

const ApplicantJob = () => {
  const [sorting, setSorting] = useState<any>([]);
  const [columnFilters, setColumnFilters] = useState<any>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <DfxPageHead
          title="Hye, Bhupesh Chauhan"
          description="Welcome back! Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          variant="basic"
          actions={<></>}
        />
        <DfxTabsLayout
          defaultActive={1}
          className="w-full"
          tabsClassName="w-full overflow-x-auto"
          tabsArray={[
            {
              content: (
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-3 sm:p-4 md:p-6">
                    <CardGrid
                      sorting={sorting}
                      setSorting={setSorting}
                      columnFilters={columnFilters}
                      setColumnFilters={setColumnFilters}
                      columnVisibility={columnVisibility}
                      setColumnVisibility={setColumnVisibility}
                      rowSelection={rowSelection}
                      setRowSelection={setRowSelection}
                      columns={columns}
                      data={JobsData}
                      searchColName="title"
                      cardCompClassName="w-full"
                      className="grid gap-4"
                    />
                  </div>
                </div>
              ),
              id: 1,
              title: "Active Jobs",
            },
            {
              content: (
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-3 sm:p-4 md:p-6">
                    <CardGrid
                      sorting={sorting}
                      setSorting={setSorting}
                      columnFilters={columnFilters}
                      setColumnFilters={setColumnFilters}
                      columnVisibility={columnVisibility}
                      setColumnVisibility={setColumnVisibility}
                      rowSelection={rowSelection}
                      setRowSelection={setRowSelection}
                      columns={columns}
                      data={JobsData}
                      searchColName="title"
                      cardCompClassName="w-full"
                      className="grid gap-4"
                    />
                  </div>
                </div>
              ),
              id: 2,
              title: "Closed Jobs",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ApplicantJob;
