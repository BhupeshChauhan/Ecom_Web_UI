import { Button } from "@dashflowx/core";
import { useLocation } from "react-router-dom";
import { Datagrid, UseDataGrid } from "@dashflowx/datagrid";
import { retrieveValue } from "../../../utils";
import useModal from "../../../hooks/useModal";
import ScreeningQuesForm from "../../Form/ScreeningQuesForm";
import ScreeningQuesCard from "../Cards/ScreeningQuesCard";
import JobService from "../../../Api/JobService";
import { LoaderMask } from "../../Loader";
import { useEffect, useState } from "react";
import { useJobContext } from "../../../context/JobProvider";
import QuestionCard from "../Cards/QuetionsCards";
import QuestionBankModalContent from "../../QuestionBank/QuestionBankModalContent";
import QBQuestionCard from "../Cards/QBQuestionCard";
import QBQuestionForm from "../../Form/QBQuestionForm";

const QbSingleDataGrid = ({ ModalComp, setOpenModal }: any) => {
  const location = useLocation();
  const token = retrieveValue("accessToken");
  const { handleReload, listData, loading, queue } = UseDataGrid();

  const { isLoading, DeleteQuestionQB, AddQuestionQB } = JobService();

  const columnsCard = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }: any) => {
        return (
          <QBQuestionCard
            element={row.original}
            handleReload={() => {
              handleReload(
                `${import.meta.env.VITE_API_JOB_BASE_URI}/jobs/question-bank?categoryId=${location.pathname.split("/")[3]}`,
                token,
              );
            }}
            DeleteQuestionQB={DeleteQuestionQB}
          />
        );
      },
    },
  ];

  const { messages, setMessages } = useJobContext();
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (messages) {
      if (
        messages.message ===
        `Questions sent for ${location.pathname.split("/")[3]}`
      ) {
        handleReload(
          `${import.meta.env.VITE_API_JOB_BASE_URI}/jobs/question-bank?categoryId=${location.pathname.split("/")[3]}`,
          token,
        );
        setMessages(null);
      }
    }
  }, [messages]);

  return (
    <div className="w-full">
      {isLoading && <LoaderMask />}
      <div className="max-w-screen-lg mx-auto">
        <Datagrid
          listColumns={{}}
          CardColumn={columnsCard}
          variant="ssr"
          getApi={`${import.meta.env.VITE_API_JOB_BASE_URI}/jobs/question-bank?categoryId=${location.pathname.split("/")[3]}`}
          showChangeButton={false}
          auth={token}
          defaultView="grid"
          unableDefaultSort={false}
          showSelectAction={false}
        />
      </div>
      {queue === "pending" && (
        <div className="text-center w-full text-primary text-xl font-bold">
          <div className="relative inline-flex">
            <div className="w-4 h-4 bg-primary rounded-full"></div>
            <div className="w-4 h-4 bg-primary rounded-full absolute top-0 left-0 animate-ping"></div>
            <div className="w-4 h-4 bg-primary rounded-full absolute top-0 left-0 animate-pulse"></div>
          </div>{" "}
          Please Come Back! Our AI is Generating Questions
        </div>
      )}
      <ModalComp
        dialogTitle="Add Question"
        dialogContentClassName="bg-white w-[1200px] max-w-screen-md"
        dialogDescription=""
        dialogContent={
          <QBQuestionForm
            setOpenModal={setOpenModal}
            handleReload={() => {
              handleReload(
                `${import.meta.env.VITE_API_JOB_BASE_URI}/jobs/question-bank?categoryId=${location.pathname.split("/")[3]}`,
                token,
              );
            }}
          />
        }
        dialogFooter={<></>}
      />
    </div>
  );
};

export default QbSingleDataGrid;
