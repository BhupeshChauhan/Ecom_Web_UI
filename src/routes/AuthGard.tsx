/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";
import { retrieveValue } from "../utils";

interface Props {
  to?: string;
  children?: any;
  type:
    | "authorized"
    | "unAuthorized"
    | "admin"
    | "client"
    | "unAuthorizedClient"
    | "noAuth";
}

const AuthGard = (props: Props) => {
  const isUserLoggedIn = !!retrieveValue("isUserLoggedIn");
  const userData = retrieveValue("userData");
  if (props.type === "authorized") {
    const redirectTo = props.to ? props.to : "/sign-up";
    return !isUserLoggedIn ? (
      <Navigate to={redirectTo} replace />
    ) : (
      <>
        {userData.emailVerified ? (
          <>{props.children}</>
        ) : (
          <Navigate to="/verify-email" replace />
        )}
      </>
    );
  }
  if (props.type === "client") {
    const redirectTo = props.to ? props.to : "/sign-in";
    return isUserLoggedIn ? (
      <>
        {userData.emailVerified ? (
          <>{props.children}</>
        ) : (
          <Navigate to="/verify-email" replace />
        )}
      </>
    ) : (
      <Navigate to={redirectTo} replace />
    );
  }
  if (props.type === "unAuthorizedClient") {
    const redirectTo = props.to ? props.to : "/dashboard";
    return isUserLoggedIn && userData?.type && userData?.type === "client" ? (
      <Navigate to={redirectTo} replace />
    ) : (
      <>{props.children}</>
    );
  }
  if (props.type === "unAuthorized") {
    const redirectTo = props.to ? props.to : "/dashboard";
    return isUserLoggedIn ? (
      <Navigate to={redirectTo} replace />
    ) : (
      <>{props.children}</>
    );
  }
  if (props.type === "noAuth") {
    return <>{props.children}</>;
  }
  if (props.type === "admin") {
    const redirectTo = props.to ? props.to : "/admin/dashboard";
    return isUserLoggedIn && userData?.type && userData?.type === "admin" ? (
      <Navigate to={redirectTo} replace />
    ) : (
      <>{props.children}</>
    );
  }
};

export default AuthGard;
