import { Button, Form } from "@dashflowx/core";
import { CustomFormField } from "../FormField";
import { ReadonlyFormSection } from "../ReadonlyFormSection";
import {
  renderSkillInput,
  renderSkillsList,
} from "../../Form/SkillsCompontent";
import { UseFormReturn } from "react-hook-form";
import { CandidateFormData } from "../../Form/CandidateDetailsForm";
import { useEffect, useState } from "react";
import { retrieveValue } from "../../../utils";
import useModal from "../../../hooks/useModal";
import UploadProfileImageComp from "../../Auth/UploadProfileImage";

interface CandidateDetailsLeftColProps {
  form: UseFormReturn<CandidateFormData>;
  isLoading: boolean;
  data: any;
  requiredSkills: string;
  requiredSkillsArray: any[];
  handleRequiredSkillsChange: (e: any) => void;
  handleSkillSubmit: () => void;
  handleClearSkill: (id: string) => void;
  onSubmit: (values: CandidateFormData) => Promise<void>;
}

export const CandidateDetailsLeftCol = ({
  form,
  isLoading,
  data,
  requiredSkills,
  requiredSkillsArray,
  handleRequiredSkillsChange,
  handleSkillSubmit,
  handleClearSkill,
  onSubmit,
}: CandidateDetailsLeftColProps) => {
  const [ImageFallback, setImageFallback] = useState(true);
  const { openModal, setOpenModal, ModalComp } = useModal();
  const userData = retrieveValue("userData");
  useEffect(() => {
    if (!userData.profileImageUrl) {
      setImageFallback(false);
    }
  }, [userData]);
  return (
    <div className="w-1/2 flex-col justify-start items-start inline-flex p-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-row w-full"
        >
          <div className="h-full w-full bg-neutral-50 justify-start items-start inline-flex">
            <div className="w-full p-6 bg-white rounded-xl border border-[#e3eaee] flex-col justify-start items-start gap-4 inline-flex">
              <div className="self-stretch justify-start items-center gap-4 inline-flex">
                {ImageFallback ? (
                  <div className="w-20 h-20 flex justify-center items-center">
                    <img
                      src={userData.profileImageUrl}
                      alt={userData.username}
                      className="w-20 h-20 rounded-full border border-[#e3eaee]"
                      onError={() => {
                        setImageFallback(false);
                        console.log("error");
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-slate-200 text-3xl font-bold">
                    {form.getValues("name")?.split(" ")[0][0]}
                    {form.getValues("name")?.split(" ").length >= 2 &&
                      form.getValues("name")?.split(" ")[1][0]}
                  </div>
                )}
                <div className="w-[600px] flex-col justify-start items-start gap-2 inline-flex">
                  <Button
                    onClick={() => setOpenModal(true)}
                    type="button"
                    className="px-6 py-3 bg-white rounded-lg border border-[#e3eaee] justify-center items-center gap-2 inline-flex"
                  >
                    <div className="text-[#4e5760] text-base font-semibold font-['Golos Text'] leading-normal">
                      {userData?.profileImageUrl
                        ? "Re-upload photo"
                        : "Upload photo"}
                    </div>
                  </Button>
                  <div className="text-[#4e5760] text-sm font-normal font-['Golos Text'] leading-tight">
                    JPG, PNG, GIF Max 2 MB
                  </div>
                </div>
              </div>
              <CustomFormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="First and last name"
                form={form}
              />
              <CustomFormField
                control={form.control}
                name="experience"
                label="Years of Experience"
                placeholder="Enter Experience"
                form={form}
              />
              <CustomFormField
                control={form.control}
                name="phone"
                label="Phone"
                placeholder="Enter contact number..."
                form={form}
              />
              <CustomFormField
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter their email"
                form={form}
              />

              <ReadonlyFormSection
                title="Applied on"
                value={data.job?.title || ""}
              />

              <ReadonlyFormSection
                title="Last contacted on"
                value={
                  data.interview?.createdAt
                    ? new Date(data.interview.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )
                    : "Never"
                }
              />

              <div className="text-[#4e5760] text-base font-medium font-['Golos Text'] leading-tight">
                Skills
              </div>
              {renderSkillInput(
                requiredSkills,
                handleRequiredSkillsChange,
                handleSkillSubmit,
                "Communication Skills, Technical Proficiency, Problem-Solving Skills...",
              )}
              {renderSkillsList(requiredSkillsArray, handleClearSkill)}

              <div className="flex gap-3 items-center justify-end w-full mt-6">
                <Button
                  variant="solid"
                  color="primary"
                  className="w-fit"
                  type="submit"
                  disabled={isLoading}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
      <ModalComp
        dialogTitle="Upload Profile Image"
        dialogContentClassName="bg-white w-[1200px] max-w-screen-lg"
        dialogDescription=""
        dialogContent={
          <UploadProfileImageComp
            setOpenModal={setOpenModal}
            UploadProfileImage={() => {}}
          />
        }
        dialogFooter={<></>}
      />
    </div>
  );
};
