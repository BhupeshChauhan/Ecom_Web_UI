import { FormField, TextArea } from "@dashflowx/core";
import { FormControl } from "@dashflowx/core";
import { FormItem } from "@dashflowx/core";

// Description Field Component
export const DescriptionField = ({ control, errors }) => (
  <div className="col-span-2">
    <FormField
      control={control}
      name="jobDetails"
      render={({ field }) => (
        <FormItem>
          <FormControl className="w-full">
            <TextArea
              lable="Short Description"
              lableClassName="font-bold"
              placeholder="Enter a short Description..."
              multiLine
              rows={5}
              fullwidth={true}
              required={true}
              {...field}
              errorMsg={errors?.jobDetails?.message}
            />
          </FormControl>
        </FormItem>
      )}
    />
  </div>
);
