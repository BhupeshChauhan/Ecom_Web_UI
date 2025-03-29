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
import JobService from "../../Api/JobService";

const formSchema = z.object({
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  description: z.string(),
});

const QBCategoryForm = ({
  defaultValue = {},
  setOpenModal,
  handleReload,
}: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue
      ? defaultValue
      : {
          category: "",
          description: "",
        },
  });

  const { isLoading, AddCategoryQB, UpdateCategoryQB } = JobService();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setOpenModal(false);
    if (defaultValue?.category) {
      await UpdateCategoryQB({ ...values, id: defaultValue?.id });
    } else {
      await AddCategoryQB({ ...values });
    }
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Category</FormLabel>
                <FormControl className="w-full">
                  <TextArea
                    placeholder="Enter Category..."
                    multiLine
                    rows={1}
                    fullwidth={true}
                    {...field}
                    errorMsg={form?.formState?.errors?.category?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Description</FormLabel>
                <FormControl className="w-full">
                  <TextArea
                    placeholder="Enter Description..."
                    multiLine
                    rows={5}
                    fullwidth={true}
                    {...field}
                    errorMsg={form?.formState?.errors?.description?.message}
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
              {defaultValue?.category ? "Update Category" : "Add Category"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default QBCategoryForm;
