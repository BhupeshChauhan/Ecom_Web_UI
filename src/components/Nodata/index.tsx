import { Button } from "@dashflowx/core";
import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface NoDataProps {}

const NoData: React.FC<NoDataProps> = () => {
  return (
    <section className="bg-white m-[10px] rounded-3xl flex items-center h-[calc(60vh)] p-16 dark:bg-gray-50 dark:text-gray-800 col-span-3">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <img src="/nodata.svg" className="w-full" />
          <p className="text-2xl font-semibold md:text-3xl">
            No jobs created yet
          </p>
          <p className="p-2 pb-4">Create your first job</p>
          <Link
            rel="noopener noreferrer"
            to="/jobs/create"
            className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
          >
            <Button variant="solid" color="primary">
              <Plus /> Create job
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export const NoDataQB = ({ setOpenModal }: any) => {
  return (
    <section className="bg-white m-[10px] rounded-3xl flex items-center h-[calc(60vh)] p-16 dark:bg-gray-50 dark:text-gray-800 col-span-3">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <img src="/nodata.svg" className="w-full" />
          <p className="text-2xl font-semibold md:text-3xl">
            No categories created yet
          </p>
          <p className="p-2 pb-4">Create your first category</p>
          <Button
            variant="solid"
            color="primary"
            onClick={() => setOpenModal(true)}
          >
            <Plus /> Create category
          </Button>
        </div>
      </div>
    </section>
  );
};

export const NoResult: React.FC<NoDataProps> = () => {
  return (
    <section className="bg-white m-[10px] rounded-3xl flex h-[300px] items-center p-16 dark:bg-gray-50 dark:text-gray-800 col-span-3">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <img src="/nodata.svg" className="w-full" />
          <p className="text-2xl font-semibold md:text-3xl">No Results Found</p>
        </div>
      </div>
    </section>
  );
};

export default NoData;
