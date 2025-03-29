import { DatagridProvider } from "@dashflowx/datagrid";
import QuestionsListDataGrid from "../../../components/Job/DataGrids/QuestionsListDataGrid";
import { JobProvider } from "../../../context/JobProvider";
import QuestionCard from "../../../components/Job/Cards/QuetionsCards";
import { Link } from "react-router-dom";
import { Button } from "@dashflowx/core";
import useModal from "../../../hooks/useModal";
import { BookOpen } from "lucide-react";
import QbSingleDataGrid from "../../Job/DataGrids/QbSingleDataGrid";
const QBSingle = () => {
  const { setOpenModal, ModalComp } = useModal();

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between pt-3 px-3 shadow-lg mb-2">
        <div className="flex gap-3 items-center justify-center p-3">
          <Link to="/settings/users">
            <h4 className="mb-0 font-normal">Admin</h4>
          </Link>
          <>{">"}</>
          <Link to={`/settings/question-bank`}>
            <h4 className="mb-0 font-normal">Category</h4>
          </Link>
          <>{">"}</>
          <h3 className="mb-0">Question Bank</h3>
        </div>
        <div className="flex gap-3 items-center ">
          <Button
            variant="solid"
            color="primary"
            className="text-sm p-2 py-1"
            onClick={() => setOpenModal(true)}
          >
            Add Question
          </Button>
        </div>
      </div>
      <div className="flex gap-3 w-full bg-white rounded-lg shadow-sm">
        <DatagridProvider>
          <JobProvider>
            {/* <QuestionCard /> */}
            <QbSingleDataGrid
              ModalComp={ModalComp}
              setOpenModal={setOpenModal}
            />
          </JobProvider>
        </DatagridProvider>
      </div>
    </div>
  );
};

export default QBSingle;
