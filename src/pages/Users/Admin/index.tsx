import { TabsComp, TabsContent, TabsList, TabsTrigger } from "@dashflowx/core";
import useModal from "../../../hooks/useModal";
import { cn, retrieveValue } from "../../../utils";
import UploadLogoComp from "../../../components/Auth/UploadLogo";
import AuthService from "../../../Api/AuthService";
import { useEffect } from "react";
import { LoaderMask } from "../../../components/Loader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMainContext } from "../../../context/MainProvider";
import { OrganizationSettings } from "../../../components/Admin/OrganizationSettings";
import AllUsers from "../Users/AllUsers";
import Billing from "../Billing";
import { useNavigate, useLocation } from "react-router-dom";
import QuestionBank from "../../../components/Admin/QB";
import { QuestionsConfig } from "../../../components/Admin/QuestionsConfig";

export const formSchema = z.object({
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

export const formSchemaConfig = z.object({
  numQuestions: z.number()
    .min(1, {
      message: "Number of questions must be at least 1",
    })
    .max(20, {
      message: "Number of questions must not exceed 20",
    }),
  questionDurationMin: z.number().min(1, {
    message: "Answer duration must be at least 1 minute",
  }),
  behavioralPercentage: z
    .number()
    .min(0, { message: "Behavioral percentage must be between 0 and 100" })
    .max(100, { message: "Behavioral percentage must be between 0 and 100" }),
  technicalPercentage: z
    .number()
    .min(0, { message: "Technical percentage must be between 0 and 100" })
    .max(100, { message: "Technical percentage must be between 0 and 100" })
}).refine(
  (data) => data.behavioralPercentage + data.technicalPercentage === 100,
  {
    message: "Behavioral and Technical percentages must sum to 100%",
    path: ["technicalPercentage"], // This will show the error on the technical percentage field
  }
);

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const formConfig = useForm<z.infer<typeof formSchemaConfig>>({
    resolver: zodResolver(formSchemaConfig),
    defaultValues: {
      numQuestions: 10,
      questionDurationMin: 1,
      behavioralPercentage: 50,
      technicalPercentage: 50,
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
          <AllUsers />
        </>
      ),
      id: 1,
      title: "Users",
      path: "/settings/users",
    },
    {
      content: (
        <>
          <Billing />
          {/* <UpgradePlan /> */}
          {/* <AccountUsage /> */}
        </>
      ),
      id: 2,
      title: "Billing",
      path: "/settings/billing",
    },
    {
      content: (
        <OrganizationSettings
          companyData={companyData}
          form={form}
          isLoading={isLoading}
          setOpenModal={setOpenModal}
          // DeleteLogo={DeleteLogo}
          userData={userData}
          formSchema={formSchema}
        />
      ),
      id: 3,
      title: "Organization settings",
      path: "/settings/organization",
    },
    {
      content: <QuestionBank />,
      id: 4,
      title: "Question Bank",
      path: "/settings/question-bank",
    },
    {
      content: (
        <QuestionsConfig
        form={formConfig}
        setOpenModal={setOpenModal}
        // formSchema={formSchemaConfig}
        />
      ),
      id: 5,
      title: "AI Assessment Config",
      path: "/settings/ai-assessment-config",
    },
  ];

  useEffect(() => {
    const currentTab = tabsArray.find((tab) => tab.path === location.pathname);
    if (currentTab) {
      handleAdminTabChange(currentTab.id);
    }
  }, [location.pathname]);

  const handleTabClick = (tab: any) => {
    handleAdminTabChange(tab.id);
    navigate(tab.path);
  };

  return (
    <div className="h-full">
      {isLoading && <LoaderMask />}
      <div>
        <div className="flex justify-between mt-3 mx-3 mb-0 h-full">
          <h3 className="mb-0">Admin</h3>
          <div className="flex gap-3"></div>
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
                onClick={() => handleTabClick(tab)}
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent
            value="account"
            className="w-full bg-slate-100 p-2 h-full max-h-[calc(100vh-100px)] overflow-y-auto"
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

export default Admin;
