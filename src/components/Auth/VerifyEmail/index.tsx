/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface iVerifyEmail {
  handleEmailVerified?: () => void;
  mode: string;
}

const VerifyEmail = ({ handleEmailVerified }: iVerifyEmail) => {
  const navigate = useNavigate();
  useEffect(() => {
    handleEmailVerified && handleEmailVerified();
    navigate("/sign-in");
  }, []);

  return <></>;
};

export default VerifyEmail;
