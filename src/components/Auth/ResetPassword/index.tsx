import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import BasicForgetPassword from "./Varients/Basic";
import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";

const loginSchema = z
  .object({
    newpassword: z
      .string()
      .min(1, { message: "Please enter a valid password" })
      .max(20, { message: "Password must be less than 20 characters" }),
    confirmpassword: z
      .string()
      .min(1, { message: "Please enter a valid password" })
      .max(20, { message: "Password must be less than 20 characters" }),
  })
  .superRefine((val, ctx) => {
    if (val.newpassword !== val.confirmpassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is not the same as confirm password",
        path: ["confirmpassword"],
      });
    }
  });

interface iResetPassword {
  library: "react" | "next";
  type: any;
  redirectSignInUrl: string;
  previewImg: string;
  previewTitle: string;
  PreviewDescription: string;
  handleResetPassword: (data: { password: string }) => void;
  isLoading?: boolean;
  varient: "basic";
  showSignIn?: boolean;
  oobCode: string; // This is the oobCode received from the email link.
  mode: string;
  handleEmailVerified: () => void;
}

const ResetPassword = ({
  library,
  type,
  redirectSignInUrl,
  previewImg,
  previewTitle,
  PreviewDescription,
  handleResetPassword,
  isLoading,
  varient = "basic",
  showSignIn = true,
  oobCode,
  mode,
  handleEmailVerified,
}: iResetPassword) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      newpassword: "",
      confirmpassword: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const [passwordStrength, setPasswordStrength] = useState("");
  const testResult = zxcvbn(passwordStrength);
  useEffect(() => {
    if (getValues("newpassword")) {
      setPasswordStrength(getValues("newpassword"));
    }
  }, [getValues("newpassword")]);

  const handleSubmitForm = (data: any) => {
    handleResetPassword({
      password: data.confirmpassword,
    });
  };

  useEffect(() => {
    if (mode === "inviteUser") {
      handleEmailVerified && handleEmailVerified();
    }
  }, []);

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
        getValues={getValues}
        testResult={testResult}
        setPasswordStrength={setPasswordStrength}
      />
    );
  }
};

export { ResetPassword };
