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
  question: z.string().min(2, {
    message: "Question must be at least 2 characters.",
  }),
  answer: z.string().min(2, {
    message: "Answer must be at least 2 characters.",
  }),
});

export const EditQbQuestionForm = ({
  defaultValue = {},
  handleReload,
  DeleteQuestionQB,
  element,
  param,
}: any) => {
  const [FormValueChanged, setFormValueChanged] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: "",
      question: "",
    },
  });

  const { isLoading, UpdateQuestionDetailsQB } = JobService();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (Object.keys(form.formState.dirtyFields).length > 0) {
      await UpdateQuestionDetailsQB({
        question: values.question,
        categoryId: location.pathname.split("/")[3],
        answer: values.answer,
        id: defaultValue.id,
      });
      handleReload();
    } else {
      InfoPopUp("Please, make sure you have made changes to your form");
    }
  }

  useEffect(() => {
    if (defaultValue) {
      form.setValue("question", defaultValue?.question || "");
      form.setValue("answer", defaultValue?.answer || "");
    }
  }, [defaultValue]);

  useEffect(() => {
    if (
      form.getValues().question !== defaultValue?.question ||
      form.getValues().answer !== defaultValue?.answer
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
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormControl className="w-full">
                  <TextArea
                    placeholder="Enter Answer..."
                    multiLine
                    rows={4}
                    fullwidth={true}
                    {...field}
                    errorMsg={form?.formState?.errors?.answer?.message}
                  />
                </FormControl>
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
            await DeleteQuestionQB(defaultValue.id);
            await handleReload();
          }}
          buttonClassName="border-0 p-2 font-light text-black text-sm"
        />
      </div>
    </div>
  );
};
