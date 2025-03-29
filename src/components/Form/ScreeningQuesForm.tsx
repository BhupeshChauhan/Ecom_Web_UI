import {
  Button,
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
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "../../utils";
import {
  difficultyArray,
  QuestionDurationArray,
  QuestionTypeArray,
} from "../../Data//constData";
import JobService from "../../Api/JobService";

const formSchema = z.object({
  difficulty: z.string().min(2, {
    message: "Dificulty is a required field",
  }),
  type: z.string(),
  question: z.string().min(2, {
    message: "Question must be at least 2 characters.",
  }),
});

const ScreeningQuesForm = ({
  defaultValue = {},
  setOpenModal,
  handleReload,
}: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue
      ? defaultValue
      : {
          difficulty: "",
          type: "",
          question: "",
        },
  });

  const { isLoading, AddQuestion } = JobService();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setOpenModal(false);
    await AddQuestion([values]);
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
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Dificulty</FormLabel>
                <FormControl>
                  <Controller
                    render={({ field }) => (
                      <select
                        {...field}
                        className={cn(
                          "w-full py-3 px-4 border-2 placeholder-gray-500 sm:text-sm border-gray-300 rounded-md capitalize",
                          form?.formState?.errors?.difficulty?.message
                            ? "border-red-500 border-[1px]"
                            : "",
                        )}
                      >
                        <option className="capitalize">
                          Select Dificulty...
                        </option>
                        {difficultyArray.map((role) => (
                          <option
                            key={role}
                            value={role}
                            className="capitalize"
                          >
                            {role}
                          </option>
                        ))}
                      </select>
                    )}
                    name="difficulty"
                    control={form.control}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Question Type</FormLabel>
                <FormControl>
                  <Controller
                    render={({ field }) => (
                      <select
                        {...field}
                        className={cn(
                          "w-full py-3 px-4 border-2 placeholder-gray-500 sm:text-sm border-gray-300 rounded-md capitalize",
                          form?.formState?.errors?.type?.message
                            ? "border-red-500 border-[1px]"
                            : "",
                        )}
                      >
                        <option className="capitalize">
                          Select Question Type...
                        </option>
                        {QuestionTypeArray.map((role) => (
                          <option
                            key={role}
                            value={role}
                            className="capitalize"
                          >
                            {role}
                          </option>
                        ))}
                      </select>
                    )}
                    name="type"
                    control={form.control}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

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
                    rows={5}
                    fullwidth={true}
                    {...field}
                    errorMsg={form?.formState?.errors?.question?.message}
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

export default ScreeningQuesForm;
