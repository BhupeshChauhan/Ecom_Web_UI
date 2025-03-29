import { AlertDialog, Button } from "@dashflowx/core";
import { Delete, Trash, Trash2 } from "lucide-react";
import { FaGripVertical } from "react-icons/fa6";
import { EditScreeningQuesForm2 } from "../../../Form/EditScreeningQuesForm";
import { EditQbQuestionForm } from "../../../Form/EditQbQuestionForm";

const QBQuestionCard = ({ element, handleReload, DeleteQuestionQB }) => {
  return (
    <div className="w-full">
      <div className="flex w-full gap-3">
        <div className="flex justify-center items-center text-gray-400 ">
          <FaGripVertical />
        </div>
        <div className="p-2 w-full">
          <EditQbQuestionForm
            defaultValue={element}
            handleReload={handleReload}
            DeleteQuestionQB={DeleteQuestionQB}
            param={"Hello"}
          />
        </div>
      </div>
    </div>
  );
};

export default QBQuestionCard;
