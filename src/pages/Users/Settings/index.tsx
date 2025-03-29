import GeneralSettingsForm from "../../../components/Form/GeneralSettingsForm";
import useModal from "../../../hooks/useModal";
import UploadProfileImageComp from "../../../components/Auth/UploadProfileImage";
import { retrieveValue } from "../../../utils";
import AuthService from "../../../Api/AuthService";
import { LoaderMask } from "../../../components/Loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
      <div className="flex w-full h-full flex-col justify-center items-center bg-neutral-50">
        <div className="self-stretch w-full h-[89px] bg-white px-6 pt-8 pb-7 border-b border-[#e3eaee] flex-col justify-start items-start gap-4 flex shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          <div className="self-stretch justify-between items-start inline-flex">
            <div className="justify-center items-center gap-1 flex">
              <div className="text-[#020c17] text-2xl font-medium font-['Golos Text']">
                Profile
              </div>
            </div>
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
