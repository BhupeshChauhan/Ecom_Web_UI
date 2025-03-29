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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { retrieveValue } from "../../utils";
import JobService from "../../Api/JobService";
import { useEffect } from "react";
import { LoaderMask } from "../Loader";
import { InfoPopUp } from "../../utils/AlearUtils";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(1, { message: "Please enter a valid email" })
    .email({ message: "Not a valid email" }),
  designation: z.string().min(2, {
    message: "Designation is required",
  }),
  phone: z.string(),
  experience: z.string().min(1, {
    message: "Experience must be at least 1 characters.",
  }),
});

const ApplicantDetailsForm = () => {
  const { isLoading, data, GetApplicantDetails, UpdateApplicantDetails } =
    JobService();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      designation: data.designation,
      email: data.email,
      phone: data.phone,
      experience: data.experience,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (Object.keys(form.formState.dirtyFields).length > 0) {
      await UpdateApplicantDetails(values);
    } else {
      InfoPopUp("Please, make sure you have made changes to your form");
    }
  }

  useEffect(() => {
    if (data) {
      form.setValue("name", data?.name || "");
      form.setValue("email", data?.email || "");
      form.setValue("designation", data?.designation || "");
      form.setValue("phone", data?.phone || "");
      form.setValue("experience", data?.experience || "");
    }
  }, [data]);

  useEffect(() => {
    GetApplicantDetails();
  }, []);

  return (
    <Form {...form}>
      {isLoading && <LoaderMask />}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full"
      >
        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-normal">Full Name</FormLabel>
                  <FormControl className="w-full">
                    <Input
                      placeholder="First and last Name"
                      fullwidth={true}
                      errorMsg={form?.formState?.errors?.name?.message}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="designation"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">Designation</FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="Enter Designation"
                    fullwidth={true}
                    errorMsg={form?.formState?.errors?.designation?.message}
                    {...field}
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
                <FormLabel className="font-normal">Email address</FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="Enter thier email"
                    fullwidth={true}
                    errorMsg={form?.formState?.errors?.email?.message}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">Contact Number</FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="Enter contact number..."
                    fullwidth={true}
                    errorMsg={form?.formState?.errors?.phone?.message}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal">Experience</FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="Enter Experience"
                    fullwidth={true}
                    errorMsg={form?.formState?.errors?.experience?.message}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
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
      </form>
    </Form>
  );
};

export default ApplicantDetailsForm;
