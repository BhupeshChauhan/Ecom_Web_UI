import { Link } from "react-router-dom";
import AuthService from "../../../Api/AuthService";
import { previewData } from "../../../Data//auth";
import { SignUp } from "../../../components/Auth/SignUp";

export default function SignUpPage() {
  const { isLoading, SignUpApi, SignUpSSOApi } = AuthService();
  return (
    <SignUp
      library="react"
      type={Link}
      redirectSignInUrl="/sign-in"
      previewImg={previewData.previewImg}
      previewTitle={previewData.previewTitle}
      PreviewDescription={previewData.PreviewDescription}
      handleSignUp={async (res) => {
        SignUpApi({
          username: res.username,
          email: res.email,
          password: res.password,
        });
      }}
      isLoading={isLoading}
      handleSignOn={async (res) => {
        SignUpSSOApi({
          username: res.name,
          email: res.email,
        });
      }}
      logoUrl="/HireomaticLogo.png"
      varient="basic"
      continueUrl="https://hireomaticclient.pages.dev/"
      showSignOn={true}
    />
  );
}
