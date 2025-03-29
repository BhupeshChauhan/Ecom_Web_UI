import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@dashflowx/core";
import { AlertDialogComp } from "@dashflowx/core";
import React from "react";

interface MessageDialogProps {
  actionButton: React.ReactNode;
  buttonClassName?: string;
  title: string;
  description: React.ReactNode;
}

const MessageDialog = ({
  actionButton,
  buttonClassName,
  title,
  description,
}: MessageDialogProps) => {
  return (
    <AlertDialogComp>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className={buttonClassName}>
          {actionButton}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogComp>
  );
};

export default MessageDialog;
