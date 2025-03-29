import { useState } from "react";
import { persistValue, retrieveValue } from "../utils/index.tsx";
import { useNavigate } from "react-router-dom";
import { AuthApiRoutes } from "../utils/Routes.ts";
import { ErrorPopUp, SuccessPopUp } from "../utils/AlearUtils.tsx";
import { useMainContext } from "../context/MainProvider.tsx";

const AuthService = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const token = retrieveValue("accessToken");
  const { setLimit } = useMainContext();

  const SignUpApi = async (res) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.SignUp}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          body: JSON.stringify({
            username: res.username,
            email: res.email,
            password: res.password,
          }),
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      navigate("/sign-in");
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  const SignUpSSOApi = async (res) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.SignUpSSO}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          body: JSON.stringify({
            username: res.username,
            email: res.email,
          }),
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (data.data.authToken) {
        persistValue("accessToken", data.data.authToken);
      }
      if (data.data.user) {
        persistValue("userData", data.data.user);
      }
      persistValue("isUserLoggedIn", true);
      setisLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  const LoginApi = async (res) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.Login}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          body: JSON.stringify({ email: res.email, password: res.password }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (data.data.authToken) {
        persistValue("accessToken", data.data.authToken);
      }
      if (data.data.user) {
        persistValue("userData", data.data.user);
      }
      if (data.data.companyDetails) {
        persistValue("companyData", data.data.companyDetails);
      }
      if (data.data.subscriptionDetails) {
        persistValue("limit", data.data.subscriptionDetails.interviewLimit);
      }
      persistValue("isUserLoggedIn", true);
      setisLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
      if (error.message === "Email not verified") {
        navigate("/verify-email");
      }
    }
  };

  const LoginApiSSO = async (res) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.LoginSSO}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          body: JSON.stringify({ email: res.email }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (data.data.authToken) {
        persistValue("accessToken", data.data.authToken);
      }
      if (data.data.user) {
        persistValue("userData", data.data.user);
      }
      persistValue("isUserLoggedIn", true);
      setisLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  const UpdateUserData = async (res) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.UpdateUserData}`,
        {
          method: "PUT", // or 'POST', 'PUT', etc.
          body: JSON.stringify({
            userDetails: res.userDetails,
            userId: res.userId,
          }),
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (data.data) {
        persistValue("userData", data.data);
      }
      setisLoading(false);
      SuccessPopUp(data.message);
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  const GetCompanyData = async () => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.GetCompanyData}`,
        {
          method: "GET", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (data.data) {
        persistValue("companyData", data.data);
      }
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  const GetCompanyLimit = async () => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.GetCompanyLimit}`,
        {
          method: "GET", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  const UpdateCompanyData = async (res) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.UpdateCompanyData}`,
        {
          method: "PUT", // or 'POST', 'PUT', etc.
          body: JSON.stringify({
            clientDetails: res.clientDetails,
          }),
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (data.data) {
        persistValue("companyData", data.data);
      }
      setisLoading(false);
      SuccessPopUp(data.message);
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  const UploadProfileImage = async (res, onSuccess, onError) => {
    setisLoading(true);
    const formData = new FormData();
    formData.append("file", res.file);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.UploadProfileImage}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (data.data) {
        persistValue("userData", data.data);
      }
      SuccessPopUp(data.message);
      onSuccess();
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      onError();
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  const UploadLogo = async (res, onSuccess, onError) => {
    setisLoading(true);
    const formData = new FormData();
    formData.append("file", res.file);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.UploadLogo}`,
        {
          method: "PUT", // or 'POST', 'PUT', etc.
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (data.data) {
        persistValue("companyData", data.data);
      }
      SuccessPopUp(data.message);
      onSuccess();
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      onError();
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  const VerifyEmail = async (res) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.VerifyEmail}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          body: JSON.stringify({
            oobCode: res.oobCode,
          }),
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      SuccessPopUp(data.message);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      ErrorPopUp(error.message);
    }
  };

  const SendInviteEmail = async (res) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.SendInviteEmail}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          body: JSON.stringify({
            username: res.username,
            email: res.email,
            userId: res.userId,
          }),
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      SuccessPopUp(data.message);
    } catch (error) {
      ErrorPopUp(error.message);
    }
  };

  const ForgotPassword = async (res) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.ForgotPassword}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          body: JSON.stringify({
            email: res.email,
          }),
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      SuccessPopUp(data.message);
      navigate("/sign-in");
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      ErrorPopUp(error.message);
    }
  };

  const ResetPassword = async (res, onSuccess, onError) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.ResetPassword}`,
        {
          method: "PUT", // or 'POST', 'PUT', etc.
          body: JSON.stringify({
            oobCode: res.oobCode,
            newPassword: res.newPassword,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      SuccessPopUp(data.message);
      onSuccess();
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      onError();
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  const ChangePasswordApi = async (res, onSuccess, onError) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.ChangePassword}`,
        {
          method: "PUT", // or 'POST', 'PUT', etc.
          body: JSON.stringify({
            newPassword: res.newPassword,
          }),
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      SuccessPopUp(data.message);
      onSuccess();
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      onError();
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  const InviteUser = async (res) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.InviteUser}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          body: JSON.stringify({
            email: res.email,
            role: res.role,
            username: res.username,
            password: res.password,
          }),
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      await SendInviteEmail({
        userId: data.data.userId,
        email: res.email,
        username: res.username,
      });
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  const DeleteProfileImage = async (res) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.DeleteProfileImage}`,
        {
          method: "DELETE", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (data.data) {
        persistValue("userData", data.data);
      }
      SuccessPopUp(data.message);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  const DeleteLogo = async (res) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.DeleteLogo}`,
        {
          method: "DELETE", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (data.data) {
        persistValue("companyData", data.data);
      }
      SuccessPopUp(data.message);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  const LogOutUser = async () => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.LogOutUser}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      SuccessPopUp(data.message);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  async function handleDeactiveUser(id, handleReload) {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.ToggleStatus}`,
        {
          method: "PUT", // or 'POST', 'PUT', etc.
          body: JSON.stringify({
            userId: id,
            userDetails: { isDeactivated: 1, status: "deactivated" },
          }),
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      handleReload(
        `${import.meta.env.VITE_API_BASE_URI}/auth/user-list?status=all`,
        token,
      );
      SuccessPopUp(data.message);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  }

  async function handleActiveUser(id, handleReload) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.ToggleStatus}`,
        {
          method: "PUT", // or 'POST', 'PUT', etc.
          body: JSON.stringify({
            userId: id,
            userDetails: { isDeactivated: 0, status: "active" },
          }),
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      handleReload(
        `${import.meta.env.VITE_API_BASE_URI}/auth/user-list?status=all`,
        token,
      );
      SuccessPopUp(data.message);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  }

  const GetPlansDetails = async (onSuccess, onError) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.GetPlansDetails}`,
        {
          method: "GET", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      onSuccess(data.data);
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
      onError();
    }
  };

  const GetActivePlanDetails = async (onSuccess, onError) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.GetActivePlanDetails}`,
        {
          method: "GET", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      onSuccess(data.data);
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
      onError();
    }
  };

  const CreatePaymentIntent = async (onSuccess) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.CreatePaymentIntent}`,
        {
          method: "GET", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      onSuccess(data.data);
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  const PaymentWebhook = async (res) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.CreatePaymentIntent}`,
        {
          method: "PUT", // or 'POST', 'PUT', etc.
          body: JSON.stringify({
            subscriptionPlanId: res.subscriptionPlanId,
          }),
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      SuccessPopUp(data.message);
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  const CancelSubscription = async (res) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.CancelSubscription}`,
        {
          method: "PUT",
          body: JSON.stringify({
            subscriptionId: res.subscriptionId,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      SuccessPopUp(data.message);
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  const CreatePaymentLink = async (res) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.CreatePaymentLink}`,
        {
          method: "POST",
          body: JSON.stringify({
            priceId: res.priceId,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      return data.data;
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  const CreateCheckoutSession = async (res) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.CreateCheckoutSession}`,
        {
          method: "POST",
          body: JSON.stringify({
            priceId: res.priceId,
            customerId: res.customerId,
            referenceId: res.referenceId,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      return data.data;
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  const CreateCustomerPortalSession = async (res) => {
    setisLoading(true);
    console.log(res);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URI}/${AuthApiRoutes.CreateCustomerPortalSession}`,
        {
          method: "POST",
          body: JSON.stringify({
            customerId: res.customerId,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      return data.data;
    } catch (error) {
      setisLoading(false);
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
    }
  };

  return {
    isLoading,
    SignUpApi,
    SignUpSSOApi,
    LoginApi,
    LoginApiSSO,
    UpdateUserData,
    GetCompanyData,
    UploadProfileImage,
    UploadLogo,
    UpdateCompanyData,
    VerifyEmail,
    ResetPassword,
    ChangePasswordApi,
    InviteUser,
    DeleteProfileImage,
    DeleteLogo,
    handleDeactiveUser,
    handleActiveUser,
    LogOutUser,
    ForgotPassword,
    SendInviteEmail,
    GetPlansDetails,
    CreatePaymentIntent,
    PaymentWebhook,
    GetActivePlanDetails,
    GetCompanyLimit,
    CancelSubscription,
    CreatePaymentLink,
    CreateCheckoutSession,
    CreateCustomerPortalSession,
  };
};

export default AuthService;
