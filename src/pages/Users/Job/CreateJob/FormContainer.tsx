import { z } from "zod";
import BasicJobForm from "../../../../components/Form/BasicJobForm";
import JobDescriptionForm from "../../../../components/Form/JobDescriptionForm";
import PreviewJob from "./PreviewJob";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { UnsavedChangesModal } from "../../../../components/Form/BasicJobForm/UnsavedChangesModal";
import { useNavigate } from "react-router-dom";
import useModal from "../../../../hooks/useModal";
import { useJobFormContext } from "../../../../context/JobFormProvider";

// Form validation schema using Zod
const formSchema = z.object({
  title: z
    .string()
    .min(4, "Title must be at least 2 characters.")
    .max(100, "Title must be at most 100 characters."),
  experience: z
    .string()
    .min(1, "Experience must be at least 1 characters.")
    .max(3, "Experience must be at most 100 characters."),
  jobDetails: z
    .string()
    .min(25, "Short Description must be at least 10 characters.")
    .max(1000, "Short Description must be at most 1000 characters."),
  location: z.string(),
});

// Component for the main form container
export const  FormContainer = ({
  formContainerClasses,
  basicFormClasses,
  descriptionFormClasses,
  type,
}) => {
  const navigate = useNavigate();
  const { openModal, setOpenModal, ModalComp } = useModal();

  // Get context values and handlers
  const { ResetData } = useJobFormContext();

  // Initialize form with React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      experience: "",
      jobDetails: "",
      location: "",
    },
  });

  // Handle navigation away from form
  const handleLeave = () => {
    setOpenModal(false);
    ResetData();
    navigate(-1);
  };

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (Object.keys(form.formState.dirtyFields).length > 0) {
        event.preventDefault();
        setOpenModal(true);
      }
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  return (
    <div className={formContainerClasses}>
      <div className={basicFormClasses}>
        <BasicJobForm type={type} formSchema={formSchema} form={form} />
      </div>
      <div className={descriptionFormClasses}>
        <JobDescriptionForm type={type} />
      </div>
      <PreviewJob type={type} />
      <UnsavedChangesModal
        ModalComp={ModalComp}
        setOpenModal={setOpenModal}
        handleLeave={handleLeave}
      />
    </div>
  );
};
