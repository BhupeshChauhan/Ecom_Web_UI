import { Badge, Button } from "@dashflowx/core";
import { DfxCardGrid, DfxPageHead } from "@dashflowx/ui";
import { useEffect, useRef, useState } from "react";
import { assessmentData } from "../../../Data//constData";
import { cn } from "../../../utils";
import RecordedResponsesCard from "../../../components/Job/Cards/RecordedResponsesCard";
import JobService from "../../../Api/JobService";
import InterviewService from "../../../Api/InterviewService";
import ReactPlayer from "react-player";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoaderMask } from "../../../components/Loader";
import cloudImage from "../../../assets/cloud.png";
import trophyImage from "../../../assets/trophy.png";
import softskillsImage from "../../../assets/softskills.png";

const CustomSVG = () => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 24.68H24V0.68H0V24.68Z" fill="black" />
  </svg>
);

const StatusBadge = ({ type = "success", children }) => {
  const baseClasses =
    "px-3 py-1 rounded-md text-sm font-medium inline-flex items-center justify-center";

  const typeStyles = {
    success: "bg-badge-green text-green-900",
    error: "bg-badge-red text-red-900",
    warning: "bg-badge-yellow text-yellow-900",
    info: "bg-badge-blue text-sky-800	",
  };

  return (
    <span
      className={`${baseClasses} ${typeStyles[type] || typeStyles.success}`}
    >
      {children}
    </span>
  );
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const JobAssessment = () => {
  const query = useQuery();
  const questionIndex = parseInt(query.get("q"), 10) || 0; // Default to 0 if 'q' is missing
  const [SelectedResponse, setSelectedResponse] = useState(questionIndex);
  const refScrollUp = useRef();
  const status = query.get("status");
  const [viewAiSummary, setViewAiSummary] = useState(false);
  const [aiReportUrl, setAiReportUrl] = useState("");
  const navigate = useNavigate();
  const {
    isLoading: isloading1,
    data: JobData,
    GetJobDetails,
    UpdateApplicationStatus,
  } = JobService();
  const { isLoading, data, GetAssessmentReport } = InterviewService();

  useEffect(() => {
    GetAssessmentReport();
    GetJobDetails();

    return () => {
      setAiReportUrl("");
    };
  }, []);

  return (
    <div
      className="flex flex-col w-full gap-3 h-[calc(100vh)] overflow-clip bg-white"
      style={{ backgroundColor: "#FAFAFA" }}
    >
      {(isLoading || isloading1) && <LoaderMask />}
      <div className="flex justify-between py-2 px-3 shadow-lg mb-2">
        <div className="flex gap-3 items-center justify-center p-3">
          <Link to="/jobs">
            <h4 className="mb-0 font-normal">Jobs</h4>
          </Link>
          <>{">"}</>
          <Link
            to={`/jobs/jobdetails/${window.location.pathname.split("/")[3]}`}
          >
            <h4 className="mb-0 font-normal">Jobs Details</h4>
          </Link>
          <>{">"}</>
          <h3 className="mb-0">AI Assessment Report</h3>
        </div>
        <div className="flex gap-1 items-center ">
          {status !== "rejected" && (
            <Button
              variant="ghost"
              className="w-fit mr-2 px-2 py-1 border-red-500 text-red-500 bg-red-500/20"
              onClick={async () => {
                await UpdateApplicationStatus({
                  applicationId: location.pathname.split("/")[7],
                  status: "rejected",
                });

                navigate(-1);
              }}
            >
              <span className="text-sm p-1">Reject Candidate</span>
            </Button>
          )}

          {status === "interviewdone" && (
            <Button
              variant="ghost"
              className="w-fit mr-2 px-2 py-1 border-green-700 text-green-700 bg-green-700/20"
              onClick={async () => {
                await UpdateApplicationStatus({
                  applicationId: location.pathname.split("/")[7],
                  status: "shortlisted",
                });
                navigate(-1);
              }}
            >
              <span className="text-sm p-1">Shortlist Candidate</span>
            </Button>
          )}

          <Button
            variant="solid"
            color="primary"
            className="w-fit px-2 py-1"
            onClick={async () => {
              window.open(data?.test?.aiReportUrl, "_blank");
            }}
          >
            <span className="text-sm p-1">Download Report</span>
          </Button>
        </div>
      </div>

      {/* <div ref={refScrollUp}> </div> */}

      {/* start */}
      <div className="flex pt-2 ml-4 gap-3 ">
        <div className="w-[55%] h-[calc(100vh-100px)] flex flex-col gap-3 overflow-y-auto pb-[100px]">
          <div className="flex gap-3 mx-0 items-center justify-between">
            <div className="flex flex-col">
              <span className="typography-h3 font-normal m-0">
                AI Assessment Report for{" "}
                <span className="font-bold">{data?.candidate?.name}</span>
              </span>
              <span className="typography-h6">
                Role - {JobData?.title} ({JobData?.experience} Years )
              </span>
            </div>
            {/* paste here */}
          </div>
          <span className="mt-2 text-lg font-semibold">Screening Summary</span>
          <div className="flex flex-row gap-3">
            <div
              className="border border-gray-200 h-[90px] w-[200px] rounded-lg flex flex-row justify-start p-2 items-center bg-white"
              style={{ borderColor: "var(--border-border-default, #E3EAEE)" }}
            >
              <div
                className="flex justify-center items-center"
                style={{
                  height: "40px",
                  width: "40px",
                  backgroundColor: "#F8F8F8",
                  borderRadius: "99px",
                }}
              >
                <img
                  src={cloudImage}
                  style={{ height: "24px", width: "24px" }}
                  alt="cloud"
                />
              </div>
              <div className="flex flex-col pl-2">
                <span className="text-sm text-[#899198]">{"Questions"}</span>
                <span className="text-2xl text-gray-800 font-regular">
                  {data?.test?.totalQuestions}
                </span>
              </div>
            </div>

            <div
              className="border border-gray-200 h-[90px] w-[200px] rounded-lg flex flex-row justify-start p-2 items-center bg-white"
              style={{ borderColor: "var(--border-border-default, #E3EAEE)" }}
            >
              <div
                className="flex justify-center items-center"
                style={{
                  height: "40px",
                  width: "40px",
                  backgroundColor: "#F8F8F8",
                  borderRadius: "99px",
                }}
              >
                <img
                  src={trophyImage}
                  style={{ height: "24px", width: "24px" }}
                  alt="cloud"
                />
              </div>
              <div className="flex flex-col pl-2">
                <span className="text-sm text-[#899198]">{"Score"}</span>
                <span className="text-2xl text-gray-800 font-regular">
                  {data?.test?.percentage || ""}%
                </span>
              </div>
            </div>

            <div
              className="border border-gray-200 h-[90px] w-[200px] rounded-lg flex flex-row justify-start p-2 items-center bg-white"
              style={{ borderColor: "var(--border-border-default, #E3EAEE)" }}
            >
              <div
                className="flex justify-center items-center"
                style={{
                  height: "40px",
                  width: "40px",
                  backgroundColor: "#F8F8F8",
                  borderRadius: "99px",
                }}
              >
                <img
                  src={softskillsImage}
                  style={{ height: "24px", width: "24px" }}
                  alt="cloud"
                />
              </div>
              <div className="flex flex-col pl-2">
                <span className="text-sm text-[#899198]">
                  {"Language skills"}
                </span>
                <span className="text-xl text-gray-800 font-regular">
                  {data?.test?.communicationScore}
                </span>
              </div>
            </div>

            {/* <div className="border border-gray-200 h-[80px] w-[120px] rounded-lg flex flex-col justify-center items-center shadow-md">
              <span className="text-sm text-gray-800">{"Score"}</span>
              <span
                className={cn(
                  Number(data?.test?.unformattedScore) < 41
                    ? "text-[#D74544]"
                    : Number(data?.test?.unformattedScore) > 40 &&
                        Number(data?.test?.unformattedScore) < 70
                      ? "text-[#EF7B2A]"
                      : "text-[#458946]",
                  "text-xl font-semibold",
                )}
              >
                {data?.test?.score}
              </span>
            </div> */}

            {/* <div className="border border-gray-200 h-[80px] w-[120px] rounded-lg flex flex-col justify-center items-center shadow-md">
              <span className="text-sm text-gray-800">{"Percentage"}</span>
              <span className="text-xl text-gray-800 font-semibold">
                {data?.test?.percentage || "0"}%
              </span>
            </div> */}

            {/* <div className="border border-gray-200 h-[80px] pl-4 pr-4 rounded-lg flex flex-col justify-center items-center shadow-md">
              <span className="text-sm text-gray-800">{"Communication"}</span>
              <span className="text-xl text-gray-800">
                {data?.test?.communicationScore}
              </span>
            </div> */}
          </div>

          <span className="mt-2 text-lg font-semibold">
            AI Interview Summary
          </span>
          <div className="flex flex-row gap-1">
            {data?.test?.summaryTags &&
              JSON.parse(data?.test?.summaryTags).map((element, index) => {
                return (
                  <StatusBadge
                    type={element.trait ? "success" : "error"}
                    key={index}
                  >
                    {element.title}
                  </StatusBadge>
                );
              })}
          </div>
          <div
            className="border border-gray-200 rounded-lg flex flex-row justify-start p-2 items-center bg-white mr-2"
            style={{ borderColor: "var(--border-border-default, #E3EAEE)" }}
            // className="bg-[#F9F9F9] text-[#333333] p-4 text-base rounded-lg mr-2"
          >
            <span>{data?.test?.overallSummary || "NA"}</span>
          </div>

          <span className="mt-2 text-xl font-semibold">Recorded Responses</span>
          <div className="mr-2">
            {data?.questions ? (
              <DfxCardGrid
                cardsArray={data?.questions?.map((element, index) => {
                  return {
                    element: (
                      <RecordedResponsesCard
                        refScrollUp={refScrollUp}
                        index={index}
                        element={element}
                        setSelectedResponse={setSelectedResponse}
                        SelectedResponse={SelectedResponse}
                      />
                    ),
                    id: 1,
                    contentClassName: "p-0",
                  };
                })}
                gridClassName="grid-cols-1 md:grid-cols-1 lg:grid-cols-1"
                cardClassName="p-0"
              />
            ) : null}
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="text-sm m-0">
              Completion Date -{" "}
              <span className="text-black">
                {data?.test?.testCompletionDate}
              </span>
            </p>
            <p className="text-sm">
              Time -{" "}
              <span className="text-black">
                {data?.test?.interviewStartTime} -{" "}
                {data?.test?.interviewEndTime}
              </span>
            </p>
          </div>
        </div>
        {/* end */}
        <div className="w-[45%] h-[calc(100vh-100px)] overflow-y-auto pb-[100px] bg-white">
          {data?.questions ? (
            <div className="h-full">
              <div className="flex gap-3 text-start w-full">
                {/* <div className="text-xl">{SelectedResponse + 1}.</div> */}
                <div className="w-full">
                  <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white ">
                    {SelectedResponse + 1}.
                    <span className="ml-2">
                      {data?.questions[SelectedResponse]?.question}
                    </span>
                    <span className="ml-2">
                      <StatusBadge
                        type={
                          data?.questions[SelectedResponse]?.difficulty ===
                          "Easy"
                            ? "success"
                            : data?.questions[SelectedResponse]?.difficulty ===
                                "Moderate"
                              ? "warning"
                              : "error"
                        }
                      >
                        {data?.questions[SelectedResponse]?.difficulty}
                      </StatusBadge>
                    </span>
                  </h5>
                  <div className="flex gap-2">
                    {/* <StatusBadge type="info">
                      Time Spent:{" "}
                      {data?.questions[SelectedResponse]?.formattedDuration}
                    </StatusBadge> */}
                    <span className="text-sm text-[#4E5760] flex flex-row gap-1">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 5V10H13.75M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                          stroke="#899198"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Time Spent:{" "}
                      {data?.questions[SelectedResponse]?.formattedDuration}
                    </span>
                    {/* <StatusBadge
                      type={
                        data?.questions[SelectedResponse]?.score >= 7
                          ? "success"
                          : data?.questions[SelectedResponse]?.score < 7 &&
                              data?.questions[SelectedResponse]?.score >= 5
                            ? "warning"
                            : "error"
                      }
                    >
                      Score: {data?.questions[SelectedResponse]?.formattedScore}
                    </StatusBadge> */}
                    {/* <p>Score: {data?.questions[SelectedResponse]?.score}</p> */}
                    {/* <p>Score: {data?.questions[SelectedResponse]?.score}</p> */}
                  </div>
                  <div
                    className={cn(
                      data?.questions[SelectedResponse]?.score >= 7
                        ? "text-green-900"
                        : data?.questions[SelectedResponse]?.score < 7 &&
                            data?.questions[SelectedResponse]?.score >= 5
                          ? "text-yellow-900"
                          : "text-red-900",
                      "text-lg font-semibold",
                    )}
                  >
                    {data?.questions[SelectedResponse]?.formattedScore}
                  </div>
                </div>
              </div>
              <div className="h-[70%] w-full">
                <ReactPlayer
                  controls
                  url={data?.questions[SelectedResponse]?.videoUrl}
                  width={"100%"}
                  height={"40vh"}
                />
                <div className="w-full flex flex-row justify-between">
                  <div className="mb-2 mt-2 font-medium flex flex-row gap-2 self-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_151_4952)">
                        <path
                          d="M3.75033 18.3337V14.167M3.75033 5.83366V1.66699M1.66699 3.75033H5.83366M1.66699 16.2503H5.83366M10.8337 2.50033L9.38851 6.25771C9.1535 6.86874 9.036 7.17425 8.85327 7.43123C8.69132 7.65899 8.49232 7.85798 8.26456 8.01993C8.00758 8.20266 7.70207 8.32017 7.09104 8.55518L3.33366 10.0003L7.09104 11.4455C7.70207 11.6805 8.00758 11.798 8.26456 11.9807C8.49232 12.1427 8.69132 12.3417 8.85327 12.5694C9.036 12.8264 9.1535 13.1319 9.38851 13.7429L10.8337 17.5003L12.2788 13.7429C12.5138 13.1319 12.6313 12.8264 12.8141 12.5694C12.976 12.3417 13.175 12.1427 13.4028 11.9807C13.6597 11.798 13.9652 11.6805 14.5763 11.4455L18.3337 10.0003L14.5763 8.55518C13.9652 8.32017 13.6597 8.20266 13.4028 8.01993C13.175 7.85798 12.976 7.65899 12.814 7.43123C12.6313 7.17425 12.5138 6.86874 12.2788 6.25771L10.8337 2.50033Z"
                          stroke="#4E5760"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_151_4952">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Transcript{" "}
                    <span className="text-sm font-normal text-gray-400">
                      (AI)
                    </span>
                  </div>
                  <div
                    onClick={() => setViewAiSummary(!viewAiSummary)}
                    className={cn(
                      viewAiSummary
                        ? "bg-badge-blue text-sky-900"
                        : "bg-badge-yellow text-yellow-900",
                      "mb-2 mt-2 mr-4 p-1 text-sm border rounded flex flex-row pl-2 pr-2 cursor-pointer",
                    )}
                  >
                    {!viewAiSummary ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V6C0 4.33333 0.583333 2.91667 1.75 1.75C2.91667 0.583333 4.33333 0 6 0H12C13.6667 0 15.0833 0.583333 16.25 1.75C17.4167 2.91667 18 4.33333 18 6V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18H2ZM2 16H16V6C16 4.9 15.6083 3.95833 14.825 3.175C14.0417 2.39167 13.1 2 12 2H6C4.9 2 3.95833 2.39167 3.175 3.175C2.39167 3.95833 2 4.9 2 6V16ZM6 9C5.45 9 4.97917 8.80417 4.5875 8.4125C4.19583 8.02083 4 7.55 4 7C4 6.45 4.19583 5.97917 4.5875 5.5875C4.97917 5.19583 5.45 5 6 5C6.55 5 7.02083 5.19583 7.4125 5.5875C7.80417 5.97917 8 6.45 8 7C8 7.55 7.80417 8.02083 7.4125 8.4125C7.02083 8.80417 6.55 9 6 9ZM12 9C11.45 9 10.9792 8.80417 10.5875 8.4125C10.1958 8.02083 10 7.55 10 7C10 6.45 10.1958 5.97917 10.5875 5.5875C10.9792 5.19583 11.45 5 12 5C12.55 5 13.0208 5.19583 13.4125 5.5875C13.8042 5.97917 14 6.45 14 7C14 7.55 13.8042 8.02083 13.4125 8.4125C13.0208 8.80417 12.55 9 12 9ZM4 16V14C4 13.45 4.19583 12.9792 4.5875 12.5875C4.97917 12.1958 5.45 12 6 12H12C12.55 12 13.0208 12.1958 13.4125 12.5875C13.8042 12.9792 14 13.45 14 14V16H12V14H10V16H8V14H6V16H4Z"
                          fill="#785708"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 16H12V14H4V16ZM4 12H12V10H4V12ZM2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H10L16 6V18C16 18.55 15.8042 19.0208 15.4125 19.4125C15.0208 19.8042 14.55 20 14 20H2ZM9 7V2H2V18H14V7H9Z"
                          fill="#00467D"
                        />
                      </svg>
                    )}

                    <span className="ml-1">
                      View {!viewAiSummary ? "AI Summary" : "Transcript"}
                    </span>
                  </div>
                </div>
                {viewAiSummary ? (
                  <div className="bg-badge-yellow text-[#333333] p-4 text-base rounded-lg mr-2">
                    <span>
                      {data?.questions[SelectedResponse]?.aiScoreSummary ||
                        "NA"}
                    </span>
                  </div>
                ) : (
                  <div className="bg-[#F9F9F9] text-[#333333] p-4 text-base rounded-lg mr-2">
                    <span>
                      {data?.questions[SelectedResponse]?.answer || "NA"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default JobAssessment;

{
  /* <div className="flex">
  <>
    {status !== "rejected" && (
      <Button
        variant="outline"
        className="w-fit mr-2 px-2 py-1 border-red-500 text-red-500"
        onClick={async () => {
          await UpdateApplicationStatus({
            interviewId: location.pathname.split("/")[5],
            status: "rejected",
          });
          navigate(-1);
        }}
      >
        <svg
          width="32"
          height="30"
          viewBox="0 -4 40 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <rect width="40" height="30" fill="url(#pattern0_2_116)" />
          <defs>
            <pattern
              id="pattern0_2_116"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlinkHref="#image0_2_116"
                transform="matrix(0.00616776 0 0 0.0078125 0.105263 0)"
              />
            </pattern>
            <image
              id="image0_2_116"
              width="128"
              height="128"
              xlinkHref="data:image/png;base64,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"
            />
          </defs>
        </svg>

        <span className="ml-2 text-sm">Reject Candidate</span>
      </Button>
    )}

    {status === "interviewdone" && (
      <Button
        variant="outline"
        className="w-fit mr-2 px-2 py-1 border-green-700 text-green-700"
        onClick={async () => {
          await UpdateApplicationStatus({
            interviewId: location.pathname.split("/")[5],
            status: "rejected",
          });
          navigate(-1);
        }}
      >
        <svg
          width="36"
          height="25"
          viewBox="0 2 40 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <rect width="40" height="30" fill="url(#pattern0_2_118)" />
          <defs>
            <pattern
              id="pattern0_2_118"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlinkHref="#image0_2_118"
                transform="matrix(0.0056516 0 0 0.0078125 0.138298 0)"
              />
            </pattern>
            <image
              id="image0_2_118"
              width="128"
              height="128"
              xlinkHref="data:image/png;base64,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"
            />
          </defs>
        </svg>

        <span className="ml-2 text-sm">Shortlist Candidate</span>
      </Button>
    )}

    <Button
      variant="outline"
      className="w-fit px-2 py-1"
      onClick={async () => {
        window.open(data?.test?.aiReportUrl, "_blank");
      }}
    >
      <svg
        width="20"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V11H2V14H14V11H16V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16H2Z"
          fill="#FF622D"
        />
      </svg>

      <span className="ml-2 text-sm">Download Report</span>
    </Button>
  </>
</div>; */
}
