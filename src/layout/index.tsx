/* eslint-disable @typescript-eslint/no-explicit-any */
import useLogoutListener from "../utils/useLogoutListener";
import ClientLayout from "./ClientLayout";
import DashboardLayout from "./DashboardLayout";
import MiniLayout from "./Mini";
import MiniClientLayout from "./MiniClientLayout";

const Layout = ({ type }: any) => {
  useLogoutListener();

  if (type === "mini") {
    return <MiniLayout />;
  }
  if (type === "client") {
    return <ClientLayout />;
  }
  if (type === "miniClient") {
    return <MiniClientLayout />;
  }
  if (type === "DashboardLayout") {
    return <DashboardLayout />;
  }
};

export default Layout;
