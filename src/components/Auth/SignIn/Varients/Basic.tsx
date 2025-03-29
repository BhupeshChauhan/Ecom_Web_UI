import { Button, Input2, TypographyComp } from "@dashflowx/core";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { ErrorPopUp } from "../../../../utils/AlearUtils";
import { useState } from "react";
import { Eye, EyeOff, Icon } from "lucide-react";

const icons = {
  eye: Eye,
  eyeOff: EyeOff,
};

interface iBasicSignIn {
  library: "react" | "next";
  type: any;
  forgetPasswordUrl: string;
  redirectSignupUrl: string;
  previewImg: string;
  previewTitle: string;
  PreviewDescription: string;
  isLoading?: boolean;
  logoUrl: string;
  register: any;
  errors: any;
  handleSubmitOn: (type: string, credentialResponse: any) => void;
  handleSubmit: any;
  handleSubmitForm: (data: any) => void;
  showSignUp: boolean;
  showSignOn?: boolean;
}
const BasicSignIn = ({
  logoUrl,
  handleSubmitOn,
  handleSubmit,
  handleSubmitForm,
  register,
  errors,
  isLoading,
  library,
  type,
  forgetPasswordUrl,
  redirectSignupUrl,
  PreviewDescription,
  previewTitle,
  previewImg,
  showSignUp,
  showSignOn = true,
}: iBasicSignIn) => {
  const [passwordType, setType] = useState("password");
  const [icon, setIcon] = useState<any>("eyeOff");
  const handleToggle = () => {
    if (passwordType === "password") {
      setIcon("eye");
      setType("text");
    } else {
      setIcon("eyeOff");
      setType("password");
    }
  };
  const Icon = icons[icon];
  return (
    <div className="flex relative flex-wrap h-screen">
      <img
        className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
        src={previewImg}
      />
      <div className="flex w-full h-screen  flex-col md:w-[35%] bg-white z-10 rounded-r-3xl">
        <div className="w-[80%] ml-8 my-auto flex flex-col pt-8 md:px-6 md:pt-0">
          <a
            href="#"
            className="py-4 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className={"w-auto h-10"} src={logoUrl} alt="" />
          </a>
          {showSignOn && (
            <>
              <p className="text-left text-2xl font-bold">
                Sign in to your account
              </p>
              <div className="mt-6 w-full">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    handleSubmitOn("google", credentialResponse);
                  }}
                  onError={() => {
                    ErrorPopUp("Login Failed");
                  }}
                  theme="outline"
                />
              </div>
              <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
                <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">
                  or
                </div>
              </div>
            </>
          )}
          <form
            className="flex flex-col pt-3 md:pt-8"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <div className="flex flex-col pt-4">
              <Input2
                type="email"
                id="login-email"
                className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Email"
                fullwidth={true}
                {...register("email", { required: true })}
                errorMsg={errors.email?.message}
              />
            </div>
            <div className="mb-12 flex flex-col pt-4">
              <Input2
                id="login-password"
                className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Password"
                fullwidth={true}
                type={passwordType}
                sufixElement={
                  <Button
                    variant="ghost"
                    type="button"
                    className="flex justify-around items-center w-[20px] h-[20px] p-0"
                    onClick={handleToggle}
                  >
                    <Icon className="absolute" size={15} />
                  </Button>
                }
                {...register("password", { required: true })}
                errorMsg={errors.password?.message}
              />
            </div>
            <Button
              variant="solid"
              color="primary"
              type="submit"
              className="w-full rounded-lg px-4 py-2 text-center text-base font-semibold shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
              fullwidth={true}
              disabled={isLoading}
            >
              Sign in
            </Button>
          </form>
          <div className="flex items-center justify-between my-6">
            <div>
              {library === "react" && (
                <TypographyComp
                  as={type}
                  to={forgetPasswordUrl}
                  className="text-primary-600 text-sm dark:text-primary-500 font-thin hover:underline"
                >
                  Forget Password?
                </TypographyComp>
              )}
              {library === "next" && (
                <TypographyComp
                  as={type}
                  href={forgetPasswordUrl}
                  className="text-primary-600 text-sm dark:text-primary-500 font-thin hover:underline"
                >
                  Forget Password?
                </TypographyComp>
              )}
            </div>
          </div>
          {showSignUp && (
            <div className="py-4 text-center">
              <p className="whitespace-nowrap text-gray-600">
                Don't have an account?{" "}
                {library === "react" && (
                  <TypographyComp
                    as={type}
                    to={redirectSignupUrl}
                    className="underline-offset-4 font-semibold text-primary underline"
                  >
                    Sign Up
                  </TypographyComp>
                )}
                {library === "next" && (
                  <TypographyComp
                    as={type}
                    href={redirectSignupUrl}
                    className="underline-offset-4 font-semibold text-primary underline"
                  >
                    Sign Up
                  </TypographyComp>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="pointer-events-none hidden  select-none bg-black md:block ">
        <div className="md:w-[80%] w-full bg-black/20 "></div>
        <div className="absolute bottom-0 z-10 flex flex-col justify-end px-8 text-white opacity-100 md:w-[65%] bg-black/20 h-full w-full">
          <p className="mb-8 text-3xl font-semibold leading-10 text-white">
            {PreviewDescription}
          </p>
          <p className="mb-7 text-sm opacity-70 text-white">{previewTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default BasicSignIn;
