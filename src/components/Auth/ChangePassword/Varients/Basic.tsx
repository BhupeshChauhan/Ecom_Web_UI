import { Button, Input2, TypographyComp } from "@dashflowx/core";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PasswordStrengthMeter from "../../../../utils/PasswordStrengthMeter";

const icons = {
  eye: Eye,
  eyeOff: EyeOff,
};

interface iBasicChangePassword {
  library: "react" | "next";
  type: any;
  redirectSignInUrl: string;
  isLoading?: boolean;
  register: any;
  errors: any;
  handleSubmit: any;
  handleSubmitForm: (data: any) => void;
  showSignIn: boolean;
  testResult: any;
  setPasswordStrength: any;
  watch: any;
}
const BasicChangePassword = ({
  handleSubmit,
  handleSubmitForm,
  register,
  errors,
  isLoading,
  library,
  type,
  redirectSignInUrl,
  showSignIn,
  testResult,
  setPasswordStrength,
  watch,
}: iBasicChangePassword) => {
  const [passwordType, setType] = useState("password");
  const [passwordType2, setType2] = useState("password");
  const [icon, setIcon] = useState<any>("eyeOff");
  const [icon2, setIcon2] = useState<any>("eyeOff");
  const handleToggle = () => {
    if (passwordType === "password") {
      setIcon("eye");
      setType("text");
    } else {
      setIcon("eyeOff");
      setType("password");
    }
  };
  const handleToggle2 = () => {
    if (passwordType2 === "password") {
      setIcon2("eye");
      setType2("text");
    } else {
      setIcon2("eyeOff");
      setType2("password");
    }
  };
  const Icon = icons[icon];
  const Icon2 = icons[icon2];

  return (
    <div className="flex flex-wrap w-full h-full">
      <div className="flex w-full flex-col">
        <div className="h-full flex items-center justify-center z-10">
          <div className="mx-auto">
            <div className="rounded-xl bg-white">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <div className="mb-4 inline-block rounded-full bg-blue-200 p-2 text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                  </div>
                  <h1 className="block text-2xl font-bold text-gray-800">
                    Change password?
                  </h1>
                </div>

                <div className="mt-6">
                  <form
                    className="flex flex-col pt-3 md:pt-8"
                    onSubmit={handleSubmit(handleSubmitForm)}
                  >
                    <div className="grid gap-y-4">
                      <div className="flex flex-col pt-4">
                        <Input2
                          id="login-newpassword"
                          className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                          placeholder="New Password"
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
                          {...register("newpassword", {
                            required: true,
                            onChange: (e) => {
                              setPasswordStrength(e.target.value);
                            },
                          })}
                          errorMsg={errors.newpassword?.message}
                        />
                        <div className="px-4 py-1">
                          <PasswordStrengthMeter testResult={testResult} />
                        </div>
                        <Input2
                          id="login-confirmpassword"
                          className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                          placeholder="Confirm Password"
                          fullwidth={true}
                          type={passwordType2}
                          sufixElement={
                            <Button
                              variant="ghost"
                              type="button"
                              className="flex justify-around items-center w-[20px] h-[20px] p-0"
                              onClick={handleToggle2}
                            >
                              <Icon2 className="absolute" size={15} />
                            </Button>
                          }
                          {...register("confirmpassword", {
                            required: true,
                            validate: (val: string) => {
                              if (watch("newpassword") != val) {
                                return "Your passwords do no match";
                              }
                            },
                          })}
                          errorMsg={errors.confirmpassword?.message}
                        />
                      </div>
                      <Button
                        variant="solid"
                        color="primary"
                        type="submit"
                        fullwidth={true}
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent py-3 px-4 text-sm font-semibold text-white transition-all focus:outline-none focus:ring-2"
                        disabled={isLoading}
                      >
                        Reset password
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {showSignIn && (
              <div className="py-12 text-center">
                <p className="whitespace-nowrap text-gray-600">
                  Remember your password?{" "}
                  {library === "react" && (
                    <TypographyComp
                      as={type}
                      to={redirectSignInUrl}
                      className="underline-offset-4 font-semibold text-primary underline"
                    >
                      Sign in here
                    </TypographyComp>
                  )}
                  {library === "next" && (
                    <TypographyComp
                      as={type}
                      href={redirectSignInUrl}
                      className="underline-offset-4 font-semibold text-primary underline"
                    >
                      Sign in here
                    </TypographyComp>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicChangePassword;
