import { useNavigate } from "react-router-dom";
import { retrieveValue } from "../utils";
import { useState } from "react";
import { AnalyticsApiRoutes, JobsApiRoutes } from "../utils/Routes";
import { ErrorPopUp, SuccessPopUp } from "../utils/AlearUtils";

const AnalyticsService = (analyticsParams = null) => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const token = retrieveValue("accessToken");

  async function DashboardAnalytics(analyticsParams: string) {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_ANALYTICS_BASE_URI}/${AnalyticsApiRoutes.DashboardAnalytics}?params=${analyticsParams}`,
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
      console.log("data", data.data);
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
  return {
    isLoading,
    data,
    DashboardAnalytics,
  };
};

export default AnalyticsService;
