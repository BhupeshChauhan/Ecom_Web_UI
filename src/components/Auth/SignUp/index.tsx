import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import BasicSignup from "./Varients/Basic";
import { jwtDecode } from "jwt-decode";

const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Please enter a valid Username" })
    .max(20, { message: "Username must be less than 20 characters" }),
  email: z
    .string()
    .min(1, { message: "Please enter a valid email" })
    .email({ message: "Not a valid email" }),
  password: z
    .string()
    .min(1, { message: "Please enter a valid password" })
    .max(20, { message: "Password must be less than 20 characters" }),
});

interface iSignUp {
  library: "react" | "next";
  type: any;
  redirectSignInUrl: string;
  previewImg: string;
  previewTitle: string;
  PreviewDescription: string;
  handleSignUp: (data: {
    username: string;
    email: string;
    password: string;
  }) => void;
  isLoading?: boolean;
  handleSignOn?: (data: any) => void;
  logoUrl: string;
  varient: "basic";
  showSignIn?: boolean;
  continueUrl: string;
  showSignOn?: boolean;
}

const SignUp = ({
  library,
  type,
  redirectSignInUrl,
  previewImg,
  previewTitle,
  PreviewDescription,
  handleSignUp,
  isLoading,
  handleSignOn,
  logoUrl,
  varient = "basic",
  showSignIn = true,
  continueUrl,
  showSignOn,
}: iSignUp) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const handleSubmitForm = (data: any) => {
    handleSignUp({
      username: data.username,
      email: data.email,
      password: data.password,
    });
  };

  const handleSubmitOn = (type: string, credentialResponse: any) => {
    if (type === "google") {
      const res = jwtDecode(credentialResponse?.credential);
      handleSignOn && handleSignOn(res);
    }
  };

  if (varient === "basic") {
    return (
      <BasicSignup
        logoUrl={logoUrl}
        handleSubmitOn={handleSubmitOn}
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
        showSignOn={showSignOn}
      />
    );
  }
};

export { SignUp };
