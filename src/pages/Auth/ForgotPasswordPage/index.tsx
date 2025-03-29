import { Link } from "react-router-dom";
import { previewData } from "../../../Data//auth";
import { ForgetPassword } from "../../../components/Auth/ForgetPassword";
import AuthService from "../../../Api/AuthService";

export default function ForgotPasswordPage({ type }: any) {
  const { isLoading, ForgotPassword } = AuthService();
  return (
    <ForgetPassword
      library="react"
      type={Link}
      redirectSignInUrl="/sign-in"
      previewImg={previewData.previewImg}
      previewTitle={previewData.previewTitle}
      PreviewDescription={previewData.PreviewDescription}
      isLoading={isLoading}
      varient="basic"
      showSignIn={true}
      continueUrl="https://hireomaticclient.pages.dev/sign-in"
      handleForgetPassword={async (email) => {
        await ForgotPassword({ email: email });
      }}
    />
  );
}
