import { Link } from "react-router-dom";
import CandidateDetailsForm from "../../../components/Form/CandidateDetailsForm";

const EditCandidateDetails = () => {
  return (
    <div className="bg-[#FAFAFA] h-full">
      <div className="flex justify-between py-2 px-3 shadow-lg mb-6 bg-white">
        <div className="flex gap-3 items-center justify-center p-3">
          <Link to="/candidates">
            <h4 className="mb-0 font-normal">Candidates</h4>
          </Link>
          <>{">"}</>
          <h3 className="mb-0">Candidate details</h3>
        </div>
      </div>
      <div className="flex w-full">
        <CandidateDetailsForm />
      </div>
    </div>
  );
};

export default EditCandidateDetails;
