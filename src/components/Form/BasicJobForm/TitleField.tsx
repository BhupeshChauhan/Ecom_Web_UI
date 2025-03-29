import { FormField } from "@dashflowx/core";
import { Input } from "@dashflowx/core";
import { FormControl } from "@dashflowx/core";
import { FormItem } from "@dashflowx/core";

// Title Field Component
export const TitleField = ({ control, errors }) => (
  <div className="col-span-2">
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              placeholder="Add job title..."
              lable="Title"
              fullwidth={true}
              required={true}
              {...field}
              errorMsg={errors?.title?.message}
            />
          </FormControl>
        </FormItem>
      )}
    />
  </div>
);
