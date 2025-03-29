import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import BasicSignIn from "./Varients/Basic";
import { jwtDecode } from "jwt-decode";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter a valid email" })
    .email({ message: "Not a valid email" }),
  password: z
    .string()
    .min(1, { message: "Please enter a valid password" })
    .max(20, { message: "Password must be less than 20 characters" }),
});

interface iSignIn {
  library: "react" | "next";
  type: any;
  forgetPasswordUrl: string;
  redirectSignupUrl: string;
  previewImg: string;
  previewTitle: string;
  PreviewDescription: string;
  handleSignIn: (data: { email: string; password: string }) => void;
  isLoading?: boolean;
  handleSignOn?: (data: any) => void;
  logoUrl: string;
  varient: "basic";
  showSignUp?: boolean;
  showSignOn?: boolean;
}

const SignIn = ({
  library,
  type,
  forgetPasswordUrl,
  redirectSignupUrl,
  previewImg,
  previewTitle,
  PreviewDescription,
  handleSignIn,
  isLoading,
  handleSignOn,
  logoUrl,
  varient = "basic",
  showSignUp = true,
  showSignOn = true,
}: iSignIn) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const handleSubmitForm = (data: any) => {
    handleSignIn({ email: data.email, password: data.password });
  };

  const handleSubmitOn = (type: string, credentialResponse: any) => {
    if (type === "google") {
      const res = jwtDecode(credentialResponse?.credential);
      handleSignOn && handleSignOn(res);
    }
  };

  if (varient === "basic") {
    return (
      <BasicSignIn
        logoUrl={logoUrl}
        handleSubmitOn={handleSubmitOn}
        handleSubmit={handleSubmit}
        handleSubmitForm={handleSubmitForm}
        register={register}
        errors={errors}
        isLoading={isLoading}
        library={library}
        type={type}
        forgetPasswordUrl={forgetPasswordUrl}
        redirectSignupUrl={redirectSignupUrl}
        PreviewDescription={PreviewDescription}
        previewTitle={previewTitle}
        previewImg={previewImg}
        showSignUp={showSignUp}
        showSignOn={showSignOn}
      />
    );
  }
};

export { SignIn };
