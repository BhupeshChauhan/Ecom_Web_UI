import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routesConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-image-crop/dist/ReactCrop.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { JobFormProvider } from "./context/JobFormProvider";
import { MainProvider } from "./context/MainProvider";

function App() {
  const router = createBrowserRouter([...routes]);

  return (
    <div className="bg-bgcolor-light dark:bg-bgcolor-dark admin-typography">
      <GoogleOAuthProvider clientId="969837305276-0o28k09k27lbumss8i5nrlvdv3v44rfs.apps.googleusercontent.com">
        <ToastContainer />
        <MainProvider>
          <JobFormProvider>
            <RouterProvider router={router} />
          </JobFormProvider>
        </MainProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
