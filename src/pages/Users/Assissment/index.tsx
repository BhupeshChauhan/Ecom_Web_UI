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
import { ArrowLeft } from "lucide-react";
import { LoaderMask } from "../../../components/Loader";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const JobAssissment = () => {
  const [SelectedResponse, setSelectedResponse] = useState(0);
  const refScrollUp = useRef();
  const query = useQuery();
  const status = query.get("status");
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
  }, []);

  return (
    <div className="flex flex-col w-full gap-3 h-[calc(100vh-120px)] overflow-clip bg-white">
      {(isLoading || isloading1) && <LoaderMask />}
      <div ref={refScrollUp}> </div>
      <div className="flex gap-3 mx-2 items-center justify-between">
        <div className="flex flex-col">
          <span className="typography-h4 font-bold">
            How would you like to proceed with this applicant.
          </span>
          <span className="typography-h6">
            Perform your next action for this applicant.
          </span>
        </div>
        <div>
          <>
            {status === "interviewdone" && (
              <Button
                variant="outline"
                className="w-fit mr-4"
                disabled={isloading1}
                onClick={async () => {
                  await UpdateApplicationStatus({
                    interviewId: location.pathname.split("/")[5],
                    status: "shortlisted",
                  });
                  navigate(-1);
                }}
              >
                Move to next round
              </Button>
            )}
            {status !== "hired" && (
              <Button
                variant="outline"
                className="w-fit mr-4"
                disabled={isloading1}
                onClick={async () => {
                  await UpdateApplicationStatus({
                    interviewId: location.pathname.split("/")[5],
                    status: "hired",
                  });
                  navigate(-1);
                }}
              >
                Offer for this role
              </Button>
            )}
            {status !== "rejected" && (
              <Button
                variant="outline"
                className="w-fit"
                onClick={async () => {
                  await UpdateApplicationStatus({
                    interviewId: location.pathname.split("/")[5],
                    status: "rejected",
                  });
                  navigate(-1);
                }}
              >
                Reject for this role
              </Button>
            )}
          </>
        </div>
      </div>
      <div className="flex pt-2 gap-3 ">
        <div className="w-[30%] h-[calc(100vh-250px)] flex flex-col gap-3 overflow-y-auto ">
          <div className="flex flex-col border-l-4 border-l-primary p-3 rounded-lg">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white ">
              {data?.user?.users?.name}
            </h5>
            <p className="text-sm">{data?.user?.users?.email}</p>
            <div className="font-semibold mt-4">Screened For</div>
            <div className="text-sm">Role: {JobData?.title}</div>
            <div className="text-sm">
              Years of experience: {JobData?.experience}
            </div>
            <div className="text-sm">
              Required Skills:{" "}
              {JobData?.requiredSkills &&
                JobData?.requiredSkills?.split(",").map((element, index) => {
                  return (
                    <span>
                      {element}
                      {index !== JobData.requiredSkills.split(",").length - 1
                        ? ", "
                        : " "}
                    </span>
                  );
                })}
            </div>
            <div className="text-sm">
              Optional Skills:{" "}
              {JobData?.optionalSkills &&
                JobData?.optionalSkills?.split(",").map((element, index) => {
                  return (
                    <span>
                      {element}
                      {index !== JobData.optionalSkills.split(",").length - 1
                        ? ", "
                        : " "}
                    </span>
                  );
                })}
            </div>
          </div>
          <span className="mt-2 text-xl font-semibold">Recorded Responses</span>
          <div className="pt-4 mx-2 bg-slate-50">
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
        </div>
        <div className="w-[70%] h-[calc(100vh-250px)] overflow-y-auto scroll">
          {data?.questions ? (
            <div className="h-full">
              <div className="flex gap-3 p-5 text-start w-full">
                <div className="text-2xl">{SelectedResponse + 1}.</div>
                <div className="w-full">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white ">
                    {data?.questions[SelectedResponse]?.question}
                  </h5>
                  <div className="flex gap-3 justify-between  mt-8">
                    {/* <p>Score: {data?.questions[SelectedResponse]?.score}</p> */}
                    <div>
                      <Badge
                        textContent={
                          data?.questions[SelectedResponse]?.difficulty
                        }
                        type="span"
                        variant="default"
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[70%] w-full">
                <ReactPlayer
                  controls
                  url={data?.questions[SelectedResponse]?.videoUrl}
                  width={"100%"}
                  height={"50vh"}
                />
                {data?.questions[SelectedResponse]?.answer && (
                  <div className="flex">
                    Transcript:
                    {data?.questions[SelectedResponse]?.answer}
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

export default JobAssissment;
