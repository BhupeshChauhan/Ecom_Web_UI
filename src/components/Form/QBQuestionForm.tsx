import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  TextArea,
} from "@dashflowx/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import JobService from "../../Api/JobService";

const formSchema = z.object({
  question: z.string().min(2, {
    message: "Question must be at least 2 characters.",
  }),
  answer: z.string().optional(),
});

const QBQuestionForm = ({
  defaultValue = {},
  setOpenModal,
  handleReload,
}: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue
      ? defaultValue
      : {
          question: "",
          answer: "",
        },
  });

  const { isLoading, AddQuestionQB } = JobService();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setOpenModal(false);
    await AddQuestionQB({
      ...values,
      categoryId: location.pathname.split("/")[3],
    });
    handleReload();
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 overflow-x-hidden"
        >
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Question</FormLabel>
                <FormControl className="w-full">
                  <TextArea
                    placeholder="Enter Question..."
                    multiLine
                    rows={2}
                    fullwidth={true}
                    {...field}
                    errorMsg={form?.formState?.errors?.question?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Answer (Optional)</FormLabel>
                <FormControl className="w-full">
                  <TextArea
                    placeholder="Enter Answer..."
                    multiLine
                    rows={5}
                    fullwidth={true}
                    {...field}
                    errorMsg={form?.formState?.errors?.answer?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex gap-3 items-center justify-end w-full mt-6">
            <Button
              variant="outline"
              className="w-fit"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              color="primary"
              className="w-fit"
              type="submit"
              disabled={isLoading}
            >
              Add Question
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default QBQuestionForm;
