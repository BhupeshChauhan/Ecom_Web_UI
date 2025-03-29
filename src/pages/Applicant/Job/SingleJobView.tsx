import { useEffect } from "react";
import { Button } from "@dashflowx/core";
import { useNavigate } from "react-router-dom";
import PointerWise from "../../../components/Job/PointersWise";
import { doList, dontList } from "../../../Data//constData";
import Colors from "../../../utils/Colors";
import Loader from "../../../components/Loader";
import { retrieveValue } from "../../../utils";
import InterviewService from "../../../Api/InterviewService";
import AssessmentHeader from "../../../components/Assessment/Header";

const SingleJobPost = () => {
  const navigate = useNavigate();
  const jobDetails = retrieveValue("jobDetails");
  const applicantDetails = retrieveValue("applicantDetails");
  const interviewQuestions = retrieveValue("interviewQuestions");

  const {
    isLoading,
    GetJobDetails,
    GetQuestionsByInterviewId,
    GetApplicantDetails,
  } = InterviewService();

  const HandleInitailData = async () => {
    await GetJobDetails();
    await GetApplicantDetails();
    await GetQuestionsByInterviewId();
  };

  useEffect(() => {
    {
      !applicantDetails &&
        !interviewQuestions &&
        !jobDetails &&
        HandleInitailData();
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex items-center flex-col min-h-screen w-full bg-white rounded-lg p-4 md:p-8 lg:p-12">
      <div className="flex w-full max-w-7xl flex-col px-4 md:px-8 lg:px-16">
        <AssessmentHeader
          jobDetails={jobDetails}
          Colors={Colors}
          applicantDetails={applicantDetails}
        />

        {applicantDetails?.application?.applicationStatus !==
          "interview-pending" && (
          <>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2 text-primary">
              Congratulations! You Have Completed the Interview
            </h1>
            <h2 className="text-lg md:text-xl lg:text-2xl text-gray-800 mt-4">
              Thank you for taking the time to complete our AI assessment
              interview.
            </h2>
          </>
        )}
        {applicantDetails?.application?.applicationStatus ===
          "interview-pending" && (
          <>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <div className="px-4 py-2 text-primary text-base md:text-lg border border-primary rounded-lg">
                • 10 Questions
              </div>
              <div className="px-4 py-2 text-primary text-base md:text-lg border border-primary rounded-lg">
                • 2 minutes per question
              </div>
              <div className="px-4 py-2 text-primary text-base md:text-lg border border-primary rounded-lg">
                • Approx 30 mins
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <PointerWise title={"Do's"} list={doList} theme={"default"} />
              <PointerWise title={"Dont's"} list={dontList} theme={"error"} />
            </div>
            <div className="flex mt-6">
              <Button
                variant="solid"
                color="primary"
                onClick={() => {
                  navigate(
                    `/applicant/jobs/screening/${location.pathname.split("/")[4]}/interview`,
                    {
                      state: { questions: interviewQuestions },
                    },
                  );
                }}
              >
                Start Interview
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleJobPost;
