import { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
} from "@dashflowx/core";
import { retrieveValue } from "../../utils";
import AuthService from "../../Api/AuthService";
import { InfoPopUp } from "../../utils/AlearUtils";
import { Link } from "react-router-dom";

const GeneralSettingsForm = ({ form, setOpenModal }: any) => {
  const userData = retrieveValue("userData");
  const { isLoading, UpdateUserData } = AuthService();
  const [ImageFallback, setImageFallback] = useState(true);

  async function onSubmit(values: any) {
    if (Object.keys(form.formState.dirtyFields).length > 0) {
      await UpdateUserData({
        userId: userData.id,
        userDetails: { username: values.username },
      });
    } else {
      InfoPopUp("Please, make sure you have made changes to your form");
    }
  }
  useEffect(() => {
    if (!userData.profileImageUrl) {
      setImageFallback(false);
    }
  }, [userData]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full h-full justify-center items-center"
      >
        <div className="h-full p-6 flex-col justify-start items-center gap-2.5 flex">
          <div className="self-stretch justify-center items-start gap-6 inline-flex">
            <div className="grow shrink basis-0 p-6 bg-white rounded-xl border border-[#e3eaee] flex-col justify-start items-start gap-6 inline-flex overflow-hidden">
              <div className="self-stretch justify-start items-center gap-4 inline-flex">
                {ImageFallback ? (
                  <div className="w-20 h-20 flex justify-center items-center">
                    <img
                      src={userData.profileImageUrl}
                      alt={userData.username}
                      className="w-20 h-20 rounded-full border border-[#e3eaee]"
                      onError={() => {
                        setImageFallback(false);
                        console.log("error");
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-slate-200 text-3xl font-bold">
                    {userData?.username?.split(" ")[0][0]}
                    {userData?.username.split(" ").length >= 2 &&
                      userData?.username?.split(" ")[1][0]}
                  </div>
                )}
                <div className="w-[600px] flex-col justify-start items-start gap-2 inline-flex">
                  <Button
                    onClick={() => setOpenModal(true)}
                    type="button"
                    className="px-6 py-3 bg-white rounded-lg border border-[#e3eaee] justify-center items-center gap-2 inline-flex"
                  >
                    <div className="text-[#4e5760] text-base font-semibold font-['Golos Text'] leading-normal">
                      {userData?.profileImageUrl
                        ? "Re-upload photo"
                        : "Upload photo"}
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
                  name="username"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-[#4e5760] text-base font-medium font-['Golos Text'] leading-tight">
                        Full Name
                      </FormLabel>
                      <FormControl className="w-full">
                        <Input
                          placeholder="first and last Name"
                          fullwidth={true}
                          {...field}
                          errorMsg={form?.formState?.errors?.username?.message}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="self-stretch flex-col justify-start items-start gap-2 flex">
                <div className="justify-center items-center gap-1 inline-flex">
                  <div className="text-[#4e5760] text-base font-medium font-['Golos Text']">
                    Email
                  </div>
                </div>
                <div className="text-[#020c17] text-base font-normal font-['Golos Text']">
                  {form.getValues("email")}
                </div>
                {/* <div className="rounded-lg justify-center items-center gap-2 inline-flex">
                                        <div className="text-[#ff4f01] text-sm font-semibold font-['Golos Text'] leading-normal">Change email</div>
                                    </div> */}
              </div>
              <div className="self-stretch flex-col justify-start items-start gap-2 flex">
                <div className="justify-center items-center gap-1 inline-flex">
                  <div className="text-[#4e5760] text-base font-medium font-['Golos Text']">
                    Access type
                  </div>
                </div>
                <div className="text-[#020c17] text-base font-normal font-['Golos Text'] uppercase">
                  {form.getValues("role")}
                </div>
              </div>
              <div className="self-stretch flex-col justify-start items-start gap-2 flex">
                <div className="justify-center items-center gap-1 inline-flex">
                  <div className="text-[#4e5760] text-base font-medium font-['Golos Text']">
                    Password
                  </div>
                </div>
                <div className="text-[#020c17] text-base font-normal font-['Golos Text']">
                  {"********"}
                </div>
                <Link to="/change-password">
                  <Button className="rounded-lg justify-center items-center gap-2 inline-flex p-0">
                    <div className="text-[#ff4f01] text-sm font-semibold font-['Golos Text'] leading-normal">
                      Change password
                    </div>
                  </Button>
                </Link>
              </div>
              <div className="flex gap-3 items-center justify-start w-full mt-6">
                <Button
                  variant="solid"
                  color="primary"
                  className="w-fit"
                  type="submit"
                  disabled={isLoading}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default GeneralSettingsForm;

// Delete picture code
{
  /* <AlertDialog
                  variant="basic"
                  actionButton="Delete Picture"
                  title="Delete Picture"
                  description="Are sure you want to delete profile picture?"
                  onSubmit={async () => {
                    await DeleteProfileImage({ userId: userData.id });
                    window.location.reload();
                  }}
                /> */
}
