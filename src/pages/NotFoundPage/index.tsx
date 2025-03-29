import { Button } from "@dashflowx/core";
import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = () => {
  return (
    <section className="bg-white m-[10px] rounded-3xl flex items-center h-[calc(100vh-20px)] p-16 dark:bg-gray-50 dark:text-gray-800">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
            <img src="/nodata.svg" className="w-full" />
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            No jobs created yet
          </p>
          <p className="mt-4 mb-8 dark:text-gray-600">Create your first job</p>
          <Link
            rel="noopener noreferrer"
            to="/dashboard"
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

export default NotFoundPage;
