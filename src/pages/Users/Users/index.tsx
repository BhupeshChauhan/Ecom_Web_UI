import {
  Button,
  TabsComp,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@dashflowx/core";
import useModal from "../../../hooks/useModal";
import UsersDataGrid from "../../../components/Job/DataGrids/UsersDataGrid";
import { DatagridProvider } from "@dashflowx/datagrid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { cn } from "../../../utils";
import { RiUserAddFill } from "react-icons/ri";

const ClientUsers = () => {
  const { setOpenModal, ModalComp } = useModal();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (path: string) => {
    navigate(path);
  };

  const tabsArray = [
    {
      content: (
        <>
          {activeIndex === 1 && (
            <DatagridProvider>
              <UsersDataGrid
                status="all"
                ModalComp={ModalComp}
                setOpenModal={setOpenModal}
              />
            </DatagridProvider>
          )}
        </>
      ),
      id: 1,
      title: "All",
      path: "/users",
    },
    {
      content: (
        <>
          {activeIndex === 2 && (
            <DatagridProvider>
              <UsersDataGrid
                status="active"
                ModalComp={ModalComp}
                setOpenModal={setOpenModal}
              />
            </DatagridProvider>
          )}
        </>
      ),
      id: 2,
      title: "Active",
      path: "/users/active",
    },
    {
      content: (
        <>
          {activeIndex === 2 && (
            <DatagridProvider>
              <UsersDataGrid
                status="deactivated"
                ModalComp={ModalComp}
                setOpenModal={setOpenModal}
              />
            </DatagridProvider>
          )}
        </>
      ),
      id: 3,
      title: "Deactivated",
      path: "/users/deactivated",
    },
  ];

  return (
    <div>
      <div>
        <div className="flex justify-between mt-3 mx-3 mb-0 h-full">
          <h3 className="mb-0">Users</h3>
          <div className="flex gap-3">
            {/* {companyData?.name && (
            <Button
              variant="ghost"
              onClick={() => setOpenModal(true)}
              className="bg-primary/10 text-primary text-sm p-2 py-1"
            >
              <UploadCloud className="mr-2 w-4" /> Upload Job
            </Button>
          )} */}
            <Button
              variant="solid"
              color="primary"
              className="text-sm p-2 py-1"
              onClick={() => setOpenModal(true)}
            >
              <RiUserAddFill className="w-4 h-4 mr-1" /> Invite User
            </Button>
          </div>
        </div>
        <TabsComp defaultValue="account" className={cn("w-full")}>
          <TabsList className="flex items-start justify-start">
            {tabsArray.map((tab: any) => (
              <TabsTrigger
                value="account"
                key={tab.id}
                className={cn(
                  "inline-block p-4 pl-2 border-b-2 typography-h5 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 pt-2",
                  activeIndex === tab.id
                    ? "text-primary-light font-bold"
                    : "text-gray-500",
                )}
                onClick={() => handleClick(tab.path)}
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent
            value="account"
            className="w-full bg-slate-100 p-2 h-full"
          >
            {tabsArray[activeIndex - 1]?.content}
          </TabsContent>
        </TabsComp>
      </div>
    </div>
  );
};

export default ClientUsers;
