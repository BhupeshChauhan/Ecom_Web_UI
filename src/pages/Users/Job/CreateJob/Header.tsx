import { Link } from "react-router-dom";
import { cn } from "../../../../utils";
import { Button } from "@dashflowx/core";
import useModal from "../../../../hooks/useModal";

interface HeaderProps {
  step: number;
  type: "add" | "edit";
  isLoading: boolean;
  handleStepChange: (step: number) => void;
  handleSaveJob?: () => void;
  handlePublishJob?: () => void;
  handleUpdateJob?: () => void;
  handleChangeVisibility?: (value: boolean) => void;
}

export const Header = ({
  step,
  type,
  isLoading,
  handleStepChange,
  handleSaveJob,
  handlePublishJob,
  handleUpdateJob,
  handleChangeVisibility,
}: HeaderProps) => {
  const showActions = step === 3;
  const { setOpenModal, ModalComp } = useModal();

  const publishJobPublic = async () => {
    await handleChangeVisibility(true);
    await handlePublishJob();
    setOpenModal(false);
  };

  const publishJobPrivate = async () => {
    await handleChangeVisibility(false);
    await handlePublishJob();
    setOpenModal(false);
  };

  if (type === "add") {
    return (
      <div className="flex items-center justify-between pt-3 px-3 pb-3 bg-white">
        <h4 className="mb-0">Jobs &gt; Create Job</h4>
        <div className={cn(showActions ? "flex gap-3" : "hidden")}>
          <Button
            disabled={isLoading}
            variant="ghost"
            onClick={() => handleStepChange(1)}
          >
            Back to Edit
          </Button>
          <Button
            disabled={isLoading}
            variant="outline"
            onClick={handleSaveJob}
          >
            Save as Draft
          </Button>
          <Button
            disabled={isLoading}
            variant="solid"
            color="primary"
            onClick={() => setOpenModal(true)}
          >
            Publish
          </Button>
        </div>

        <ModalComp
          dialogTitle="Do you want to publish this job to the public currier page?"
          dialogContentClassName="bg-white w-[1200px] max-w-screen-lg"
          dialogDescription=""
          dialogFooter={
            <div className="flex gap-3 items-center justify-start w-full mt-6">
              <Button
                variant="outline"
                className="w-fit"
                disabled={isLoading}
                onClick={publishJobPrivate}
              >
                No
              </Button>
              <Button
                variant="solid"
                color="primary"
                className="w-fit"
                disabled={isLoading}
                onClick={publishJobPublic}
              >
                Yes
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  const jobId = window.location.pathname.split("/")[3];

  return (
    <div className="flex justify-between pt-3 px-3 shadow-lg mb-2">
      <div className="flex gap-3 items-center justify-center p-3">
        <Link to="/jobs">
          <h4 className="mb-0 font-normal">Jobs</h4>
        </Link>
        <span>&gt;</span>
        <Link to={`/jobs/jobdetails/${jobId}`}>
          <h4 className="mb-0 font-normal">Jobs Details</h4>
        </Link>
        <span>&gt;</span>
        <h3 className="mb-0">Edit Job</h3>
      </div>
      <div className={cn(showActions ? "flex items-center gap-3" : "hidden")}>
        <Button
          disabled={isLoading}
          variant="solid"
          color="primary"
          className="h-fit"
          onClick={handleUpdateJob}
        >
          Update
        </Button>
      </div>
    </div>
  );
};
