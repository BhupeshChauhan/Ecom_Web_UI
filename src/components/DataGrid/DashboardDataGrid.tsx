import { DataTable, UseDataGrid } from "@dashflowx/datagrid";
import { useEffect } from "react";
import { LoaderMask } from "../Loader";

const DashboardDataGrid = ({ isLoading, data }) => {
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
      accessorKey: "id",
      header: "Job ID",
      cell: ({ row }: any) => {
        const { id } = row.original;
        return (
          <div className="flex items-center justify-between">
            <div className="flex justify-between gap-3 w-full">
              <h1 className="text-left text-sm font-semibold mb-0">{id}</h1>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }: any) => (
        <div className="capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "experience",
      header: "Experience",
      cell: ({ row }: any) => (
        <div className="capitalize">{row.getValue("experience")}</div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }: any) => (
        <div className="capitalize">{row.getValue("location")}</div>
      ),
    },

    {
      accessorKey: "applied",
      header: "Applied",
      cell: ({ row }: any) => (
        <div className="uppercase">{row.getValue("applied") || 0}</div>
      ),
    },

    {
      accessorKey: "pending",
      header: "Pending",
      cell: ({ row }: any) => (
        <div className="uppercase">{row.getValue("pending") || 0}</div>
      ),
    },
  ];

  useEffect(() => {
    if (data) handleChangeListData(data);
  }, [data]);

  return (
    <>
      {isLoading && <LoaderMask />}
      <div className="w-[100%]">
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

export default DashboardDataGrid;
