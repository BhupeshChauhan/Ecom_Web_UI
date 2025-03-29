import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import BasicForgetPassword from "./Varients/Basic";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter a valid email" })
    .email({ message: "Not a valid email" }),
});

interface iForgetPassword {
  library: "react" | "next";
  type: any;
  redirectSignInUrl: string;
  previewImg: string;
  previewTitle: string;
  PreviewDescription: string;
  isLoading?: boolean;
  varient: "basic";
  showSignIn?: boolean;
  continueUrl: string; // This is the url to redirect the user to after signing in.
  handleForgetPassword?: (email: any) => void;
}

const ForgetPassword = ({
  library,
  type,
  redirectSignInUrl,
  previewImg,
  previewTitle,
  PreviewDescription,
  isLoading,
  varient = "basic",
  showSignIn = true,
  continueUrl,
  handleForgetPassword,
}: iForgetPassword) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const handleSubmitForm = (data: any) => {
    handleForgetPassword && handleForgetPassword(data?.email);
  };

  if (varient === "basic") {
    return (
      <BasicForgetPassword
        handleSubmit={handleSubmit}
        handleSubmitForm={handleSubmitForm}
        register={register}
        errors={errors}
        isLoading={isLoading}
        library={library}
        type={type}
        redirectSignInUrl={redirectSignInUrl}
        PreviewDescription={PreviewDescription}
        previewTitle={previewTitle}
        previewImg={previewImg}
        showSignIn={showSignIn}
      />
    );
  }
};

export { ForgetPassword };
