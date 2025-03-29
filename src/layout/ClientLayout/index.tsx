import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { DfxAdminLayout } from "@dashflowx/ui";
import { cn, persistValue, retrieveValue } from "../../utils";
import { useEffect, useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { RiProfileLine, RiUserSearchFill } from "react-icons/ri";
import { HiOutlineBriefcase, HiMiniUserGroup } from "react-icons/hi2";

import {
  Button,
  DropdownMenuComp,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@dashflowx/core";
import { LogOut } from "lucide-react";
import AuthService from "../../Api/AuthService";
import { CgProfile } from "react-icons/cg";
import { useMainContext } from "../../context/MainProvider";
import UnsupportedScreen from "../../pages/UnsupportedScreen";
import { InfoPopUp } from "../../utils/AlearUtils";
import { IoSettingsOutline } from "react-icons/io5";

const ClientLayout = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const { ws } = useMainContext();
  const [expanded, setexpanded] = useState(false);
  const [ImageFallback, setImageFallback] = useState(true);
  const companyData = retrieveValue("companyData");
  const token = retrieveValue("accessToken");

  const userData = retrieveValue("userData");
  const menuArrays = [
    {
      id: "1",
      title: "Dashboard",
      path: "/dashboard",
      active: pathname === "/dashboard",
      menuIcon: <MdSpaceDashboard className="w-6 h-6" />,
    },
    {
      id: "2",
      title: "Jobs",
      path: "/jobs",
      active: pathname.includes("jobs"),
      menuIcon: <HiOutlineBriefcase className="w-6 h-6" />,
    },
    {
      id: "3",
      title: "Candidates",
      path: "/candidates",
      active: pathname.includes("candidates"),
      menuIcon: <HiMiniUserGroup className="w-6 h-6" />,
    },
    // {
    //   id: "4",
    //   title: "Users",
    //   path: "/users",
    //   active: pathname === "/users",
    //   menuIcon: <RiUserSearchFill className="w-6 h-6" />,
    // },

    // {
    //   id: "4",
    //   title: "Billing",
    //   path: "/billing",
    //   active: pathname === "/billing",
    //   menuIcon: <LiaMoneyBillSolid className="w-6 h-6" />,
    // },
    {
      id: "5",
      title: "Admin",
      path: "/settings/users",
      active: pathname.includes("settings"),
      menuIcon: <IoSettingsOutline className="w-6 h-6" />,
    },
  ];

  const { isLoading, LogOutUser, GetCompanyData } = AuthService();

  const toggleExpand = () => {
    setexpanded((prev) => !prev);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setShowMessage(window.innerWidth < 1200);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!userData.profileImageUrl) {
      setImageFallback(false);
    }
  }, [userData]);

  useEffect(() => {
    if (!companyData) {
      GetCompanyData();
    }
  }, []);

  if (showMessage) {
    return (
      <div className="admin-typography">
        <UnsupportedScreen windowWidth={windowWidth} />
      </div>
    );
  }
  return (
    <div className="admin-typography">
      <DfxAdminLayout
        sidebarFooter={
          <div className="flex items-center justify-center gap-3 mb-2 border-2 rounded-full border-white">
            <DropdownMenuComp>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  {ImageFallback ? (
                    <img
                      src={userData?.profileImageUrl}
                      alt={userData?.username}
                      className="w-14 aspect-square rounded-full"
                      onError={() => setImageFallback(false)}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-8 w-14 rounded-full bg-slate-200">
                      {userData?.username?.split(" ")[0][0]}
                      {userData?.username.split(" ").length >= 2 &&
                        userData?.username?.split(" ")[1][0]}
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                side="right"
                className="bg-white"
              >
                <DropdownMenuLabel>
                  <div className="flex gap-1 items-center">
                    {ImageFallback ? (
                      <img
                        src={userData?.profileImageUrl}
                        alt={userData?.username}
                        className="w-14 aspect-square rounded-full"
                        onError={() => setImageFallback(false)}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-14 w-14 rounded-full bg-slate-200">
                        {userData?.username?.split(" ")[0][0]}
                        {userData?.username.split(" ").length >= 2 &&
                          userData?.username?.split(" ")[1][0]}
                      </div>
                    )}
                    <div>
                      <h4
                        className={cn(
                          "typography-h6 font-bold m-0 mx-2 mt-2 capitalize text-gray-800 dark:text-gray-200",
                        )}
                      >
                        {userData?.username}
                      </h4>
                      <p
                        className={cn(
                          "mx-2 typography-caption font-medium mt-0 text-gray-600 dark:text-gray-400 mb-2",
                        )}
                      >
                        {userData?.email}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuItem
                  disabled={isLoading}
                  onClick={() => {
                    navigate(`/settings`);
                  }}
                  className="typography-h6 mx-2 hover:bg-slate-100"
                >
                  <CgProfile className="w-4 mr-2" /> My Profile
                </DropdownMenuItem>
                <div className="bg-slate-300 h-[1px] m-2" />
                <DropdownMenuItem
                  disabled={isLoading}
                  onClick={() => {
                    localStorage.clear();
                    LogOutUser();
                    // Trigger the logout across all tabs
                    localStorage.setItem("logout-event", String(Date.now()));
                    // Redirect to login page
                    navigate("/");
                  }}
                  className="typography-h6 m-2 hover:bg-slate-100"
                >
                  <LogOut className="w-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuComp>
          </div>
        }
        libraryType="react"
        logo={
          expanded ? (
            <Link to="/dashboard" className="flex justify-center w-full">
              <img
                className={cn("w-auto h-10")}
                src={"/HireomaticWhite.png"}
                alt=""
              />
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className="mx-auto mb-2 bg-white rounded-full"
            >
              <img
                className={cn("w-10 h-10")}
                src={"/HireomaticFavIcon.png"}
                alt=""
              />
            </Link>
          )
        }
        expanded={expanded}
        menuArrays={menuArrays}
        toggleExpand={toggleExpand}
        menuType={Link}
        variant="five"
        hideExpant={true}
        profileImage={
          <>
            {ImageFallback ? (
              <img
                src={userData?.profileImageUrl}
                alt={userData?.username}
                className="w-8 aspect-square rounded-full"
                onError={() => setImageFallback(false)}
              />
            ) : (
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-200">
                {userData?.username?.split(" ")[0][0]}
                {userData?.username.split(" ").length >= 2 &&
                  userData?.username?.split(" ")[1][0]}
              </div>
            )}
          </>
        }
        profileName={userData?.username}
        profileDescription={userData?.email}
        profilePath="/settings"
      >
        <Outlet />
      </DfxAdminLayout>
    </div>
  );
};

export default ClientLayout;
