import { memo } from "react";
import { CiFileOn } from "react-icons/ci";
import { Download, UploadCloud } from "lucide-react";
import { Button } from "@dashflowx/core";
import JobService from "../../../Api/JobService";
import useModal from "../../../hooks/useModal";
import useUpload from "../../../hooks/useUpload";

export const ResumeSection = memo(
  ({
    resumeUrl,
    applicationId,
    onDownload,
  }: {
    resumeUrl: string;
    onDownload: () => void;
    applicationId: any;
  }) => {
    const { isLoading, ReuploadResume } = JobService();

    const { openModal, setOpenModal, ModalComp } = useModal();
    const { selectedFiles, setSelectedFiles, setError, UploadComponent } =
      useUpload();
    return (
      <div className="self-stretch h-[140px] p-6 bg-white rounded-xl border border-[#e3eaee] flex-col justify-start items-start gap-4 flex">
        <div className="self-stretch text-[#4e5760] text-base font-medium font-['Golos Text'] leading-normal">
          Resume
        </div>
        <div className="self-stretch justify-start items-center gap-2 inline-flex">
          <div className="grow shrink basis-0 h-[52px] justify-start items-center gap-2 flex">
            <div className="h-12 px-4 py-3 bg-[#fff1eb] rounded-[99px] justify-center items-center gap-2.5 flex">
              <CiFileOn color="#ff4f01" size={20} strokeWidth={1} />
            </div>
            <div className="flex-col justify-center items-center gap-1 inline-flex">
              <div className="self-stretch text-[#020c17] text-base font-medium font-['Golos Text'] leading-normal">
                {resumeUrl
                  ? resumeUrl.length > 20
                    ? resumeUrl.slice(-20)
                    : resumeUrl.split("/").pop()
                  : "No resume uploaded"}
              </div>
              <div className="self-stretch text-[#899198] text-base font-normal font-['Golos Text'] leading-normal">
                {resumeUrl ? "" : "No resume uploaded"}
              </div>
            </div>
          </div>
          <div className="justify-start items-start gap-2 flex">
            <button
              onClick={onDownload}
              className="pl-2.5 pr-4 py-3 bg-[#fff1eb] rounded-lg justify-center items-center gap-2 flex"
            >
              <Download color="#ff4f01" size={20} strokeWidth={2} />
              <span className="text-[#ff4f01] text-base font-semibold font-['Golos Text'] leading-normal">
                Download
              </span>
            </button>
            <Button
              variant="ghost"
              onClick={() => setOpenModal(true)}
              className="pl-2.5 pr-4 py-3 border-[1px] border-[#ff4f01] rounded-lg justify-center items-center gap-2 flex"
            >
              <UploadCloud className="mr-2" /> Re-Upload
            </Button>
          </div>
          <ModalComp
            dialogTitle="Upload Jobs"
            dialogContentClassName="bg-white w-[1200px] max-w-screen-lg"
            dialogDescription=""
            dialogContent={
              <>
                <UploadComponent
                  multiple={false}
                  acceptedFileExtensions={["pdf", "docx", "doc", "txt"]}
                />
              </>
            }
            dialogFooter={
              <div className="flex gap-3 items-center justify-start w-full mt-6">
                <Button
                  variant="outline"
                  className="w-fit"
                  disabled={isLoading}
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  color="primary"
                  className="w-fit"
                  disabled={isLoading}
                  onClick={async () => {
                    await ReuploadResume(
                      selectedFiles,
                      setSelectedFiles,
                      setError,
                      setOpenModal,
                      applicationId,
                    );
                  }}
                >
                  Upload
                </Button>
              </div>
            }
          />
        </div>
      </div>
    );
  },
);
