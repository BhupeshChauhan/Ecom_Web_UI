import CompanySettingsForm from "../../Form/CompanySettingsForm";
import { z } from "zod";

interface OrganizationSettingsProps {
  companyData: any;
  form: any;
  isLoading: boolean;
  setOpenModal: (value: boolean) => void;
  //  DeleteLogo: () => void;
  userData: any;
  formSchema: z.ZodObject<any>; // Add this line
}

export const OrganizationSettings = ({
  companyData,
  form,
  isLoading,
  setOpenModal,
  //   DeleteLogo,
  userData,
}: OrganizationSettingsProps) => {
  return (
    <div className="flex w-full h-fit  p-6">
      <div className="w-full flex justify-center items-center h-full mb-12">
        <CompanySettingsForm
          form={form}
          setOpenModal={setOpenModal}
          companyData={companyData}
        />
      </div>
    </div>
  );
};
