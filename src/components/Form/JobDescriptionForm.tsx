import { Button } from "@dashflowx/core";
import useMounted from "../../hooks/useMounted";
import { useJobFormContext } from "../../context/JobFormProvider";
import RichTextBox from "./FormFeilds/RichTextBox";
import { ErrorPopUp } from "../../utils/AlearUtils";
import JobService from "../../Api/JobService";
import { useEffect } from "react";
import { BsStars } from "react-icons/bs";
import { LoaderMask, LoadingCompoent } from "../Loader";
import useModal from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";

const JobDescriptionForm = ({ type }: any) => {
  const mounted = useMounted();
  const { openModal, setOpenModal, ModalComp } = useModal();
  const navigate = useNavigate();
  const {
    FormData,
    requiredSkillsArray,
    optionalSkillsArray,
    Jdtype,
    JdData,
    JdDataAI,
    handleJdtypeChange,
    handleJdDataChange,
    handleJdDataAIChange,
    handleStepChange,
    LocationType,
  } = useJobFormContext();

  const { isLoading, GenerateJDApi } = JobService(
    FormData,
    LocationType,
    JdData,
    JdDataAI,
    Jdtype,
  );
  const GenerateJD = async () => {
    mounted.current = false;
    GenerateJDApi(
      mounted,
      requiredSkillsArray,
      optionalSkillsArray,
      handleJdDataAIChange,
    );
  };

  useEffect(() => {
    if (JdData !== "<p>Enter Job Description...</p>") {
      mounted.current = false;
      mounted.current = true;
    }
  }, [JdData]);

  const handleLeave = () => {
    setOpenModal(false);
    navigate(-1);
  };

  // useEffect(() => {
  //   const handlePopState = (event) => {
  //     if (Object.keys(form.formState.dirtyFields).length > 0) {
  //       event.preventDefault();
  //       setOpenModal(true);
  //     }
  //   };

  //   window.history.pushState(null, "", window.location.href); // Push current state to history
  //   window.addEventListener("popstate", handlePopState);

  //   return () => {
  //     window.removeEventListener("popstate", handlePopState);
  //   };
  // }, [navigate, form.formState.dirtyFields]);

  return (
    <div className="w-full p-6 shadow-sm gap-3 flex justify-between flex-col h-full">
      <div className="h-full">
        <div className="flex justify-between pt-3 mb-2">
          <div className="flex gap-3 items-center justify-center">
            <h3 className="mb-0">Job description</h3>
          </div>
          <div className="flex gap-3 items-center ">
            <Button
              variant="ghost"
              className="w-fit mr-4 h-fit"
              onClick={() => GenerateJD()}
            >
              <BsStars className="mr-2" /> Generate with AI
            </Button>
          </div>
        </div>
        <div className="my-4"></div>
        {isLoading && <LoadingCompoent />}
        <div className="flex col-span-2 flex-col">
          <div className="w-full">
            <div className="my-16 mt-0 w-full">
              {mounted.current && (
                <RichTextBox
                  initialData={JdDataAI}
                  setData={handleJdDataChange}
                  isReactOnly={false}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end gap-3">
        <Button
          variant="outline"
          color="primary"
          disabled={isLoading}
          onClick={() => handleStepChange(1)}
        >
          Back
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={() => {
            if (JdData && JdDataAI === "<p>Enter Job Description...</p>") {
              ErrorPopUp("Please enter Job Description");
            } else {
              handleStepChange(3);
            }
          }}
        >
          Continue
        </Button>
      </div>
      <ModalComp
        dialogTitle={"Unsaved Changes"}
        dialogContentClassName="bg-white w-[800px] max-w-screen-lg"
        dialogContent={
          <div>You have unsaved changes. Are you sure you want to leave?</div>
        }
        dialogFooter={
          <div className="flex gap-3 items-center justify-end w-full mt-6">
            <Button
              variant="outline"
              className="w-fit"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              color="primary"
              className="w-fit"
              onClick={handleLeave}
            >
              Leave
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default JobDescriptionForm;
