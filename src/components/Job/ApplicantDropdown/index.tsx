import { Link } from "react-router-dom";

const ApplicantDropdown = ({
  ImageFallback,
  profileImageUrl,
  name,
  setImageFallback,
  designation,
  applicationId,
}) => {
  return (
    <>
      <div className="flex items-center justify-between min-w-[300px]">
        <div className="flex gap-3">
          {ImageFallback ? (
            <img
              src={profileImageUrl}
              alt={name}
              className="w-14 aspect-square rounded-full"
              onError={() => setImageFallback(false)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-14 w-14 rounded-full bg-slate-200">
              {name && name?.split(" ")[0][0]}
              {name && name.split(" ")[1] ? name.split(" ")[1][0] : ""}
            </div>
          )}
          <Link
            to={`/jobs/${applicationId}/applicant/edit/${location.pathname.split("/")[3]}`}
          >
            <div>
              <h1 className="text-left text-lg text-primary font-semibold mb-0">
                {name ? (
                  name
                ) : (
                  <div className="h-3 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                )}
              </h1>
              <p className="text-left text-xs">
                {designation ? (
                  designation
                ) : (
                  <div className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                )}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ApplicantDropdown;
