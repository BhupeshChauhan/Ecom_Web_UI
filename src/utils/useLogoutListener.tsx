import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { retrieveValue } from ".";

const useLogoutListener = () => {
  const navigate = useNavigate();
  const token = retrieveValue("accessToken");

  useEffect(() => {
    const logInListener = (event) => {
      if (event.key === "accessToken") {
        // Redirect to dashboard page
        navigate("/dashboard");
      }
    };
    window.addEventListener("storage", logInListener);
    return () => {
      window.removeEventListener("storage", logInListener);
    };
  }, [token]);

  useEffect(() => {
    const logoutListener = (event) => {
      if (event.key === "logout-event") {
        // Perform logout action (e.g., clear tokens, redirect to login)
        console.log("Logging out from all tabs...");
        // Clear any authentication tokens, and redirect to login page
        localStorage.clear();
        // Redirect to login page
        navigate("/");
      }
    };

    // Add event listener for 'storage' events
    window.addEventListener("storage", logoutListener);

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener("storage", logoutListener);
    };
  }, [navigate]);
};

export default useLogoutListener;
