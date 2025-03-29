import { DatagridProvider } from "@dashflowx/datagrid";
import QuestionsListDataGrid from "../../../components/Job/DataGrids/QuestionsListDataGrid";
import { JobProvider } from "../../../context/JobProvider";
import QuestionCard from "../../../components/Job/Cards/QuetionsCards";
import { Link } from "react-router-dom";
import { Button } from "@dashflowx/core";
import useModal from "../../../hooks/useModal";
import { BookOpen } from "lucide-react";
const AddScreeningQues = () => {
  const { setOpenModal, ModalComp } = useModal();
  const { setOpenModal: setOpenModal1, ModalComp: ModalComp1 } = useModal();

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between pt-3 px-3 shadow-lg mb-2">
        <div className="flex gap-3 items-center justify-center p-3">
          <Link to="/jobs">
            <h4 className="mb-0 font-normal">Jobs</h4>
          </Link>
          <>{">"}</>
          <Link
            to={`/jobs/jobdetails/${window.location.pathname.split("/")[3]}`}
          >
            <h4 className="mb-0 font-normal">Job Details</h4>
          </Link>
          <>{">"}</>
          <h3 className="mb-0">Screening Questions</h3>
        </div>
        <div className="flex gap-3 items-center ">
          <Button
            variant="ghost"
            onClick={() => setOpenModal1(true)}
            className="bg-primary/10 text-primary text-sm p-2 py-1"
          >
            <BookOpen className="mr-2 w-4" /> Add Question
          </Button>
          <Button
            variant="solid"
            color="primary"
            className="text-sm p-2 py-1"
            onClick={() => setOpenModal(true)}
          >
            Create Question
          </Button>
        </div>
      </div>
      <div className="flex gap-3 w-full bg-white rounded-lg shadow-sm">
        <DatagridProvider>
          <JobProvider>
            {/* <QuestionCard /> */}
            <QuestionsListDataGrid
              ModalComp={ModalComp}
              setOpenModal={setOpenModal}
              ModalComp1={ModalComp1}
              setOpenModal1={setOpenModal1}
            />
          </JobProvider>
        </DatagridProvider>
      </div>
    </div>
  );
};

export default AddScreeningQues;
