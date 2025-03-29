import { useJobFormContext } from "../../../../context/JobFormProvider";
import { cn, retrieveValue } from "../../../../utils";
import RichTextBox from "../../../../components/Form/FormFeilds/RichTextBox";
import CompanyLogo from "../../../../components/Auth/CompanyLogo";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import QuestionSettingsForm from "../../../../components/Form/QuestionSettingsForm";

const PreviewJobForm = ({ type }: any) => {
  const companyData = retrieveValue("companyData");
  const {
    step,
    FormData,
    JdDataAI,
    requiredSkillsArray,
    optionalSkillsArray,
    handleJdDataAIChange,
  } = useJobFormContext();


  return (
    <>
      <div
        className={cn("flex flex-col gap-3", step === 3 ? "block" : "hidden")}
      >
        <div className="flex gap-3 max-w-screen-2xl mx-auto mb-6">
          <div className="flex flex-col w-[60%] gap-3">
            <div className="flex items-center justify-center  bg-gray-100">
              <div className="bg-white p-6 rounded-lg shadow-md w-full">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {FormData?.title}
                </h2>
                <div className="flex items-center text-gray-500 mb-4">
                  <LiaMapMarkerAltSolid />
                  <span>{FormData?.location || "Remote"}</span>
                  <span className="mx-2">•</span>
                  <span>{FormData?.experience} years of exp.</span>
                </div>
                <p className="text-gray-700">{FormData.jobDetails}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
              <div key={JdDataAI}>
                <RichTextBox
                  initialData={JdDataAI}
                  setData={handleJdDataAIChange}
                  isReactOnly={true}
                />
              </div>
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
            {requiredSkillsArray.length > 0 &&
              optionalSkillsArray.length > 0 && (
                <>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    {requiredSkillsArray.length > 0 && (
                      <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">
                          Must have skills
                        </h2>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {requiredSkillsArray.map((Skills) => (
                            <span
                              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md"
                              key={Skills.id}
                            >
                              {Skills.value}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {optionalSkillsArray.length > 0 && (
                      <div>
                        <h2 className="text-lg font-semibold mb-2">
                          Good to have skills
                        </h2>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {optionalSkillsArray.map((Skills) => (
                            <span
                              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md"
                              key={Skills.id}
                            >
                              {Skills.value}
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
    </>
  );
};

export default PreviewJobForm;
