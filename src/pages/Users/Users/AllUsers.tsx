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

const AllUsers = () => {
  const { setOpenModal, ModalComp } = useModal();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="relative">
      <Button
        variant="solid"
        color="primary"
        className="text-sm py-2 absolute right-2 top-2"
        onClick={() => setOpenModal(true)}
      >
        Add users
      </Button>

      <DatagridProvider>
        <UsersDataGrid
          status="all"
          ModalComp={ModalComp}
          setOpenModal={setOpenModal}
        />
      </DatagridProvider>
    </div>
  );
};

export default AllUsers;
