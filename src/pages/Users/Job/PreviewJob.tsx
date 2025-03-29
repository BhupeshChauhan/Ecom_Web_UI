import { useEffect } from "react";
import { Button } from "@dashflowx/core";
import { Link, useNavigate } from "react-router-dom";
import RichTextBox from "../../../components/Form/FormFeilds/RichTextBox";
import JobService from "../../../Api/JobService";
import CompanyLogo from "../../../components/Auth/CompanyLogo";
import { retrieveValue } from "../../../utils";
import { LoaderMask } from "../../../components/Loader";
import { LiaMapMarkerAltSolid } from "react-icons/lia";

const PreviewJob = ({ type }) => {
  const { isLoading, data, GetJobDetails } = JobService();
  const navigate = useNavigate();

  const companyData = retrieveValue("companyData");
  useEffect(() => {
    GetJobDetails();
  }, []);

  console.log(data?.requiredSkills?.split(",").length);

  return (
    <div className="bg-gray-100 h-full">
      {isLoading && <LoaderMask />}
      <div className="flex justify-between pt-3 px-3 shadow-lg mb-2 bg-white">
        <div className="flex gap-3 items-center justify-center p-3">
          <Link to="/jobs">
            <h4 className="mb-0 font-normal">Jobs</h4>
          </Link>
          <>{">"}</>
          <Link
            to={`/jobs/jobdetails/${window.location.pathname.split("/")[3]}`}
          >
            <h4 className="mb-0 font-normal">Jobs Details</h4>
          </Link>
          <>{">"}</>
          <h3 className="mb-0">Preview</h3>
        </div>
        <div className="flex gap-3 items-center ">
          <Button
            variant="ghost"
            className="w-fit mr-4 h-fit"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
      <div>
        <div className="flex gap-3  max-w-screen-2xl mx-auto my-6">
          <div className="flex flex-col w-[60%] gap-3">
            <div className="flex items-center justify-center  bg-gray-100">
              <div className="bg-white p-6 rounded-lg shadow-md w-full">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {data?.title}
                </h2>
                <div className="flex items-center text-gray-500 mb-4">
                  <LiaMapMarkerAltSolid />
                  <span>{data?.location || "Remote"}</span>
                  <span className="mx-2">•</span>
                  <span>{data?.experience} years of exp.</span>
                </div>
                <p className="text-gray-700">{data.jobDetails}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
              {data?.description && (
                <RichTextBox
                  initialData={data?.description}
                  isReactOnly={true}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col w-[40%] h-fit gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
              <div className="flex items-center mb-4">
                <CompanyLogo
                  logoUrl={companyData?.logoUrl || null}
                  companyName={companyData.name}
                  className="h-16 text-md w-fit p-2"
                  imageClassName="h-[80px] w-[80px] rounded-lg w-fit"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{companyData.name}</h2>
                  <a href={companyData?.websiteUrl} className="text-orange-600">
                    {companyData?.websiteUrl}
                  </a>
                </div>
              </div>
              <p className="text-gray-700">{companyData.about}</p>
            </div>
            {(data?.requiredSkills?.split(",").length > 1 ||
              data?.optionalSkills?.split(",").length > 1) && (
              <>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  {data?.requiredSkills?.split(",").length > 0 && (
                    <div className="mb-4">
                      <h2 className="text-lg font-semibold mb-2">
                        Must have skills
                      </h2>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {data?.requiredSkills?.split(",").map((Skills, i) => (
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
                  {data?.optionalSkills?.split(",")?.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">
                        Good to have skills
                      </h2>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {data?.optionalSkills?.split(",")?.map((Skills, i) => (
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
  );
};

export default PreviewJob;
