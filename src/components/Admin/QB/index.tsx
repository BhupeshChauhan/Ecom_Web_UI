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
import QbDataGrid from "../../Job/DataGrids/QbDataGrid";
import QBQuestionForm from "../../Form/QBQuestionForm";

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

const QuestionBank = () => {
  const { activeJobTab, handleJobTabChange } = useJobFormContext();
  const { openModal, setOpenModal, ModalComp } = useModal();
  const navigate = useNavigate();
  const companyData = retrieveValue("companyData");

  return (
    <div>
      <div className="flex justify-between mt-3 mx-3 mb-0">
        <h3 className="mb-0">Question Bank</h3>
        <div className="flex gap-3">
          <Button
            variant="solid"
            color="primary"
            className="text-sm p-2 py-1"
            onClick={() => setOpenModal(true)}
          >
            <Plus className="mr-2 w-4" /> Create Category
          </Button>
        </div>
      </div>
      <DatagridProvider>
        <QbDataGrid
          status="active"
          ModalComp={ModalComp}
          setOpenModal={setOpenModal}
        />
      </DatagridProvider>
    </div>
  );
};

export default QuestionBank;
