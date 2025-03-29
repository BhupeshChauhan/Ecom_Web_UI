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
import { LoaderMask } from "../Loader";
import { InfoPopUp } from "../../utils/AlearUtils";
import React from "react";
import JobService from "../../Api/JobService";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchemaConfig } from "../../pages/Users/Admin";
import { useForm } from "react-hook-form";
import { z } from "zod";



const QuestionSettingsForm = ({ data, type, onSave }: any) => {

  const form = useForm<z.infer<typeof formSchemaConfig>>({
    resolver: zodResolver(formSchemaConfig),
    defaultValues: {
      numQuestions: 10,
      questionDurationMin: 1,
      behavioralPercentage: 50,
      technicalPercentage: 50,
    },
  });

  const userData = retrieveValue("userData");
  const { isLoading, UpdateAssessmentConfig } = JobService();

  // Modified useEffect to prevent infinite updates
  React.useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const defaultValues = {
        numQuestions: data.numQuestions || '',
        questionDurationMin: data.questionDurationMin || '',
        behavioralPercentage: data.behavioralPercentage || '',
        technicalPercentage: data.technicalPercentage || '',
      };
      
      // Only reset if the values are different from current form values
      const currentValues = form.getValues();
      if (JSON.stringify(currentValues) !== JSON.stringify(defaultValues)) {
        form.reset(defaultValues);
      }
    }
    console.log("data", data);
  }, [data, form]); 


  async function onSubmit(values: any) {
    if (Object.keys(form.formState.dirtyFields).length > 0) {
      await UpdateAssessmentConfig({
        numQuestions: values.numQuestions,
        questionDurationMin: values.questionDurationMin,
        behavioralPercentage: values.behavioralPercentage,
        technicalPercentage: values.technicalPercentage,
        jobId: data?.jobId
      });
      onSave();
    } else {
      InfoPopUp("Please, make sure you have made changes to your form");
    }
  }

  return (
    <Form {...form}>
      {isLoading && <LoaderMask />}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full justify-center items-start inline-flex"
      >
        <div className={`flex-col justify-start items-start inline-flex ${type === "full" ? "w-full" : "w-1/2"}`}>
          <div className="w-full flex-col justify-start items-center gap-2.5 flex">
            <div className="self-stretch justify-center items-start gap-6 inline-flex">
              <div className="grow shrink basis-0 p-6 bg-white rounded-xl border border-[#e3eaee] flex-col justify-start items-start gap-6 inline-flex">
                <div className="col-span-2 w-full">
                  <FormField
                    control={form.control}
                    name="numQuestions"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-[#4e5760] text-base font-medium font-['Golos Text'] leading-tight">
                          Number of Questions
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input
                            type="number"
                            placeholder="Enter number of questions"
                            fullwidth={true}
                            errorMsg={
                              form?.formState?.errors?.numQuestions?.message
                            }
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            value={field.value || ''}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-2 w-full">
                  <FormField
                    control={form.control}
                    name="questionDurationMin"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-[#4e5760] text-base font-medium font-['Golos Text'] leading-tight">
                          Max Answer Duration (in minutes)
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input
                            type="number"
                            placeholder="Enter duration in minutes"
                            fullwidth={true}
                            errorMsg={form?.formState?.errors?.questionDurationMin?.message}
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            value={field.value || ''}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-2 w-full">
                  <FormField
                    control={form.control}
                    name="behavioralPercentage"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-[#4e5760] text-base font-medium font-['Golos Text'] leading-tight">
                          Percentage of Behavioral Questions
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input
                            type="number"
                            placeholder="Enter behavioral percentage"
                            fullwidth={true}
                            errorMsg={
                              form?.formState?.errors?.behavioralPercentage
                                ?.message
                            }
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            value={field.value || ''}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-2 w-full">
                  <FormField
                    control={form.control}
                    name="technicalPercentage"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-[#4e5760] text-base font-medium font-['Golos Text'] leading-tight">
                          Percentage of Job Specific Questions
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input
                            type="number"
                            placeholder="Enter technical percentage"
                            fullwidth={true}
                            errorMsg={
                              form?.formState?.errors?.technicalPercentage
                                ?.message
                            }
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            value={field.value || ''}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  variant="solid"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-[#ff4f01] rounded-xl justify-center items-center gap-2 inline-flex"
                >
                  <div className="text-white text-base font-semibold font-['Golos Text'] leading-normal">
                    Save
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default QuestionSettingsForm;
