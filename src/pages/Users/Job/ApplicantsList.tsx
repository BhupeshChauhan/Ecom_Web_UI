import { Button, TabsComp, TabsContent, TabsList, TabsTrigger } from "@dashflowx/core";
import { useLocation } from "react-router-dom";
import { DatagridProvider } from "@dashflowx/datagrid";
import { cn } from "../../../utils";
import { useEffect, useState } from "react";
import JobHeader from "../../../components/Job/Header";
import JobService from "../../../Api/JobService";
import { LoaderMask } from "../../../components/Loader";
import { useJobFormContext } from "../../../context/JobFormProvider";
import ApplicantDataGrid from "../../../components/Job/DataGrids/ApplicantDataGrid";
import { JobProvider } from "../../../context/JobProvider";
import useModal from "../../../hooks/useModal";
import QuestionSettingsForm from "../../../components/Form/QuestionSettingsForm";

const ApplicantsList = ({ showHeader = true }) => {
  const location = useLocation();
  const { activeApplicantTab, handleApplicantTabChange } = useJobFormContext();
  const { isLoading, GetJobDetails, GetAssessmentConfig } = JobService();
  const { openModal, setOpenModal, ModalComp } = useModal();

  const [data, setData] = useState<any>(null);
  const [assessmentConfig, setAssessmentConfig] = useState<any>(null);

  const tabsArray = [
    {
      content: (
        <>
          {activeApplicantTab === 1 && (
            <DatagridProvider>
              <JobProvider>
                <ApplicantDataGrid
                  GetJobDetails={GetJobDetails}
                  status="applied"
                />
              </JobProvider>
            </DatagridProvider>
          )}
        </>
      ),
      id: 1,
      title: `Applied - ${data?.applicationStats?.applied | 0}`,
      path: `/jobs/${location.pathname.split("/")[2]}/applied`,
    },
    {
      content: (
        <>
          {activeApplicantTab === 2 && (
            <DatagridProvider>
              <ApplicantDataGrid
                GetJobDetails={GetJobDetails}
                status="interview-pending"
              />
            </DatagridProvider>
          )}
        </>
      ),
      id: 2,
      title: `Evalution Pending - ${data?.applicationStats?.["interview-pending"] | 0}`,
      path: `/jobs/${location.pathname.split("/")[2]}/interviewpending`,
    },
    {
      content: (
        <>
          {activeApplicantTab === 3 && (
            <DatagridProvider>
              <ApplicantDataGrid
                GetJobDetails={GetJobDetails}
                status="interviewdone"
              />
            </DatagridProvider>
          )}
        </>
      ),
      id: 3,
      title: `Evalution Done - ${data?.applicationStats?.["interview-done"] | 0}`,
      path: `/jobs/${location.pathname.split("/")[2]}/interviewdone`,
    },
    {
      content: (
        <>
          {activeApplicantTab === 4 && (
            <DatagridProvider>
              <ApplicantDataGrid
                GetJobDetails={GetJobDetails}
                status="rejected"
              />
            </DatagridProvider>
          )}
        </>
      ),
      id: 4,
      title: `Rejected - ${data?.applicationStats?.rejected | 0}`,
      path: `/jobs/${location.pathname.split("/")[2]}/rejected`,
    },
    {
      content: (
        <>
          {activeApplicantTab === 5 && (
            <DatagridProvider>
              <ApplicantDataGrid
                GetJobDetails={GetJobDetails}
                status="shortlisted"
              />
            </DatagridProvider>
          )}
        </>
      ),
      id: 5,
      title: `Shortlisted - ${data?.applicationStats?.shortlisted | 0}`,
      path: `/jobs/${location.pathname.split("/")[2]}/shortlisted`,
    },
  ];

  useEffect(() => {
    GetJobDetails().then((jobData) => {
      setData(jobData);
      GetAssessmentConfig(jobData?.id).then((configData) => {
        console.log("configData", configData);
        setAssessmentConfig(configData);
      });
    });
  }, []);

  return (
    <div className="bg-gray-100">
      {isLoading && <LoaderMask />}
      {showHeader && <JobHeader data={data} handleSettingModal={()=>setOpenModal(true)} />}
      <div className="px-8">
        <TabsComp defaultValue="account" className={cn("w-full")}>
          <TabsList className="flex items-start justify-start">
            {tabsArray.map((tab: any) => (
              <TabsTrigger
                value="account"
                key={tab.id}
                className={cn(
                  "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 typography-h4",
                  activeApplicantTab === tab.id
                    ? "text-primary-light font-bold"
                    : "text-gray-500",
                )}
                onClick={() => {
                  handleApplicantTabChange(tab.id);
                  GetJobDetails();
                }}
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="account" className="w-full">
            {tabsArray[activeApplicantTab - 1]?.content}
          </TabsContent>
        </TabsComp>
      </div>

      <ModalComp
        dialogTitle={`AI Assessment Config for ${data?.title}`}
        dialogContentClassName="bg-white w-[1200px] max-w-screen-lg"
        dialogDescription="Updating job specific assessment config will override the default config.  "
        dialogContent={
          <>
            <QuestionSettingsForm
                  setOpenModal={setOpenModal}
                  data={{...assessmentConfig, jobId: data?.id}}
                  type={"full"}
                  onSave={() => {
                    setOpenModal(false);
                    GetAssessmentConfig(data?.id).then((configData) => {
                      console.log("configData", configData);
                      setAssessmentConfig(configData);
                    });
                  }}
                />
          </>
        }
        dialogFooter={null}
      />
    </div>
  );
};

export default ApplicantsList;
