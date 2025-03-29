import { retrieveValue } from "../../../utils";

const CancelInvite = () => {
  const jobDetails = retrieveValue("jobDetails");
  return (
    <div
      className="completion-screen flex flex-col item-center justify-center text-center font-sans p-6 bg-white h-full w-full"
      style={{ height: "100%" }}
    >
      <div className="text-center max-w-xl mx-auto">
        <div className="text-orange-500 mb-4">
          <i className="fas fa-link fa-2x"></i>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Interview Link Expired
        </h1>
        <p className="text-gray-700 mb-4">
          The interview link you attempted to access is no longer valid as it
          has expired. We apologize for any inconvenience this may cause. To
          reschedule your interview or if you need further assistance, please
          reach out to our support team at{" "}
          <span className="text-orange-500">
            {jobDetails?.clientDetails?.companyEmail}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CancelInvite;
