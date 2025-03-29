import { useEffect } from "react";
import { Button } from "@dashflowx/core";
import { useNavigate } from "react-router-dom";
import RichTextBox from "../../../components/Form/FormFeilds/RichTextBox";
import InterviewService from "../../../Api/InterviewService";
import Loader, { LoaderMask } from "../../../components/Loader";
import { retrieveValue } from "../../../utils";
import CancelInvite from "../../../components/Job/CancelInvite";
import CompanyLogo from "../../../components/Auth/CompanyLogo";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import useModal from "../../../hooks/useModal";
import WarningPopup from "./WarningPopup";

const PreviewJobApplicant = () => {
  const {
    isLoading,
    GetJobDetails,
    GetQuestionsByInterviewId,
    GetApplicantDetails,
  } = InterviewService();
  const { openModal, setOpenModal, ModalComp } = useModal();
  const navigate = useNavigate();
  const jobDetails = retrieveValue("jobDetails");
  const applicantDetails = retrieveValue("applicantDetails");
  const interviewQuestions = retrieveValue("interviewQuestions");

  const HandleInitailData = async () => {
    await GetJobDetails();
    await GetApplicantDetails();
    await GetQuestionsByInterviewId();
  };

  useEffect(() => {
    HandleInitailData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && !applicantDetails?.interview?.isInvited) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CancelInvite />
      </div>
    );
  }

  return (
    <>
      <div>
        {isLoading && <LoaderMask />}
        <div className="bg-white shadow-lg">
          <div className="flex flex-col md:flex-row justify-between p-3 max-w-screen-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
              <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                <CompanyLogo
                  logoUrl={jobDetails?.client?.logoUrl || null}
                  companyName={jobDetails?.client?.name}
                  className="h-16 text-md w-fit p-2"
                  imageClassName="h-[80px] w-[80px] rounded-lg w-fit"
                />
                <div className="text-center md:text-left">
                  <h3 className="mb-0 font-normal">Virtual Evaluation</h3>
                  <div className="flex flex-col md:flex-row md:items-center">
                    <span>{jobDetails?.client?.name}</span>
                    <span className="hidden md:inline mx-2">•</span>
                    <span>{jobDetails?.job?.title}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center justify-center md:justify-end mt-4 md:mt-0">
              <h4>
                Powered by <span className="text-primary">Hireomatic</span>
              </h4>
            </div>
          </div>
        </div>
        <div className="bg-gray-100">
          <div className="flex flex-col lg:flex-row gap-3 max-w-screen-2xl mx-auto py-6 px-4">
            <div className="flex flex-col w-full lg:w-[60%] gap-3">
              <div className="flex flex-col md:flex-row gap-8 bg-[#fff1eb] p-4 md:p-8 rounded-lg shadow-md">
                <div className="flex justify-center mb-4 md:mb-0">
                  <img
                    alt="Illustration of documents and a medal"
                    className="w-full max-w-[400px]"
                    src="/applicantpreview.png"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-lg font-semibold mb-2">
                    Hello! This screening will cover your communication skills
                    as well as your technical skills for the role of{" "}
                    {jobDetails?.job?.title} for {jobDetails?.client?.name}
                  </h1>
                  <p className="text-gray-700 mb-4">
                    10 questions • 2 mins per question • 30 mins (at max)
                  </p>
                  <Button
                    variant="solid"
                    color="primary"
                    onClick={() => setOpenModal(true)}
                    className="w-full md:w-auto"
                  >
                    {applicantDetails?.application?.applicationStatus ===
                    "interview-pending"
                      ? "Begin Assessment"
                      : "View Assessment"}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center bg-gray-100">
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                    {jobDetails?.job?.title}
                  </h2>
                  <div className="flex flex-wrap items-center text-gray-500 mb-4">
                    <LiaMapMarkerAltSolid />
                    <span>{jobDetails?.job?.location || "Remote"}</span>
                    <span className="mx-2">•</span>
                    <span>{jobDetails?.job?.experience} years of exp.</span>
                  </div>
                  <p className="text-gray-700">{jobDetails?.job?.jobDetails}</p>
                </div>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full">
                {jobDetails?.job?.description && (
                  <RichTextBox
                    initialData={jobDetails?.job?.description}
                    isReactOnly={true}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-[40%] h-fit gap-4">
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full">
                <div className="flex flex-col md:flex-row items-center mb-4">
                  <CompanyLogo
                    logoUrl={jobDetails?.client?.logoUrl || null}
                    companyName={jobDetails?.client?.name}
                    className="h-16 text-md w-fit p-2"
                    imageClassName="h-[80px] w-[80px] rounded-lg w-fit"
                  />
                  <div className="ml-0 md:ml-4 text-center md:text-left mt-4 md:mt-0">
                    <h2 className="text-lg font-semibold">
                      {jobDetails?.client?.name}
                    </h2>
                    <a
                      href={jobDetails?.client?.websiteUrl}
                      className="text-orange-600 break-all"
                    >
                      {jobDetails?.client?.websiteUrl}
                    </a>
                  </div>
                </div>
                <p className="text-gray-700">{jobDetails?.client?.about}</p>
              </div>
              {(jobDetails?.job?.requiredSkills?.split(",").length > 1 ||
                jobDetails?.job?.optionalSkills?.split(",").length > 1) && (
                <>
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                    {jobDetails?.job?.requiredSkills?.split(",").length > 0 && (
                      <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">
                          Must have skills
                        </h2>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {jobDetails?.job?.requiredSkills
                            ?.split(",")
                            .map((Skills, i) => (
                              <span
                                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md"
                                key={i}
                              >
                                {Skills}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}
                    {jobDetails?.job?.optionalSkills?.split(",")?.length >
                      0 && (
                      <div>
                        <h2 className="text-lg font-semibold mb-2">
                          Good to have skills
                        </h2>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {jobDetails?.job?.optionalSkills
                            ?.split(",")
                            ?.map((Skills, i) => (
                              <span
                                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md"
                                key={i}
                              >
                                {Skills}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ModalComp
        dialogTitle="Heads up before starting!"
        dialogTitleClassName={
          applicantDetails?.application?.applicationStatus ===
          "interview-pending"
            ? "text-xl md:text-2xl font-semibold mb-0"
            : "hidden"
        }
        dialogContentClassName="bg-white w-full md:w-[1200px] max-w-screen-lg p-4"
        dialogDescription="Make sure you've prepared properly."
        dialogDescriptionClassName={
          applicantDetails?.application?.applicationStatus ===
          "interview-pending"
            ? "text-gray-500 mb-0"
            : "hidden"
        }
        dialogContent={
          <>
            <WarningPopup />
          </>
        }
        dialogFooter={
          applicantDetails?.application?.applicationStatus ===
          "interview-pending" ? (
            <div className="flex flex-col md:flex-row gap-3 items-center justify-end w-full mt-2">
              <Button
                variant="outline"
                className="w-full md:w-fit"
                disabled={isLoading}
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                color="primary"
                className="w-full md:w-fit"
                disabled={isLoading}
                onClick={() => {
                  navigate(
                    `/applicant/jobs/screening/${location.pathname.split("/")[3]}/interview`,
                    {
                      state: { questions: interviewQuestions },
                    },
                  );
                }}
              >
                Begin Assessment
              </Button>
            </div>
          ) : null
        }
      />
    </>
  );
};

export default PreviewJobApplicant;
