import {
  AlertDialog,
  Button,
  DropdownMenuComp,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Tooltip,
} from "@dashflowx/core";
import { retrieveValue } from "../../../utils";
import { Datagrid, UseDataGrid } from "@dashflowx/datagrid";
import { BsThreeDots } from "react-icons/bs";
import AuthService from "../../../Api/AuthService";
import InviteUsersForm from "../../Form/InviteUsersForm";
import { useEffect } from "react";
import { ErrorPopUp } from "../../../utils/AlearUtils";
import { Link, useNavigate } from "react-router-dom";
import { LoaderMask } from "../../Loader";
import { FcInvite } from "react-icons/fc";
import { RiUserAddFill } from "react-icons/ri";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { AiOutlineSend } from "react-icons/ai";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

const UsersDataGrid = ({ status, ModalComp, setOpenModal }) => {
  const { isLoading, handleDeactiveUser, handleActiveUser, SendInviteEmail } =
    AuthService();
  const token = retrieveValue("accessToken");
  const navigate = useNavigate();
  const { handleReload, error } = UseDataGrid();

  const columns = [
    {
      accessorKey: "username",
      header: "Name",
      size: "30%",
      cell: ({ row }: any) => {
        const { username, isDeactivated, profileImageUrl } = row.original;
        return (
          <div className="flex items-center justify-between">
            <div className="flex justify-between gap-3 w-full">
              <div className="flex items-center gap-2">
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt={username}
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                    <h1
                      className={`text-left text-sm font-semibold mb-0 ${isDeactivated ? "text-[#899198]" : ""}`}
                    >
                      {username.charAt(0).toUpperCase()}
                    </h1>
                  </div>
                )}
                <h1
                  className={`text-left text-base font-semibold mb-0 capitalize ml-2 ${isDeactivated ? "text-[#899198]" : ""}`}
                >
                  {username}
                </h1>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      disableSort: true,
      size: "20%",
      cell: ({ row }: any) => {
        const { isDeactivated } = row.original;
        return (
          <div
            className={`lowercase text-base ${isDeactivated ? "text-[#899198]" : ""}`}
          >
            {row.getValue("email")}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      disableSort: true,
      size: "20%",
      cell: ({ row }: any) => {
        const { isDeactivated } = row.original;
        return (
          <div
            className={`capitalize text-base ${isDeactivated ? "text-[#899198]" : ""}`}
          >
            {row.getValue("status")}
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Access Type",
      disableSort: true,
      size: "20%",
      cell: ({ row }: any) => {
        const { isDeactivated } = row.original;
        return (
          <div
            className={`uppercase text-base ${isDeactivated ? "text-[#899198]" : ""}`}
          >
            {row.getValue("role")}
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: "",
      disableSort: true,
      size: "10%",
      cell: ({ row }: any) => {
        const { id, isDeactivated, email, username, status } = row.original;
        return (
          <div className=" flex justify-end">
            <DropdownMenuComp>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 bg-gray-100 text-gray-700"
                >
                  <span className="sr-only">Open menu</span>
                  <BsThreeDots className="h-4 w-4 rotate-90" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                {!isDeactivated && (
                  <DropdownMenuItem
                    className="cursor-pointer text-[#4e5760] text-sm font-normal leading-tight"
                    onClick={async () => {
                      await handleDeactiveUser(id, handleReload);
                    }}
                  >
                    <RxCrossCircled className="mr-2 text-[#4E5760] w-4 h-4" />
                    Deactivate
                  </DropdownMenuItem>
                )}

                {status === "invited" && (
                  <DropdownMenuItem
                    className="cursor-pointer text-[#4e5760] text-sm font-normal leading-tight"
                    onClick={async () => {
                      await SendInviteEmail({
                        email: email,
                        username: username,
                        userId: id,
                      });
                    }}
                  >
                    <AiOutlineSend className="mr-2 text-[#4E5760] w-4 h-4" />
                    Resend Invite
                  </DropdownMenuItem>
                )}

                {!!isDeactivated && (
                  <DropdownMenuItem
                    className="cursor-pointer text-[#4e5760] text-sm font-normal leading-tight"
                    onClick={async () => {
                      await handleActiveUser(id, handleReload);
                    }}
                  >
                    <FaRegCheckCircle className="mr-2 text-[#4E5760] w-4 h-4" />
                    Activate
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenuComp>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (error?.message === "Session Expired") {
      localStorage.clear();
      navigate(`/`);
      ErrorPopUp(error.message);
    }
  }, [error]);

  return (
    <>
      {isLoading && <LoaderMask />}
      <Datagrid
        listColumns={columns}
        CardColumn={{}}
        variant="ssr"
        getApi={`${import.meta.env.VITE_API_AUTH_BASE_URI}/auth/user-list?status=${status}`}
        defaultView="list"
        unableDefaultSort={true}
        showSelectAction={false}
        auth={token}
      />
      <ModalComp
        dialogTitle="Add Users"
        dialogContentClassName="bg-white w-[1200px] max-w-screen-lg"
        dialogDescription="You are an admin and can manage all access."
        dialogContent={
          <InviteUsersForm
            setOpenModal={setOpenModal}
            handleReload={handleReload}
            status={status}
          />
        }
        dialogFooter={<></>}
      />
    </>
  );
};

export default UsersDataGrid;
