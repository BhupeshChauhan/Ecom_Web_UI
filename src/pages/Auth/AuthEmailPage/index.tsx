import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../../Api/AuthService";
import { previewData } from "../../../Data//auth";
import { AuthEmail } from "../../../components/Auth/AuthEmail";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const AuthEmailPage = () => {
  const { isLoading, VerifyEmail, ResetPassword } = AuthService();
  const navigate = useNavigate();
  const query = useQuery();
  const mode = query.get("mode");
  return (
    <AuthEmail
      mode={mode}
      library="react"
      type={Link}
      redirectSignInUrl="/sign-in"
      previewImg={previewData.previewImg}
      previewTitle={previewData.previewTitle}
      PreviewDescription={previewData.PreviewDescription}
      handleResetPassword={(data) => {
        ResetPassword(
          {
            oobCode: query.get("oobCode"),
            newPassword: data.password,
          },
          () => {
            navigate("/sign-in");
          },
          () => {},
        );
      }}
      isLoading={isLoading}
      varient="basic"
      showSignIn={false}
      oobCode={query.get("oobCode")}
      handleEmailVerified={async () => {
        await VerifyEmail({ oobCode: query.get("oobCode") });
      }}
    />
  );
};

export default AuthEmailPage;
