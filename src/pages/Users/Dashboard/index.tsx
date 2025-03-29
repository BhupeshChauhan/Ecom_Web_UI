import { FC, useEffect } from "react";
import { LoaderMask } from "../../../components/Loader";
import {
  BarChartCard,
  LineChartCard,
  FeatureUsageCard,
  Header,
  StatCard,
  TodoCard,
  UpgradeBanner,
} from "../../../components/Dashboard";
import { Link } from "react-router-dom";
import { DatagridProvider } from "@dashflowx/datagrid";
import DashboardDataGrid from "../../../components/DataGrid/DashboardDataGrid";
import AnalyticsService from "../../../Api/AnalyticsService";
import { retrieveValue } from "../../../utils";
import JobsDataGrid from "../../../components/Job/DataGrids/JobsDataGrid";
import AppsDataGrid from "../../../components/DataGrid/AppsDataGrid";

// we can comment out the params that we don't need
export const DASHBOARD_ANALYTICS_PARAMS = {
  TOTAL_APPLICATIONS: "tot_appl",
  PENDING_REVIEWS: "pen_revi",
  APPLIED_JOBS: "appl_jobs",
  TOTAL_ASSESSMENTS: "tot_asse",
  ASSESSMENT_DISTRIBUTION: "asse_distr",
  RESUME_DISTRIBUTION: "resu_distr",
  INTERVIEW_PERFORMANCE: "intr_perf",
  ACTIVE_JOBS: "actv_jobs",
  INTERVIEW_USAGE: "intr_usg",
  JD_USAGE: "jd_usg",
  REPORT_USAGE: "rep_usg",
  RESUME_USAGE: "resu_usg",
} as const;

const ClientDashboard: FC = () => {
  const { isLoading, data, DashboardAnalytics } = AnalyticsService();
  const userData = retrieveValue("userData");

  // useEffect(() => {
  //   DashboardAnalytics(Object.values(DASHBOARD_ANALYTICS_PARAMS).join(","));
  // }, []);
  return (
    <div>
      {isLoading && <LoaderMask />}

      <div className="h-[calc(100vh-50px)] px-2 relative bg-neutral-50 rounded-lg mx-4 overflow-y-auto">
        <Header title={userData.username} />
        <DatagridProvider>
              <AppsDataGrid />
            </DatagridProvider>

        {/* <div className="h-[100%] mt-4 flex-col justify-start items-start gap-4 inline-flex">
          <div className="self-stretch justify-start items-start gap-4 inline-flex">
            <div className="w-[70%] flex-col justify-start items-start gap-4 inline-flex">
              
              <div className="justify-start items-start gap-4 inline-flex w-[100%]">
                {data &&
                  data.summary?.length &&
                  data.summary?.map((item, index) => (
                    <StatCard
                      key={index}
                      title={item.title}
                      value={item.count}
                      change={item.change}
                      changeType={item.changeType || ""}
                      subtitle={item.subtitle || ""}
                    />
                  ))}
              </div>

              
              <div className="justify-start items-start gap-4 inline-flex w-[100%]">
                {data?.graphData?.assessmentScoreDistribution && (
                  <BarChartCard
                    data={data?.graphData?.assessmentScoreDistribution}
                    title="Assessment score distribution"
                  />
                )}
                {data?.graphData?.interviewPerformanceDistribution && (
                  <LineChartCard
                    data={data?.graphData?.interviewPerformanceDistribution}
                    title="Interview performances"
                    percentage="80%"
                  />
                )}
                {data?.graphData?.resumeMatchDistribution && (
                  <BarChartCard
                    data={data?.graphData?.resumeMatchDistribution}
                    title="Resume match distribution"
                  />
                )}
              </div>

              
              {data?.activeJobs?.listData &&
                data?.activeJobs?.listData.length && (
                  <>
                    <div className="justify-between items-start gap-4 inline-flex w-[100%]">
                      <div className="p-0 font-semibold">Active jobs</div>
                      <div className="p-0 text-sm text-[#4E5760]">
                        You have{" "}
                        <span className="font-semibold">
                          {data?.activeJobs?.total}
                        </span>{" "}
                        jobs open total{" "}
                        <span className="font-semibold underline cursor-pointer">
                          <Link to="/jobs">see all</Link>
                        </span>
                      </div>
                    </div>
                    <div className="justify-start items-start gap-4 inline-flex w-[100%]">
                      <DatagridProvider>
                        <DashboardDataGrid
                          isLoading={false}
                          data={data?.activeJobs?.listData}
                        />
                      </DatagridProvider>
                    </div>
                  </>
                )}
            </div>

            {!isLoading && (
              <div className="w-[30%] flex-col justify-start items-start gap-2 inline-flex">
                <div className="self-stretch h-[626px] flex-col justify-start items-start gap-4 flex">
                  <TodoCard data={data?.summary} />
                  <UpgradeBanner />
                  <FeatureUsageCard data={data?.usage} />
                </div>
              </div>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ClientDashboard;
