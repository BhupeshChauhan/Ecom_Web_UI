import { useEffect, useState } from "react";

import { TabsComp, TabsContent, TabsList, TabsTrigger } from "@dashflowx/core";
import { DatagridProvider } from "@dashflowx/datagrid";
import { cn } from "../../../utils";
import ApplicationDataGrid from "../../../components/Job/DataGrids/ApplicationDataGrid";

const CandidateList = () => {
  const [activeCandidateTab, handleCandidateTabChange] = useState(1);

  const tabsArray = [
    {
      content: (
        <>
          {activeCandidateTab === 1 && (
            <DatagridProvider>
              <ApplicationDataGrid />
            </DatagridProvider>
          )}
        </>
      ),
      id: 1,
      title: "",
      path: "/jobs/active",
    },
  ];

  return (
    <div>
      <div className="flex justify-between mt-3 mx-3 mb-0">
        <h3 className="mb-0">Candidates</h3>
      </div>
      <TabsComp defaultValue="account" className={cn("w-full")}>
        <TabsList className="flex items-start justify-start">
          {tabsArray.map((tab: any) => (
            <TabsTrigger
              value="account"
              key={tab.id}
              className={cn(
                "inline-block p-4 pl-2 border-b-2 typography-h5 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 pt-2",
                activeCandidateTab === tab.id
                  ? "text-primary-light font-bold"
                  : "text-gray-500",
              )}
              onClick={() => handleCandidateTabChange(tab.id)}
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="account" className="w-full bg-slate-100 p-2">
          {tabsArray[activeCandidateTab - 1]?.content}
        </TabsContent>
      </TabsComp>
    </div>
  );
};

export default CandidateList;
