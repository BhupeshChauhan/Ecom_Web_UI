import { Button, Input2, TypographyComp } from "@dashflowx/core";
import { GoogleLogin } from "@react-oauth/google";
import { ErrorPopUp } from "../../../../utils/AlearUtils";

interface iBasicSignUp {
  library: "react" | "next";
  type: any;
  redirectSignInUrl: string;
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
  showSignIn: boolean;
  showSignOn?: boolean;
}
const BasicSignUp = ({
  logoUrl,
  handleSubmitOn,
  handleSubmit,
  handleSubmitForm,
  register,
  errors,
  isLoading,
  library,
  type,
  redirectSignInUrl,
  PreviewDescription,
  previewTitle,
  previewImg,
  showSignIn,
  showSignOn,
}: iBasicSignUp) => {
  return (
    <div className="flex relative flex-wrap w-[calc(100vw-20px)] h-[calc(100vh-20px)] m-[10px]">
      <img
        className="-z-1 absolute top-0 h-full w-full object-cover opacity-90 rounded-3xl"
        src={previewImg}
      />
      <div className="flex w-full flex-col md:w-[40%] bg-white z-10 rounded-l-3xl">
        <div className="w-[80%] ml-12 my-auto flex flex-col pt-8 md:px-6 md:pt-0">
          <a
            href="#"
            className="py-4 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className={"w-auto h-10"} src={logoUrl} alt="" />
          </a>
          {showSignOn && (
            <>
              <p className="text-left text-2xl font-bold">
                Create a new account
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
                type="username"
                id="login-username"
                className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="First and Last Name"
                fullwidth={true}
                {...register("username", { required: true })}
                errorMsg={errors.username?.message}
              />
            </div>
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
                type="password"
                id="login-password"
                className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Password"
                fullwidth={true}
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
              Sign Up
            </Button>
          </form>
          {showSignIn && (
            <div className="py-12 text-center">
              <p className="whitespace-nowrap text-gray-600">
                Already have an account?{" "}
                {library === "react" && (
                  <TypographyComp
                    as={type}
                    to={redirectSignInUrl}
                    className="underline-offset-4 font-semibold text-primary underline"
                  >
                    Sign In
                  </TypographyComp>
                )}
                {library === "next" && (
                  <TypographyComp
                    as={type}
                    href={redirectSignInUrl}
                    className="underline-offset-4 font-semibold text-primary underline"
                  >
                    Sign In
                  </TypographyComp>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="pointer-events-none hidden h-[calc(100vh-20px)]  select-none bg-black md:block ">
        <div className="md:w-[60%]"></div>
        <div className="absolute bottom-0 z-10 px-8 text-white opacity-100 md:w-[40%] m-10">
          <p className="mb-8 text-3xl font-semibold leading-10">
            {PreviewDescription}
          </p>
          <p className="mb-7 text-sm opacity-70">{previewTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default BasicSignUp;
