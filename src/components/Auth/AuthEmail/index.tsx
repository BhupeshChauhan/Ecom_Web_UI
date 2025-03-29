import { ResetPassword } from "../ResetPassword";
import VerifyEmail from "../VerifyEmail";

interface iAuthEmail {
  mode: string;
  library: "react" | "next";
  type: any;
  redirectSignInUrl: string;
  previewImg: string;
  previewTitle: string;
  PreviewDescription: string;
  handleResetPassword: (data: any) => void;
  isLoading?: boolean;
  varient: "basic";
  showSignIn?: boolean;
  oobCode: string;
  email?: string;
  handleEmailVerified?: () => void;
}
const AuthEmail = ({
  mode,
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
  handleEmailVerified,
}: iAuthEmail) => {
  if (mode === "resetPassword") {
    return (
      <ResetPassword
        library={library}
        type={type}
        redirectSignInUrl={redirectSignInUrl}
        previewImg={previewImg}
        previewTitle={previewTitle}
        PreviewDescription={PreviewDescription}
        handleResetPassword={handleResetPassword}
        oobCode={oobCode}
        isLoading={isLoading}
        varient={varient}
        showSignIn={showSignIn}
        mode={mode}
        handleEmailVerified={handleEmailVerified}
      />
    );
  }
  if (mode === "verifyEmail") {
    return (
      <VerifyEmail handleEmailVerified={handleEmailVerified} mode={mode} />
    );
  }
  if (mode === "inviteUser") {
    return (
      <ResetPassword
        library={library}
        type={type}
        redirectSignInUrl={redirectSignInUrl}
        previewImg={previewImg}
        previewTitle={previewTitle}
        PreviewDescription={PreviewDescription}
        handleResetPassword={handleResetPassword}
        oobCode={oobCode}
        isLoading={isLoading}
        varient={varient}
        showSignIn={showSignIn}
        mode={mode}
        handleEmailVerified={handleEmailVerified}
      />
    );
  }
};

export { AuthEmail };
