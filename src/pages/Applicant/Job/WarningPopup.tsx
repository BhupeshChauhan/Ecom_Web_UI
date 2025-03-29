import { CheckCircle, XCircle } from "lucide-react";
import { useRef } from "react";
import { BsCheckCircle } from "react-icons/bs";
import Webcam from "react-webcam";
import { retrieveValue } from "../../../utils";

const WarningPopup = () => {
  const webcamRef = useRef<Webcam>(null);
  const applicantDetails = retrieveValue("applicantDetails");

  if (
    applicantDetails?.application?.applicationStatus !== "interview-pending"
  ) {
    return (
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md text-center max-w-md mx-auto">
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-primary" />
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold mb-2">Congratulations!</h1>
        <p className="text-base sm:text-lg mb-4 sm:mb-6">You Have Completed the Interview</p>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
          Thank you for taking the time to complete our AI assessment interview.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-3">
      <div className="bg-white w-full lg:w-[50%]">
        <div className="p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 mb-4 sm:mb-6 bg-[#D7F1EA33]">
          <h2 className="text-base sm:text-lg font-semibold mb-2">Do's</h2>
          <ul className="list-none space-y-2">
            <li className="flex items-center">
              <BsCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
              <span className="text-xs sm:text-sm">
                Ensure you have a stable internet connection.
              </span>
            </li>
            <li className="flex items-start">
              <BsCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
              <span className="text-xs sm:text-sm">
                Use a device with a working camera and microphone.
              </span>
            </li>
            <li className="flex items-start">
              <BsCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
              <span className="text-xs sm:text-sm">
                Test your equipment before the interview to avoid technical
                issues.
              </span>
            </li>
            <li className="flex items-start">
              <BsCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
              <span className="text-xs sm:text-sm">
                Choose a quiet, well-lit space free from distractions.
              </span>
            </li>
            <li className="flex items-start">
              <BsCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
              <span className="text-xs sm:text-sm">
                Use a neutral background to maintain a professional appearance.
              </span>
            </li>
          </ul>
        </div>
        <div className="p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 bg-[#FFEAEB33]">
          <h2 className="text-base sm:text-lg font-semibold mb-2">Don'ts</h2>
          <ul className="list-none space-y-2">
            <li className="flex items-center">
              <XCircle className="text-red-500 mr-2 w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">
                Connect any external device to your primary device.
              </span>
            </li>
            <li className="flex items-start">
              <XCircle className="text-red-500 mr-2 w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">
                Refresh screen, change tab or window during test.
              </span>
            </li>
            <li className="flex items-start">
              <XCircle className="text-red-500 mr-2 w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">
                Make any unnecessary eye or body movement.
              </span>
            </li>
            <li className="flex items-start">
              <XCircle className="text-red-500 mr-2 w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">Interrupt during assessment.</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full lg:w-[50%] mt-4 lg:mt-0">
        <Webcam
          muted={true}
          mirrored={true}
          audio={true}
          ref={webcamRef}
          className="rounded-md border border-gray-200 shadow-sm w-full"
        />
      </div>
    </div>
  );
};

export default WarningPopup;
