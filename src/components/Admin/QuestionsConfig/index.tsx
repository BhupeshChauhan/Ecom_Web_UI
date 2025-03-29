import { z } from "zod";
import QuestionSettingsForm from "../../Form/QuestionSettingsForm";
import JobService from "../../../Api/JobService";
import { useEffect } from "react";
import { LoaderMask } from "../../Loader";
interface QuestionsConfigProps {
  form: any;
  setOpenModal: (value: boolean) => void;
  // formSchema: z.ZodObject<any>;
}

export const QuestionsConfig = ({
  form,
  setOpenModal,
}: QuestionsConfigProps) => {
  const {
    isLoading,
    data,
    GetAssessmentConfig
  } = JobService();

  useEffect(() => {
    GetAssessmentConfig();
  }, []);

  return (
    <div className="flex w-full h-fit  p-6">
      {isLoading && <LoaderMask />}
      <div className="w-full flex justify-center items-center h-full mb-12">
        <QuestionSettingsForm
          // form={form}
          setOpenModal={setOpenModal}
          data={data}
        />
      </div>
    </div>
  );
};
