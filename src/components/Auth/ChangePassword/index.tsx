import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import BasicChangePassword from "./Varients/Basic.tsx";
import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";
import { ErrorPopUp } from "../../../utils/AlearUtils.tsx";

const loginSchema = z
  .object({
    newpassword: z
      .string()
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    confirmpassword: z
      .string()
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
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

interface iChangePassword {
  library: "react" | "next";
  type: any;
  redirectSignInUrl: string;
  handleChangePassword: (data: { password: string }) => void;
  isLoading?: boolean;
  varient: "basic";
  showSignIn?: boolean;
}

const ChangePassword = ({
  library,
  type,
  redirectSignInUrl,
  handleChangePassword,
  isLoading,
  varient = "basic",
  showSignIn = true,
}: iChangePassword) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
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
    if (testResult.score < 3) {
      ErrorPopUp("Please! Enter a strong password");
    } else {
      handleChangePassword({
        password: data.confirmpassword,
      });
    }
  };

  if (varient === "basic") {
    return (
      <BasicChangePassword
        handleSubmit={handleSubmit}
        handleSubmitForm={handleSubmitForm}
        register={register}
        errors={errors}
        isLoading={isLoading}
        library={library}
        type={type}
        redirectSignInUrl={redirectSignInUrl}
        showSignIn={showSignIn}
        testResult={testResult}
        setPasswordStrength={setPasswordStrength}
        watch={watch}
      />
    );
  }
};

export { ChangePassword };
