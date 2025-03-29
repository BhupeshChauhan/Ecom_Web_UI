import { FormLabel, Input } from "@dashflowx/core";

import { FormField, FormItem } from "@dashflowx/core";

import { FormControl } from "@dashflowx/core";

// Experience Field Component
export const ExperienceField = ({ control, errors }) => (
  <div className="col-span-2 mt-4">
    <FormField
      control={control}
      name="experience"
      render={({ field }) => (
        <FormItem>
          <FormControl className="flex flex-col w-full">
            <div>
              <FormLabel className="font-bold">Experience</FormLabel>
              <div className="flex items-center gap-2 mt-4">
                <Input
                  placeholder="3"
                  fullwidth={true}
                  required={true}
                  type="number"
                  min={0}
                  {...field}
                  value={field.value?.split("~")[0] || ""}
                  onChange={(e) => {
                    const max = field.value?.split("~")[1] || "";
                    field.onChange(`${e.target.value}~${max}`);
                  }}
                  errorMsg={errors?.experience?.message}
                />
                <span className="text-sm h-full flex items-center justify-center">
                  ~
                </span>
                <Input
                  placeholder="5"
                  fullwidth={true}
                  required={true}
                  type="number"
                  min={0}
                  value={field.value?.split("~")[1] || ""}
                  onChange={(e) => {
                    const min = field.value?.split("~")[0] || "";
                    field.onChange(`${min}~${e.target.value}`);
                  }}
                />
              </div>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  </div>
);
