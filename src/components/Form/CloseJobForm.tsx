import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  TextArea,
} from "@dashflowx/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  type: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  experience: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  contract: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  budget: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  status: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  shift: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  notice: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  skills: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  createdAt: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  createdBy: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const CloseJobForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "",
      experience: "",
      contract: "",
      budget: "",
      status: "",
      location: "",
      description: "",
      shift: "",
      notice: "",
      skills: null,
      createdAt: "",
      createdBy: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 overflow-x-hidden w-[80%]"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal">
                  Kindly Choose the reason for closing this job post
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter reason..."
                    fullwidth={true}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal">Commnets</FormLabel>
                <FormControl className="w-full">
                  <TextArea
                    placeholder="Enter Notes..."
                    multiLine
                    fullwidth={true}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default CloseJobForm;
