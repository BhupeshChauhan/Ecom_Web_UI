import { useState } from "react";
import { InverviewApiRoutes, JobsApiRoutes } from "../utils/Routes";
import { ErrorPopUp } from "../utils/AlearUtils";
import { persistValue, retrieveValue } from "../utils";
import { useNavigate } from "react-router-dom";

const InterviewService = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const token = retrieveValue("accessToken");

  async function GetJobDetails() {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_INTERVIEW_BASE_URI}/${InverviewApiRoutes.getJobDetails}${location.pathname.split("/")[3]}/job-details`,
        {
          method: "GET", // or 'POST', 'PUT', etc.
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (data.data.job) {
        persistValue("jobDetails", data.data);
      }
      setData(data.data);
      setisLoading(false);
    } catch (error) {
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
      setisLoading(false);
    }
  }

  async function GetApplicantDetails() {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_INTERVIEW_BASE_URI}/${InverviewApiRoutes.GetApplicantDetails}${location.pathname.split("/")[3]}/applicant-details`,
        {
          method: "GET", // or 'POST', 'PUT', etc.
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (data.data) {
        persistValue("applicantDetails", data.data);
      }
      setData(data.data);
      setisLoading(false);
    } catch (error) {
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
      setisLoading(false);
    }
  }

  const GetQuestionsByInterviewId = async () => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_INTERVIEW_BASE_URI}/${InverviewApiRoutes.GetQuestions}${location.pathname.split("/")[3]}`,
        {
          method: "GET", // or 'POST', 'PUT', etc.
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (data.data) {
        persistValue("interviewQuestions", data.data);
      }
      setData(data.data);
      setisLoading(false);
    } catch (error) {
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
      setisLoading(false);
    }
  };

  const AudioUploadAPI = async (res) => {
    const formData = new FormData();
    formData.append("file", res.blob, "recorded_audio.webm");
    formData.append("duration", res.duration.toString());
    formData.append("questionSetId", res.currentQuestion?.id.toString());
    formData.append("interviewId", location.pathname.split("/")[4]);

    if (res.isLastQuestion) {
      formData.append("isLastQuestion", res.isLastQuestion);
    }

    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_INTERVIEW_BASE_URI}/${InverviewApiRoutes.SaveAudio}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          body: formData,
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
    } catch (error) {
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
      setisLoading(false);
    }
  };

  const VideoUploadAPI = async (res) => {
    const formData = new FormData();
    formData.append("file", res.blob, "recorded_video.mp4");
    formData.append("questionSetId", res.currentQuestion!.id.toString());
    formData.append("interviewId", location.pathname.split("/")[4]);
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_INTERVIEW_BASE_URI}/${InverviewApiRoutes.SaveVideo}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          body: formData,
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
    } catch (error) {
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
      setisLoading(false);
    }
  };

  const InterviewComplete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_INTERVIEW_BASE_URI}/${InverviewApiRoutes.InterviewComplete}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          body: JSON.stringify({
            interviewId: location.pathname.split("/")[4],
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
    } catch (error) {
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
      setisLoading(false);
    }
  };

  const StartInterview = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_INTERVIEW_BASE_URI}/${InverviewApiRoutes.startInterview}`,
        {
          method: "PUT", // or 'POST', 'PUT', etc.
          body: JSON.stringify({
            interviewId: location.pathname.split("/")[4],
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
    } catch (error) {
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
      setisLoading(false);
    }
  };

  //currently urls point to jobs, but keep it here as we will move this back to interview service
  const GetAssessmentReport = async () => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_INTERVIEW_BASE_URI}/${JobsApiRoutes.InterviewReport}${location.pathname.split("/")[6]}/view`,
        {
          method: "GET", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setData(data.data);
      setisLoading(false);
    } catch (error) {
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
      setisLoading(false);
    }
  };

  const DownloadAssessmentReport = async () => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_INTERVIEW_BASE_URI}/${InverviewApiRoutes.InterviewReport}${location.pathname.split("/")[6]}/download`,
        {
          method: "GET", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
          },
        },
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      data.aiReportUrl = responseData.data;
      setData(data);
      setisLoading(false);
    } catch (error) {
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
      setisLoading(false);
    }
  };

  return {
    isLoading,
    data,
    GetJobDetails,
    GetApplicantDetails,
    GetQuestionsByInterviewId,
    AudioUploadAPI,
    VideoUploadAPI,
    InterviewComplete,
    GetAssessmentReport,
    StartInterview,
    DownloadAssessmentReport,
  };
};

export default InterviewService;
