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
      <GoogleOAuthProvider clientId="154191125521-se91foak4vd9elnvvmprj7nssp8kvhh9.apps.googleusercontent.com">
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
