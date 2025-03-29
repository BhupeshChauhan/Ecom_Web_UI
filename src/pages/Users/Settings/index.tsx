import GeneralSettingsForm from "../../../components/Form/GeneralSettingsForm";
import useModal from "../../../hooks/useModal";
import UploadProfileImageComp from "../../../components/Auth/UploadProfileImage";
import { retrieveValue } from "../../../utils";
import AuthService from "../../../Api/AuthService";
import { LoaderMask } from "../../../components/Loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@dashflowx/core";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Full Name must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(1, { message: "Please enter a valid email" })
    .email({ message: "Not a valid email" }),
  role: z.string().min(2, {
    message: "Please select a role.",
  }),
});

const ClientGeneralSettings = () => {
  const navigate = useNavigate();
  const { openModal, setOpenModal, ModalComp } = useModal();
  const userData = retrieveValue("userData");
  const { isLoading, DeleteProfileImage, UploadProfileImage } = AuthService();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: userData.username,
      email: userData.email,
      role: userData.role,
    },
  });

  return (
    <div>
      {isLoading && <LoaderMask />}
      <div className="flex h-screen flex-col justify-center items-center bg-neutral-50 w-full">
        <div className="flex justify-between pt-3 px-3 shadow-lg mb-2 bg-white w-full">
          <div className="flex gap-3 items-center justify-center p-3">
            <Link to="/dashboard">
            <h4 className="mb-0 font-normal">Dashboard</h4>
          </Link>
          <>{">"}</>
          <h3 className="mb-0">Settings</h3>
        </div>
        <div className="flex gap-3 items-center ">
          <Button
            variant="ghost"
            className="w-fit h-fit"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
        <GeneralSettingsForm form={form} setOpenModal={setOpenModal} />
      </div>
      <ModalComp
        dialogTitle="Upload Profile Image"
        dialogContentClassName="bg-white w-[1200px] max-w-screen-lg"
        dialogDescription=""
        dialogContent={
          <UploadProfileImageComp
            setOpenModal={setOpenModal}
            UploadProfileImage={UploadProfileImage}
          />
        }
        dialogFooter={<></>}
      />
    </div>
  );
};

export default ClientGeneralSettings;
