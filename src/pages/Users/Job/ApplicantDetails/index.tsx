import { Link } from "react-router-dom";
import CandidateDetailsForm from "../../../../components/Form/CandidateDetailsForm";

const ApplicantDetails = () => {
  return (
    <div className="bg-gray-200 h-full">
      <div className="flex justify-between py-2 px-3 shadow-lg mb-6 bg-white">
        <div className="flex gap-3 items-center justify-center p-3">
          <Link to="/jobs">
            <h4 className="mb-0 font-normal">Jobs</h4>
          </Link>
          <>{">"}</>
          <Link
            to={`/jobs/jobdetails/${window.location.pathname.split("/")[2]}`}
          >
            <h4 className="mb-0 font-normal">Job Details</h4>
          </Link>
          <>{">"}</>
          <h3 className="mb-0">Edit Applicant</h3>
        </div>
      </div>
      <div className="flex w-full">
        <CandidateDetailsForm />
      </div>
    </div>
  );
};

export default ApplicantDetails;
