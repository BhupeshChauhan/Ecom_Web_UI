import { Button } from "@dashflowx/core";
import { useNavigate } from "react-router-dom";
import PointerWise from "../../../components/Job/PointersWise";
import { doList, dontList } from "../../../Data//constData";
import { RoutesUtil } from "../../../utils/Routes";
import Colors from "../../../utils/Colors";
import CompanyLogo from "../../../components/Auth/CompanyLogo";
import { retrieveValue } from "../../../utils";

const JobGettingStarted = () => {
  const companyData = retrieveValue("jobDetails");
  const navigate = useNavigate();
  return (
    <div className="flex justify-between flex-col bg-white px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 lg:py-16 min-h-screen">
      <div className="flex w-full flex-col items-start">
        <div className="flex flex-col sm:flex-row justify-between w-full items-center border-b-1 gap-4 sm:gap-0">
          <CompanyLogo
            logoUrl={companyData?.clientDetails?.logoUrl || null}
            companyName={companyData?.clientDetails?.name}
            className="h-12 sm:h-16 text-md w-fit p-2"
            imageClassName="h-[60px] sm:h-[80px] w-[60px] sm:w-[80px] rounded-lg w-fit"
          />
          <div className="flex flex-col items-center sm:items-end">
            <div className="text-2xl sm:text-3xl font-bold">
              Virtual Evaluation
            </div>
            <div className="text-base sm:text-xl text-[#BBBBBB]">
              Powered by{" "}
              <span className="text-[#FF622D] font-medium">
                Hireomatic
              </span>
            </div>
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-bold pb-4 sm:pb-6 text-[#1A1A1A] mt-6">
          Hello Aaleen Mirza
        </div>
        <div className="w-full text-start text-base sm:text-xl text-[#BBBBBB]">
          This screening will cover your communication skills as well as your
          technical skills for the role of{" "}
          <span className="text-[#1A1A1A] font-bold">
            "Full Stack Developer"
          </span>{" "}
          for NetDev.
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-6">
          <div className="px-4 py-2 text-[#FF622D] text-base sm:text-lg border border-[#FF622D] rounded-lg">
            • 10 Questions
          </div>
          <div className="px-4 py-2 text-[#FF622D] text-base sm:text-lg border border-[#FF622D] rounded-lg">
            • 2 minutes per question
          </div>
          <div className="px-4 py-2 text-[#FF622D] text-base sm:text-lg border border-[#FF622D] rounded-lg">
            • Approx 30 mins
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full gap-6 mt-8">
          <PointerWise title={"Do's"} list={doList} theme={"default"} />
          <PointerWise title={"Dont's"} list={dontList} theme={"error"} />
        </div>
      </div>
      <div className="flex mt-8">
        <Button
          variant="solid"
          color="primary"
          onClick={() => {
            navigate(RoutesUtil.screening);
          }}
          className="w-full sm:w-auto"
        >
          Start Interview
        </Button>
      </div>
    </div>
  );
};

export default JobGettingStarted;
