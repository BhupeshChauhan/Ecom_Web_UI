import {
  DialogComp,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dashflowx/core";
import { useState } from "react";
import { cn } from "../utils";

interface iModalComp {
  dialogTitle: string | JSX.Element;
  dialogContentClassName?: string;
  dialogDescription?: string | JSX.Element;
  dialogContent?: string | JSX.Element;
  dialogFooter?: string | JSX.Element;
  dialogTitleClassName?: string;
  dialogDescriptionClassName?: string;
  dialogContentBodyClassName?: string;
}
const useModal = () => {
  const [openModal, setOpenModal] = useState(false);

  const ModalComp = ({
    dialogTitle,
    dialogContentClassName,
    dialogDescription,
    dialogContent,
    dialogFooter,
    dialogTitleClassName,
    dialogDescriptionClassName,
    dialogContentBodyClassName,
  }: iModalComp) => {
    return (
      <DialogComp open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className={dialogContentClassName}>
          <DialogHeader>
            {dialogTitle && (
              <DialogTitle className={dialogTitleClassName}>
                {dialogTitle}
              </DialogTitle>
            )}
            {dialogDescription && (
              <DialogDescription className={dialogDescriptionClassName}>
                {dialogDescription}
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="h-[1px] bg-gray-200 w-full" />
          {dialogContent && (
            <div
              className={cn(
                "p-4 overflow-y-auto max-h-[calc(100vh-300px)]",
                dialogContentBodyClassName,
              )}
            >
              {dialogContent}
            </div>
          )}
          {dialogFooter && (
            <DialogFooter className="flex flex-1 h-full justify-end items-end">
              {dialogFooter}
            </DialogFooter>
          )}
        </DialogContent>
      </DialogComp>
    );
  };
  return { openModal, setOpenModal, ModalComp };
};

export default useModal;
