import { Outlet, useNavigate } from "react-router-dom";
import { DfxNavBar } from "@dashflowx/ui";
import { cn, retrieveValue } from "../../utils";
import { useState } from "react";
import {
  Button,
  DropdownMenuComp,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@dashflowx/core";
import { LogOut, Settings } from "lucide-react";

const MiniClientLayout = () => {
  const navigate = useNavigate();
  const [ImageFallback, setImageFallback] = useState(true);

  const userData = retrieveValue("userData");

  return (
    <div className="bg-white">
      <DfxNavBar
        variant="basic"
        actions={
          <div className="flex items-center justify-center gap-3">
            <DropdownMenuComp>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  {ImageFallback ? (
                    <img
                      src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
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
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuLabel>
                  <div className="flex gap-1 mb-2 items-center">
                    {ImageFallback ? (
                      <img
                        src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
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
                          "mx-2 mt-2 font-medium text-[20px] capitalize text-gray-800 dark:text-gray-200",
                        )}
                      >
                        {userData?.username}
                      </h4>
                      <p
                        className={cn(
                          "mx-2 mt-1 text-[10px] font-medium text-gray-600 dark:text-gray-400",
                        )}
                      >
                        {userData?.email}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigate(`/settings`)}>
                  <Settings className="w-4 mr-2" /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    localStorage.clear();
                    navigate(`/`);
                  }}
                >
                  <LogOut className="w-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuComp>
          </div>
        }
        libraryType="react"
        logo={
          <a href="/client" className="flex justify-center">
            <img
              className={cn("w-auto h-10")}
              src={"/HireomaticLogo.png"}
              alt=""
            />
          </a>
        }
        navClassName="bg-white"
      />
      <div className="mx-8">
        <Outlet />
      </div>
    </div>
  );
};

export default MiniClientLayout;
