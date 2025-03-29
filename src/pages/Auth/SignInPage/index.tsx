import { Link } from "react-router-dom";
import AuthService from "../../../Api/AuthService";
import { previewData } from "../../../Data//auth";
import { SignIn } from "../../../components/Auth/SignIn";

export default function SignInPage() {
  const { isLoading, LoginApi, LoginApiSSO } = AuthService();

  return (
    <SignIn
      library="react"
      type={Link}
      forgetPasswordUrl="/forgot-password"
      redirectSignupUrl="/sign-up"
      previewImg={previewData.previewImg}
      previewTitle={previewData.previewTitle}
      PreviewDescription={previewData.PreviewDescription}
      handleSignIn={(data) => {
        LoginApi({ email: data.email, password: data.password });
      }}
      isLoading={isLoading}
      handleSignOn={(res) => {
        LoginApiSSO({ email: res.email });
      }}
      logoUrl="/DashflowLogo.png"
      varient="basic"
      showSignUp={true}
      showSignOn={true}
    />
  );
}
