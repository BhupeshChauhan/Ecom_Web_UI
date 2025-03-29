import { ResumeSection } from "../ResumeSection";
import { WorkHistorySection } from "../WorkHistorySection";
import { EducationSection } from "../EducationSection";

interface CandidateDetailsRightColProps {
  data: any;
  setModalType: (type: string) => void;
  setSelectedExperience: (experience: any) => void;
  setSelectedEducation: (education: any) => void;
  setOpenModal: (open: boolean) => void;
}

export const CandidateDetailsRightCol = ({
  data,
  setModalType,
  setSelectedExperience,
  setSelectedEducation,
  setOpenModal,
}: CandidateDetailsRightColProps) => {
  return (
    <div className="w-1/2 flex-col gap-4 justify-start items-start inline-flex p-2">
      <ResumeSection
        resumeUrl={data?.resumeUrl}
        onDownload={() => {
          window.open(data?.resumeUrl, "_blank");
        }}
        applicationId={data?.applicationId}
      />
      <WorkHistorySection
        data={data?.workExperience ? JSON.parse(data.workExperience) : []}
        onAddExperience={() => {
          setModalType("experience");
          setSelectedExperience(null);
          setOpenModal(true);
        }}
        onEditExperience={(experience) => {
          setModalType("experience");
          setSelectedExperience(experience);
          setOpenModal(true);
        }}
      />
      <EducationSection
        data={data?.education ? JSON.parse(data.education) : []}
        onAddEducation={() => {
          setModalType("education");
          setSelectedEducation(null);
          setOpenModal(true);
        }}
        onEditEducation={(education) => {
          setModalType("education");
          setSelectedEducation(education);
          setOpenModal(true);
        }}
      />
    </div>
  );
};
