import { TypographyComp } from "@dashflowx/core";
import { MailXIcon } from "lucide-react";
import { previewData } from "../../../Data//auth";

const VerifyEmail = () => {
  return (
    <div className="h-screen mx-auto flex place-items-center">
      <div className="flex flex-col items-center justify-center md:w-[40%]">
        <MailXIcon className="w-20 h-20 mx-auto" />
        <TypographyComp
          as="h1"
          color="blue-gray"
          className="mt-10 !text-2xl !leading-snug md:!text-3xl text-center font-bold md:max-w-md"
        >
          Error 401! <br /> Please verify email before trying to login.
        </TypographyComp>
        <TypographyComp className="text-center mt-8 mb-14 text-[14px] text-gray-500 mx-auto md:max-w-md font-light">
          To access your account, please verify your email address. We’ve sent a
          confirmation link to your email. Once you click the link, you’ll be
          able to log in. If you haven’t received the email, please check your
          spam or junk folder, or request a new verification email. If you need
          further assistance, feel free to contact our support team.
        </TypographyComp>
      </div>
      <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-[60%]">
        <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
          <p className="mb-8 text-3xl font-semibold leading-10">
            {previewData.PreviewDescription}
          </p>
          <p className="mb-7 text-sm opacity-70">{previewData.previewTitle}</p>
        </div>
        <img
          className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
          src={previewData.previewImg}
        />
      </div>
    </div>
  );
};

export default VerifyEmail;
