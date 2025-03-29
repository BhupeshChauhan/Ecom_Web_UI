import {
  AlertDialog,
  Button,
  TabsComp,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@dashflowx/core";
import CompanySettingsForm from "../../../components/Form/CompanySettingsForm";
import useModal from "../../../hooks/useModal";
import { cn, retrieveValue } from "../../../utils";
import UploadLogoComp from "../../../components/Auth/UploadLogo";
import AuthService from "../../../Api/AuthService";
import { useEffect } from "react";
import { LoaderMask } from "../../../components/Loader";
import CompanyLogo from "../../../components/Auth/CompanyLogo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMainContext } from "../../../context/MainProvider";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Company Name must be at least 2 characters.",
  }),
  about: z.string().min(2, {
    message: "About Company must be at least 2 characters.",
  }),
  companyEmail: z
    .string()
    .min(2, {
      message: "Company Email is required.",
    })
    .email({ message: "Not a valid email" }),
  websiteUrl: z.string(),
});

const CompanySettings = () => {
  const { activeAdminTab, handleAdminTabChange } = useMainContext();
  const { openModal, setOpenModal, ModalComp } = useModal();
  const companyData = retrieveValue("companyData");

  const userData = retrieveValue("userData");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      about: "",
      companyEmail: "",
      websiteUrl: "",
    },
  });
  const { isLoading, UploadLogo, DeleteLogo } = AuthService();

  useEffect(() => {
    if (companyData) {
      form.setValue("name", companyData?.name || "");
      form.setValue("about", companyData?.about || "");
      form.setValue("companyEmail", companyData?.companyEmail || "");
      form.setValue("websiteUrl", companyData?.websiteUrl || "");
    }
  }, []);

  const tabsArray = [
    {
      content: (
        <>
          <div className="flex gap-3 w-full h-full">
            <div className="flex w-[25%] flex-col gap-3 items-center justify-center bg-white p-8 rounded-3xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
              <div className="flex flex-col gap-3 w-fit">
                <CompanyLogo
                  logoUrl={companyData?.logoUrl || null}
                  companyName={companyData.name}
                  className="text-md w-full p-2r"
                  imageClassName="rounded-xl mb-5"
                />
                {companyData?.logoUrl ? (
                  <>
                    {Object.keys(form.formState.dirtyFields).length > 0 ? (
                      <AlertDialog
                        variant="basic"
                        actionButton="Change Logo"
                        title="Alert!"
                        description="There are some unsaved changes. Are sure you want to continue?"
                        onSubmit={() => setOpenModal(true)}
                        buttonClassName="bg-primary text-white"
                      />
                    ) : (
                      <Button
                        variant="solid"
                        color="primary"
                        onClick={() => setOpenModal(true)}
                        disabled={isLoading}
                      >
                        Change Logo
                      </Button>
                    )}
                    <AlertDialog
                      variant="basic"
                      actionButton="Delete Logo"
                      title="Delete Logo"
                      description="Are sure you want to delete Logo?"
                      onSubmit={async () => {
                        await DeleteLogo({
                          clientId: userData.clientId,
                        });
                      }}
                    />
                  </>
                ) : (
                  <Button
                    variant="solid"
                    color="primary"
                    onClick={() => setOpenModal(true)}
                    disabled={isLoading}
                  >
                    Upload Logo
                  </Button>
                )}
              </div>
            </div>

            <div className="w-[75%] items-center text-[#202142] bg-white p-8 rounded-3xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
              <CompanySettingsForm form={form} />
            </div>
          </div>
        </>
      ),
      id: 1,
      title: "Company Settings",
      path: "/jobs/active",
    },
  ];

  return (
    <div className="h-full">
      {isLoading && <LoaderMask />}
      <div>
        <div className="flex justify-between mt-3 mx-3 mb-0 h-full">
          <h3 className="mb-0">Admin</h3>
          <div className="flex gap-3">
            {/* {companyData?.name && (
            <Button
              variant="ghost"
              onClick={() => setOpenModal(true)}
              className="bg-primary/10 text-primary text-sm p-2 py-1"
            >
              <UploadCloud className="mr-2 w-4" /> Upload Job
            </Button>
          )}
          <Button
            variant="solid"
            color="primary"
            className="text-sm p-2 py-1"
            onClick={() => navigate("/jobs/create")}
          >
            <Plus className="mr-2 w-4" /> Create Job
          </Button> */}
          </div>
        </div>
        <TabsComp defaultValue="account" className={cn("w-full")}>
          <TabsList className="flex items-start justify-start">
            {tabsArray.map((tab: any) => (
              <TabsTrigger
                value="account"
                key={tab.id}
                className={cn(
                  "inline-block p-4 pl-2 border-b-2 typography-h5 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 pt-2",
                  activeAdminTab === tab.id
                    ? "text-primary-light font-bold"
                    : "text-gray-500",
                )}
                onClick={() => handleAdminTabChange(tab.id)}
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent
            value="account"
            className="w-full bg-slate-100 p-2 h-full"
          >
            {tabsArray[activeAdminTab - 1]?.content}
          </TabsContent>
        </TabsComp>
      </div>

      <ModalComp
        dialogTitle="Upload Company Logo"
        dialogContentClassName="bg-white w-[1200px] max-w-screen-lg"
        dialogDescription=""
        dialogContent={
          <UploadLogoComp setOpenModal={setOpenModal} UploadLogo={UploadLogo} />
        }
        dialogFooter={<></>}
      />
    </div>
  );
};

export default CompanySettings;
