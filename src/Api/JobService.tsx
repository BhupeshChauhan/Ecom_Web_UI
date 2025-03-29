import { useNavigate } from "react-router-dom";
import { retrieveValue } from "../utils";
import { useState } from "react";
import { JobsApiRoutes } from "../utils/Routes";
import { ErrorPopUp, SuccessPopUp } from "../utils/AlearUtils";

const JobService = (
  JobFormData = null,
  LocationType = null,
  JdDataAI = null,
  optionalSkillsArray = null,
  requiredSkillsArray = null,
  handleJobTabChange = null,
  ResetData = null,
  visibility = null,
) => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const token = retrieveValue("accessToken");

  async function handlePublishJob() {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.PublishJob}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          body: JSON.stringify({
            status: "active",
            location:
              LocationType === "Remote"
                ? "Remote"
                : LocationType === "On-site"
                  ? `On-site - ${JobFormData.location}`
                  : LocationType === "Hybrid"
                    ? `Hybrid - ${JobFormData.location}`
                    : null,
            title: JobFormData.title,
            experience: JobFormData.experience,
            description: JdDataAI,
            jobDetails: JobFormData.jobDetails,
            requiredSkills: requiredSkillsArray
              .map((Skills) => Skills.value)
              .join(", "),
            optionalSkills: optionalSkillsArray
              .map((Skills) => Skills.value)
              .join(", "),
            visibility: visibility ? "public" : "private",
          }),
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      navigate("/jobs");
      handleJobTabChange(1);
      SuccessPopUp(data.message);
      ResetData();
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

  async function handleSaveJob() {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.PublishJob}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          body: JSON.stringify({
            status: "draft",
            location:
              LocationType === "Remote"
                ? "Remote"
                : LocationType === "On-site"
                  ? `On-site - ${JobFormData.location}`
                  : LocationType === "Hybrid"
                    ? `Hybrid - ${JobFormData.location}`
                    : null,
            title: JobFormData.title,
            experience: JobFormData.experience,
            description: JdDataAI,
            jobDetails: JobFormData.jobDetails,
            requiredSkills: requiredSkillsArray
              .map((Skills) => Skills.value)
              .join(", "),
            optionalSkills: optionalSkillsArray
              .map((Skills) => Skills.value)
              .join(", "),
          }),
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      navigate("/jobs");
      handleJobTabChange(3);
      ResetData();
      SuccessPopUp(data.message);
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

  async function handleUpdateJob() {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.UpdateJob}`,
        {
          method: "PUT", // or 'POST', 'PUT', etc.
          body: JSON.stringify({
            jobId: location.pathname.split("/")[3],
            jobDetails: {
              location:
                LocationType === "Remote"
                  ? "Remote"
                  : LocationType === "On-site"
                    ? `On-site - ${JobFormData.location}`
                    : LocationType === "Hybrid"
                      ? `Hybrid - ${JobFormData.location}`
                      : null,
              title: JobFormData.title,
              experience: JobFormData.experience,
              description: JdDataAI,
              jobDetails: JobFormData.jobDetails,
              requiredSkills: requiredSkillsArray
                .map((Skills) => Skills.value)
                .join(", "),
              optionalSkills: optionalSkillsArray
                .map((Skills) => Skills.value)
                .join(", "),
            },
          }),
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      navigate(`/jobs/jobdetails/${location.pathname.split("/")[3]}`);
      ResetData();
      SuccessPopUp(data.message);
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

  const GenerateJDApi = async (
    mounted,
    requiredSkillsArray,
    optionalSkillsArray,
    handleJdDataAIChange,
  ) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.GenerateJD}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
          body: JSON.stringify({
            jobTitle: JobFormData.title,
            experience: JobFormData.experience,
            requiredSkills: requiredSkillsArray.map(
              (element) => `${element.value}`,
            ),
            optionalSkills: optionalSkillsArray.map(
              (element) => `${element.value}`,
            ),
            description: JobFormData.jobDetails,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      handleJdDataAIChange(data.data.data);
      mounted.current = true;
      SuccessPopUp(data.message);
      setisLoading(false);
    } catch (error) {
      mounted.current = true;
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
      setisLoading(false);
    }
  };

  const DownloadCSV = async () => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.DownloadCSV}`,
        {
          method: "GET", // or 'POST', 'PUT', etc.
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: any = await response.blob();
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(data);
      link.download = "job_template";

      // Append the link to the document
      document.body.appendChild(link);
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
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

  const DownloadAiAssement = async (interviewId) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.downloadAiAssesment}/${interviewId}/download`,
        {
          method: "GET", // or 'POST', 'PUT', etc.
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        },
      );
      console.log("RESPONSE", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data.data);

      window.open(data.data, "_blank");
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

  const DownloadResume = async (applicationId) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.downloadResume}/${applicationId}`,
        {
          method: "GET", // or 'POST', 'PUT', etc.
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      window.open(data.data.trim(), "_blank");
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

  const CloseJobApi = async (id, handleReload) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.ChangeStatus}`,
        {
          method: "PUT", // or 'POST', 'PUT', etc.
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
          body: JSON.stringify({ status: "closed", jobIds: `${id}` }),
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      SuccessPopUp(data.message);
      setisLoading(false);
      handleReload(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/jobs/list-jobs?status=active`,
        token,
      );
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

  const OpenJobApi = async (id, handleReload) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.ChangeStatus}`,
        {
          method: "PUT", // or 'POST', 'PUT', etc.
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
          body: JSON.stringify({ status: "active", jobIds: `${id}` }),
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      SuccessPopUp(data.message);
      setisLoading(false);
      handleReload(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/jobs/list-jobs?status=closed`,
        token,
      );
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

  const PublishJobApi = async (id, handleReload) => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.ChangeStatus}`,
        {
          method: "PUT", // or 'POST', 'PUT', etc.
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
          body: JSON.stringify({ status: "active", jobIds: `${id}` }),
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      SuccessPopUp(data.message);
      setisLoading(false);
      handleReload(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/jobs/list-jobs?status=draft`,
        token,
      );
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

  const UploadJobApi = async (
    selectedFiles,
    setSelectedFiles,
    setError,
    handleReload,
    setOpenModal,
  ) => {
    setisLoading(true);
    try {
      // Create a JobFormData object
      const formData = new FormData();
      formData.append("file", selectedFiles[0]);
      // Make the request to the API
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.UploadCSV}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
          body: formData,
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setSelectedFiles([]);
      setError("");
      SuccessPopUp(data.message);
      setisLoading(false);
      handleReload(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/jobs/list-jobs?status=active`,
        token,
      );
      setOpenModal(false);
    } catch (error) {
      setOpenModal(false);
      setError("");
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
      setisLoading(false);
    }
  };

  async function DashboardStats() {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.DashboardStats}`,
        {
          method: "GET", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
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
  }

  async function GetJobDetails() {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.GetJobDetails}${location.pathname.split("/")[3]}`,
        {
          method: "GET",
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
      return data.data;
    } catch (error) {
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
      setisLoading(false);
      throw error;
    }
  }

  const UploadResume = async (
    selectedFiles,
    setSelectedFiles,
    setError,
    setOpenModal,
  ) => {
    setisLoading(true);
    try {
      // Create a JobFormData object
      const formData = new FormData();
      // formData.append("file", selectedFiles);
      // console.log(selectedFiles);
      selectedFiles.forEach((file) => {
        formData.append("file", file);
      });
      formData.append("jobId", location.pathname.split("/")[3]);
      // Make the request to the API
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.UploadResume}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
          body: formData,
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setSelectedFiles([]);
      setError("");
      SuccessPopUp(data.message);
      setisLoading(false);
      setOpenModal(false);
    } catch (error) {
      setOpenModal(false);
      setError("");
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
      setisLoading(false);
    }
  };

  const ReuploadResume = async (
    selectedFiles,
    setSelectedFiles,
    setError,
    setOpenModal,
    applicationId,
  ) => {
    setisLoading(true);
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("file", file);
      });
      formData.append("applicationId", applicationId);

      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/jobs/reupload/resume}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      setSelectedFiles([]);
      setError("");
      SuccessPopUp(data.message);
      setisLoading(false);
      setOpenModal(false);
    } catch (error) {
      setOpenModal(false);
      setError("");
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
      setisLoading(false);
    }
  };

  async function GetApplicantDetails() {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.GetApplicantDetails}${location.pathname.split("/")[5]}`,
        {
          method: "GET", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
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
  }

  async function GetCandidateDetails(applicationId) {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.GetApplicantDetails}${applicationId}`,
        {
          method: "GET", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
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
  }

  async function UpdateApplicantDetails(res) {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.UpdateApplicantDetails}`,
        {
          method: "PUT", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            applicationId: `${location.pathname.split("/")[5]}`,
            data: {
              name: res.name,
              designation: res.designation,
              email: res.email,
              phone: res.phone,
              experience: res.experience,
            },
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      SuccessPopUp(data.message);
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

  async function UpdateCandidateDetails(res) {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.UpdateApplicantDetails}`,
        {
          method: "PUT", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            applicationId: `${location.pathname.split("/")[2]}`,
            data: {
              name: res.name,
              designation: res.designation,
              email: res.email,
              phone: res.phone,
              experience: res.experience,
              skills: res.skills,
              workExperience: res.workExperience,
              education: res.education,
            },
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      SuccessPopUp(data.message);
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

  async function AddQuestion(res) {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.AddQuestion}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobId: `${location.pathname.split("/")[3]}`,
            questions: res,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      SuccessPopUp(data.message);
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

  async function UpdateQuestionDetails(res) {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.UpdateQuestionDetails}`,
        {
          method: "PUT", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...res,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      SuccessPopUp(data.message);
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

  async function DeleteQuestion(id) {
    alert("delete question called");
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.UpdateQuestionDetails}`,
        {
          method: "DELETE", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: id,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      SuccessPopUp(data.message);
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

  async function AddQuestionQB(res) {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.AddQuestionQB}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...res }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      SuccessPopUp(data.message);
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

  async function AddCategoryQB(res) {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.AddCategoryQB}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...res }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      SuccessPopUp(data.message);
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

  async function UpdateQuestionDetailsQB(res) {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.UpdateQuestionDetailsQB}/${res.id}`,
        {
          method: "PUT", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...res,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      SuccessPopUp(data.message);
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

  async function DeleteQuestionQB(id) {
    alert("delete question called");
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.DeleteQuestionQB}/${id}`,
        {
          method: "DELETE", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: id,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      SuccessPopUp(data.message);
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

  const SendApplicantInvite = async (res) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.sendInvite}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobId: res.jobId,
            applicationId: res.applicationId,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      SuccessPopUp(data.message);
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

  const SendApplicantBulkInvite = async (res) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.bulkSendInvite}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobId: res.jobId,
            applicantId: res.applicantId,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      SuccessPopUp(data.message);
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

  const CancelInviteStatus = async (res) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.CancelInviteStatus}`,
        {
          method: "PUT", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            applicationId: res.applicationId,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      SuccessPopUp(data.message);
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

  const UpdateJobStatus = async (res) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.UpdateJobStatus}`,
        {
          method: "POST", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobIds: res.jobId.toString(),
            status: res.status,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      SuccessPopUp(data.message);
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

  const UpdateApplicationStatus = async (res) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.UpdateApplicationStatus}`,
        {
          method: "PUT", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            applicationIds: String(res.applicationId),
            applicationStatus: res.status,
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

  async function GetAllApplications() {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.GetAllApplications}`,
        {
          method: "GET", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            // Include authentication token if needed
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
  }

  async function GetQuestionBank(page = 1, limit = 10) {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.GetQuestionBank}?page=${page}&limit=${limit}`,
        {
          method: "GET",
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
  }

  async function UpdateCategoryQB(res) {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.UpdateCategoryQB}/${res.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            category: res.category,
            description: res.description,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      SuccessPopUp(data.message);
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

  async function DeleteCategoryQB(id, handleReload) {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.DeleteCategoryQB}/${id}`,
        {
          method: "DELETE",
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
      setisLoading(false);
      SuccessPopUp(data.message);
      handleReload(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/jobs/question-categories?`,
        token,
      );
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

  async function GetAssessmentConfig(jobId?) {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.GetAssessmentConfig}${jobId ? `?jobId=${jobId}` : ''}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setData(data.data);
      setisLoading(false);
      return data.data;
    } catch (error) {
      if (error.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
      ErrorPopUp(error.message);
      setisLoading(false);
      throw error;
    }
  }

  async function UpdateAssessmentConfig(config) {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_JOB_BASE_URI}/${JobsApiRoutes.UpdateAssessmentConfig}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            numQuestions: config.numQuestions,
            questionDurationMin: config.questionDurationMin,
            behavioralPercentage: config.behavioralPercentage,  
            technicalPercentage: config.technicalPercentage,
            ...(config.jobId && { jobId: config.jobId }),
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setisLoading(false);
      SuccessPopUp(data.message);
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

  return {
    isLoading,
    data,
    handlePublishJob,
    handleSaveJob,
    GenerateJDApi,
    DownloadCSV,
    CloseJobApi,
    UploadJobApi,
    GetJobDetails,
    DashboardStats,
    UploadResume,
    GetApplicantDetails,
    UpdateApplicantDetails,
    SendApplicantInvite,
    UpdateJobStatus,
    CancelInviteStatus,
    OpenJobApi,
    PublishJobApi,
    handleUpdateJob,
    UpdateQuestionDetails,
    DeleteQuestion,
    AddQuestion,
    UpdateApplicationStatus,
    SendApplicantBulkInvite,
    DownloadAiAssement,
    DownloadResume,
    GetAllApplications,
    GetCandidateDetails,
    UpdateCandidateDetails,
    ReuploadResume,
    GetQuestionBank,
    AddQuestionQB,
    UpdateQuestionDetailsQB,
    DeleteQuestionQB,
    AddCategoryQB,
    UpdateCategoryQB,
    DeleteCategoryQB,
    GetAssessmentConfig,
    UpdateAssessmentConfig,
  };
};

export default JobService;
