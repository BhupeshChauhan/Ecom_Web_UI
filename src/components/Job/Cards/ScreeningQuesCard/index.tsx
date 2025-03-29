import { AlertDialog, Button } from "@dashflowx/core";
import { Delete, Edit } from "lucide-react";
import useModal from "../../../../hooks/useModal";
import EditScreeningQuesForm from "../../../Form/EditScreeningQuesForm";

const ScreeningQuesCard = ({ element, handleReload, DeleteQuestion }) => {
  const {
    openModal: openModal1,
    setOpenModal: setOpenModal1,
    ModalComp: ModalComp1,
  } = useModal();

  return (
    <div className="flex text-start">
      <div className="flex w-[80%] gap-3 p-6 text-start">
        <div>{element.srNo}.</div>
        <div>
          <h5 className="flex mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white ">
            {element.question}{" "}
            {element.type === "required" && (
              <span className="flex justify-center items-center ml-2 bg-red-100 text-primary text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-primary/20 dark:text-red-300 uppercase">
                required
              </span>
            )}
          </h5>
          <div className="flex gap-3">
            <p>Difficulty: {element.difficulty}</p>
          </div>
        </div>
      </div>
      <div className="w-[20%] flex items-center justify-end">
        <Button
          variant="ghost"
          className="w-fit mr-4"
          onClick={() => setOpenModal1(true)}
        >
          <Edit className="h-6 w-6" />
        </Button>
        <AlertDialog
          variant="basic"
          actionButton={<Delete className="h-6 w-6 text-red-500" />}
          title="Send Invite"
          description="Are sure you want to Send Invite to this applicant?"
          onSubmit={async () => {
            await DeleteQuestion(element.id);
            handleReload();
            setOpenModal1(false);
          }}
          buttonClassName="border-0 p-2 font-light text-black text-sm"
        />
      </div>
      <ModalComp1
        dialogTitle="Edit Assessment Questions"
        dialogContentClassName="bg-white w-[1200px] max-w-screen-md"
        dialogDescription=""
        dialogContent={
          <EditScreeningQuesForm
            defaultValue={element}
            setOpenModal1={setOpenModal1}
            handleReload={handleReload}
          />
        }
        dialogFooter={<></>}
      />
    </div>
  );
};

export default ScreeningQuesCard;
