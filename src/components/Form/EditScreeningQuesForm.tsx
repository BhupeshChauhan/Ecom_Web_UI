import {
  AlertDialog,
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
import { useEffect, useState } from "react";
import { InfoPopUp } from "../../utils/AlearUtils";
import { Trash2 } from "lucide-react";

const formSchema = z.object({
  difficulty: z.string().min(2, {
    message: "Dificulty is a required field",
  }),
  type: z.string(),
  question: z.string().min(2, {
    message: "Question must be at least 2 characters.",
  }),
});

const EditScreeningQuesForm = ({
  defaultValue = {},
  setOpenModal1,
  handleReload,
}: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      difficulty: "",
      type: "",
      question: "",
    },
  });

  const { isLoading, UpdateQuestionDetails } = JobService();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (Object.keys(form.formState.dirtyFields).length > 0) {
      setOpenModal1(false);
      await UpdateQuestionDetails({ id: defaultValue.id, ...values });
      handleReload();
    } else {
      InfoPopUp("Please, make sure you have made changes to your form");
    }
  }

  useEffect(() => {
    if (defaultValue) {
      form.setValue("difficulty", defaultValue?.difficulty || "");
      form.setValue("type", defaultValue?.type || "");
      form.setValue("question", defaultValue?.question || "");
    }
  }, [defaultValue]);
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
                          "w-full py-3 px-4 border-2 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md capitalize",
                          form?.formState?.errors?.difficulty?.message
                            ? "border-red-500 border-[1px]"
                            : "",
                        )}
                      >
                        <option className="capitalize">Select Dificulty</option>
                        {difficultyArray.map((role) => {
                          return (
                            <option
                              key={role}
                              value={role}
                              className="capitalize"
                            >
                              {role}
                            </option>
                          );
                        })}
                      </select>
                    )}
                    name="difficulty"
                    control={form.control}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Controller
                    render={({ field }) => (
                      <select
                        {...field}
                        className={cn(
                          "w-full py-3 px-4 border-2 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md capitalize",
                          form?.formState?.errors?.type?.message
                            ? "border-red-500 border-[1px]"
                            : "",
                        )}
                      >
                        <option className="capitalize">
                          Select Question Type
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
                <FormMessage />
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
              onClick={() => setOpenModal1(false)}
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
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export const EditScreeningQuesForm2 = ({
  defaultValue = {},
  handleReload,
  DeleteQuestion,
  element,
  param,
}: any) => {
  const [FormValueChanged, setFormValueChanged] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      difficulty: "",
      type: "",
      question: "",
    },
  });

  const { isLoading, UpdateQuestionDetails } = JobService();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (Object.keys(form.formState.dirtyFields).length > 0) {
      await UpdateQuestionDetails({ id: defaultValue.id, ...values });
      handleReload();
    } else {
      InfoPopUp("Please, make sure you have made changes to your form");
    }
  }

  useEffect(() => {
    if (defaultValue) {
      form.setValue("difficulty", defaultValue?.difficulty || "");
      form.setValue("type", defaultValue?.type || "");
      form.setValue("question", defaultValue?.question || "");
    }
  }, [defaultValue]);

  useEffect(() => {
    if (
      form.getValues().difficulty !== defaultValue?.difficulty ||
      form.getValues().type !== defaultValue?.type ||
      form.getValues().question !== defaultValue?.question
    ) {
      setFormValueChanged(true);
    } else {
      setFormValueChanged(false);
    }
  }, [form.getValues()]);
  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 overflow-x-hidden"
        >
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormControl className="w-full">
                  <TextArea
                    placeholder="Enter Question..."
                    multiLine
                    rows={1}
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
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Controller
                    render={({ field }) => (
                      <div className="flex space-x-4 w-full">
                        {["Easy", "Moderate", "Hard"].map((difficulty) => (
                          <label
                            key={difficulty}
                            className="flex ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            <div className="grid place-items-center mt-1">
                              <input
                                type="radio"
                                name="difficulty"
                                value={difficulty}
                                className={cn(
                                  "col-start-1 row-start-1 appearance-none shrink-0 w-4 h-4 border-2 rounded-full",
                                  field.value === difficulty
                                    ? "border-primary "
                                    : "border-gray-300",
                                )}
                                checked={field.value === difficulty}
                                onChange={() => field.onChange(difficulty)}
                              />
                              <div
                                className={cn(
                                  field.value === difficulty
                                    ? "col-start-1 row-start-1 w-2 h-2 rounded-full bg-primary"
                                    : "hidden",
                                )}
                              />
                            </div>

                            <span className="ml-2 text-gray-700 capitalize">
                              {difficulty}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                    name="difficulty"
                    control={form.control}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Controller
                    render={({ field }) => (
                      <div className="flex items-center mr-4">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={field.value === "required"}
                            onChange={(e) =>
                              field.onChange(
                                e.target.checked ? "required" : "optional",
                              )
                            }
                            className="sr-only peer"
                          />
                          <div
                            className={cn(
                              field.value === "required"
                                ? "block h-6 w-10 rounded-full bg-primary/80"
                                : "block h-6 w-10 rounded-full bg-[#E5E7EB]",
                            )}
                            onClick={(e) =>
                              field.onChange(
                                field.value === "required"
                                  ? "optional"
                                  : "required",
                              )
                            }
                          ></div>
                          <div
                            className={cn(
                              field.value === "required"
                                ? "dot absolute right-1 top-1 h-4 w-4 rounded-full bg-white transition"
                                : "dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition",
                            )}
                            onClick={(e) =>
                              field.onChange(
                                field.value === "required"
                                  ? "optional"
                                  : "required",
                              )
                            }
                          ></div>
                        </div>
                        {/* Label for the switch */}
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Required
                        </span>
                      </div>
                    )}
                    name="type" // The name of the checkbox field in form state
                    control={form.control} // Form control passed from React Hook Form
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex gap-3 items-center justify-end w-full">
        {FormValueChanged && (
          <Button
            variant="solid"
            color="primary"
            className="w-fit"
            onClick={() => onSubmit(form.getValues())}
            disabled={isLoading}
          >
            Save
          </Button>
        )}
        <AlertDialog
          variant="basic"
          actionButton={
            <Button variant="ghost" className="p-0 text-gray-400">
              <Trash2 />
            </Button>
          }
          title="Delete Question"
          description="Are you sure you want to delete this Question?"
          onSubmit={async () => {
            await DeleteQuestion(defaultValue.id);
            await handleReload();
          }}
          buttonClassName="border-0 p-2 font-light text-black text-sm"
        />
      </div>
    </div>
  );
};

export default EditScreeningQuesForm;
