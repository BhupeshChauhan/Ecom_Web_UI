import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@dashflowx/core";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { rolesArray } from "../../Data//constData";
import { cn, retrieveValue } from "../../utils";
import AuthService from "../../Api/AuthService";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "User's Full Name must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(1, { message: "Please enter a valid email" })
    .email({ message: "Not a valid email" }),
  role: z.string().min(1, { message: "Please enter a valid role" }),
});

const InviteUsersForm = ({ setOpenModal, handleReload, status }: any) => {
  const userData = retrieveValue("userData");
  const token = retrieveValue("accessToken");
  const { isLoading, InviteUser } = AuthService();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      role: "ADMIN",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await InviteUser({
      email: values.email,
      role: values.role,
      username: values.username,
      clientId: userData.clientId,
    });
    setOpenModal(false);
    handleReload(
      `${import.meta.env.VITE_API_AUTH_BASE_URI}/auth/user-list?status=${status}`,
      token,
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full"
      >
        <div className="flex gap-3 items-center justify-start w-full">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">User's Full Name</FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="User's First and Last Name"
                    fullwidth={true}
                    {...field}
                    errorMsg={form?.formState?.errors?.username?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">
                  User's Email Address
                </FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="Enter thier work email"
                    fullwidth={true}
                    {...field}
                    errorMsg={form?.formState?.errors?.email?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">Access Type</FormLabel>
                <FormControl className="w-full">
                  <Controller
                    render={({ field }) => (
                      <select
                        {...field}
                        className={cn(
                          "w-full py-3 px-4 border-2 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-200 rounded-lg",
                          form?.formState?.errors?.role?.message
                            ? "border-red-500 border-[1px]"
                            : "",
                        )}
                      >
                        <option className="uppercase">Select Role</option>
                        {rolesArray.map((role) => (
                          <option key={role} value={role} className="uppercase">
                            {role}
                          </option>
                        ))}
                      </select>
                    )}
                    name="role"
                    control={form.control}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500 font-normal" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-3 items-center justify-end w-full mt-6">
          <Button
            // variant="outline"
            className="w-fit text-[#4E5760] border border-solid border-gray-300 p-3"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            color="primary"
            className="w-fit p-3"
            type="submit"
            disabled={isLoading}
          >
            Send Invite
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InviteUsersForm;
