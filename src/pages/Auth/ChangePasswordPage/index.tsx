import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../Api/AuthService";
import { ChangePassword } from "../../../components/Auth/ChangePassword";

const ChangePasswordPage = () => {
  const { isLoading, ChangePasswordApi } = AuthService();
  const navigate = useNavigate();
  return (
    <ChangePassword
      library="react"
      type={Link}
      redirectSignInUrl="/sign-in"
      handleChangePassword={(data) => {
        ChangePasswordApi(
          {
            newPassword: data.password,
          },
          () => {
            navigate("/settings");
          },
          () => {},
        );
      }}
      isLoading={isLoading}
      varient="basic"
      showSignIn={false}
    />
  );
};

export default ChangePasswordPage;
