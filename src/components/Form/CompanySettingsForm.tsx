import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  TextArea,
} from "@dashflowx/core";
import { retrieveValue } from "../../utils";
import AuthService from "../../Api/AuthService";
import { LoaderMask } from "../Loader";
import { InfoPopUp } from "../../utils/AlearUtils";
import CompanyLogo from "../Auth/CompanyLogo";
import CopyToClipboard from "../CopyToClipboard";

const CompanySettingsForm = ({ form, setOpenModal, companyData }: any) => {
  const userData = retrieveValue("userData");
  const { isLoading, UpdateCompanyData } = AuthService();
  async function onSubmit(values: any) {
    if (Object.keys(form.formState.dirtyFields).length > 0) {
      await UpdateCompanyData({
        clientId: userData.clientId,
        clientDetails: values,
      });
    } else {
      InfoPopUp("Please, make sure you have made changes to your form");
    }
  }

  return (
    <Form {...form}>
      {isLoading && <LoaderMask />}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full justify-center items-start inline-flex h-full"
      >
        <div className="flex-col justify-start items-start inline-flex">
          <div className="h-[719px] flex-col justify-start items-center gap-2.5 flex">
            <div className="self-stretch justify-center items-start gap-6 inline-flex">
              <div className="grow shrink basis-0 p-6 bg-white rounded-xl border border-[#e3eaee] flex-col justify-start items-start gap-6 inline-flex overflow-hidden">
                <div className="self-stretch justify-start items-center gap-4 inline-flex">
                  <div className="w-20 h-20 left-0 top-[-0px] relative bg-white rounded-full border border-[#e3eaee]">
                    <CompanyLogo
                      logoUrl={companyData?.logoUrl || null}
                      companyName={companyData?.name}
                      className="text-md mt-0 rounded-full h-20 w-20"
                      imageClassName="rounded-full mb-5 h-20 w-20 overflow-hidden"
                    />
                  </div>

                  <div className="w-[600px] flex-col justify-start items-start gap-2 inline-flex">
                    <Button
                      onClick={() => setOpenModal(true)}
                      type="button"
                      className="px-6 py-3 bg-white rounded-lg border border-[#e3eaee] justify-center items-center gap-2 inline-flex"
                    >
                      <div className="text-[#4e5760] text-base font-semibold font-['Golos Text'] leading-normal">
                        {companyData?.logoUrl
                          ? "Re-upload logo"
                          : "Upload logo"}
                      </div>
                    </Button>
                    <div className="text-[#4e5760] text-sm font-normal font-['Golos Text'] leading-tight">
                      JPG, PNG, GIF Max 2 MB
                    </div>
                  </div>
                </div>

                <div className="col-span-2 w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-[#4e5760] text-base font-medium font-['Golos Text'] leading-tight">
                          Company name
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input
                            placeholder="Enter Company Name"
                            fullwidth={true}
                            errorMsg={form?.formState?.errors?.name?.message}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-2 w-full">
                  <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                      <FormItem className="self-stretch">
                        <FormLabel className="text-[#4e5760] text-base font-medium font-['Golos Text']">
                          About company
                        </FormLabel>
                        <FormControl>
                          <TextArea
                            {...field}
                            placeholder="Enter a short description"
                            errorMsg={form?.formState?.errors?.about?.message}
                            fullwidth={true}
                            className="w-full"
                            rows={5}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-2 w-full">
                  <FormField
                    control={form.control}
                    name="companyEmail"
                    render={({ field }) => (
                      <FormItem className="self-stretch">
                        <FormLabel className="text-[#4e5760] text-base font-medium font-['Golos Text'] leading-tight">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter Company Email"
                            errorMsg={
                              form?.formState?.errors?.companyEmail?.message
                            }
                            fullwidth={true}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-2 w-full">
                  <FormField
                    control={form.control}
                    name="websiteUrl"
                    render={({ field }) => (
                      <FormItem className="self-stretch">
                        <FormLabel className="text-[#4e5760] text-base font-medium font-['Golos Text'] leading-tight">
                          Website
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter Website URL"
                            fullwidth={true}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-2 w-full">
                  <div className="text-[#4e5760] text-base font-medium font-['Golos Text'] leading-tight mb-2">
                    Careers URL
                  </div>
                  <CopyToClipboard
                    text={`${import.meta.env.VITE_CARRIER_URI}${companyData.careerKey}`}
                  />
                </div>

                <Button
                  variant="solid"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-[#ff4f01] rounded-lg justify-center items-center gap-2 inline-flex"
                >
                  <div className="text-white text-base font-semibold font-['Golos Text'] leading-normal">
                    Save
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CompanySettingsForm;

// <AlertDialog
//   variant="basic"
//   actionButton="Delete Logo"
//   title="Delete Logo"
//   description="Are sure you want to delete Logo?"
//   onSubmit={async () => {
//     await DeleteLogo({
//       clientId: userData.clientId,
//     });
//   }}
// />
