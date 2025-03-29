import { Button } from "@dashflowx/core";

// Unsaved Changes Modal Component
export const UnsavedChangesModal = ({
  ModalComp,
  setOpenModal,
  handleLeave,
}) => (
  <ModalComp
    dialogTitle="Unsaved Changes"
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
);
