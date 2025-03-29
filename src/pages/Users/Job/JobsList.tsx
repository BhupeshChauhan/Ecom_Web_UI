import {
  Button,
  TabsComp,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@dashflowx/core";
import { DatagridProvider } from "@dashflowx/datagrid";
import { cn, retrieveValue } from "../../../utils";
import { useJobFormContext } from "../../../context/JobFormProvider";
import JobsDataGrid from "../../../components/Job/DataGrids/JobsDataGrid";
import { Plus, PlusCircle, UploadCloud } from "lucide-react";
import useModal from "../../../hooks/useModal";
import { useNavigate } from "react-router-dom";

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
  tags: {
    id: string;
    name: string;
  }[];
  createdAt: string;
  createdBy: string;
  shortListed: number;
};

const JobsList = () => {
  const { activeJobTab, handleJobTabChange } = useJobFormContext();
  const { openModal, setOpenModal, ModalComp } = useModal();
  const navigate = useNavigate();
  const companyData = retrieveValue("companyData");

  const tabsArray = [
    {
      content: (
        <>
          {activeJobTab === 1 && (
            <DatagridProvider>
              <JobsDataGrid
                status="active"
                ModalComp={ModalComp}
                setOpenModal={setOpenModal}
              />
            </DatagridProvider>
          )}
        </>
      ),
      id: 1,
      title: "Open",
      path: "/jobs/active",
    },
    {
      content: (
        <>
          {activeJobTab === 2 && (
            <DatagridProvider>
              <JobsDataGrid
                status="closed"
                ModalComp={ModalComp}
                setOpenModal={setOpenModal}
              />
            </DatagridProvider>
          )}
        </>
      ),
      id: 2,
      title: "Closed",
      path: "/jobs/closed",
    },
    {
      content: (
        <>
          {activeJobTab === 3 && (
            <DatagridProvider>
              <JobsDataGrid
                status="draft"
                ModalComp={ModalComp}
                setOpenModal={setOpenModal}
              />
            </DatagridProvider>
          )}
        </>
      ),
      id: 3,
      title: "Drafts",
      path: "/jobs/draft",
    },
  ];
  return (
    <div>
      <div className="flex justify-between mt-3 mx-3 mb-0">
        <h3 className="mb-0">Jobs</h3>
        <div className="flex gap-3">
          {companyData?.name && (
            <Button
              variant="ghost"
              onClick={() => setOpenModal(true)}
              className="bg-primary/10 text-primary text-sm p-2 py-1"
            >
              <UploadCloud className="mr-2 w-4" /> Upload Job
            </Button>
          )}
          <Button
            variant="solid"
            color="primary"
            className="text-sm p-2 py-1"
            onClick={() => navigate("/jobs/create")}
          >
            <Plus className="mr-2 w-4" /> Create Job
          </Button>
        </div>
      </div>
      <TabsComp defaultValue="account" className={cn("w-full")}>
        <TabsList className="flex items-start justify-start">
          {tabsArray.map((tab: any) => (
            <TabsTrigger
              value="account"
              key={tab.id}
              className={cn(
                "inline-block p-4 pl-2 border-b-2 typography-h5 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 pt-2",
                activeJobTab === tab.id
                  ? "text-primary-light font-bold"
                  : "text-gray-500",
              )}
              onClick={() => handleJobTabChange(tab.id)}
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="account" className="w-full bg-slate-100 p-2">
          {tabsArray[activeJobTab - 1]?.content}
        </TabsContent>
      </TabsComp>
    </div>
  );
};

export default JobsList;
