import { DataTable, UseDataGrid } from "@dashflowx/datagrid";
import { useEffect } from "react";
import { LoaderMask } from "../Loader";

const UsageDataGrid = ({ isLoading, data }) => {
  const {
    listData,
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
    handleChangeSorting,
    handleChangeColumnFilters,
    handleChangeColumnVisibility,
    handleChangeRowSelection,
    handleChangeListData,
  } = UseDataGrid();

  const columns = [
    {
      accessorKey: "username",
      header: "Month",
      cell: ({ row }: any) => {
        const { username } = row.original;
        return (
          <div className="flex items-center justify-between">
            <div className="flex justify-between gap-3 w-full">
              <h1 className="text-left text-sm text-primary font-semibold mb-0">
                {username}
              </h1>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "AI Video Interviews",
      cell: ({ row }: any) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "New Positions",
      cell: ({ row }: any) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Resume AI Match",
      cell: ({ row }: any) => (
        <div className="uppercase">{row.getValue("role")}</div>
      ),
    },
  ];

  useEffect(() => {
    if (data) handleChangeListData(data);
  }, [data]);

  return (
    <>
      {isLoading && <LoaderMask />}
      <div>
        <div className="bg-white">
          <DataTable
            sorting={sorting}
            setSorting={handleChangeSorting}
            columnFilters={columnFilters}
            setColumnFilters={handleChangeColumnFilters}
            columnVisibility={columnVisibility}
            setColumnVisibility={handleChangeColumnVisibility}
            rowSelection={rowSelection}
            setRowSelection={handleChangeRowSelection}
            columns={columns}
            data={listData}
            searchColName="title"
            hideHeader={true}
          />
        </div>
      </div>
    </>
  );
};

export default UsageDataGrid;
