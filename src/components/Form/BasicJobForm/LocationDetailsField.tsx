import { FormField, Input } from "@dashflowx/core";
import { FormControl } from "@dashflowx/core";
import { FormItem } from "@dashflowx/core";
import { FormMessage } from "@dashflowx/core";

// Location Details Component
export const LocationDetailsField = ({ control, errors, LocationType }) => (
  <>
    {(LocationType === "On-site" || LocationType === "Hybrid") && (
      <div>
        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormControl className="w-full">
                <Input
                  placeholder="City, State..."
                  fullwidth={true}
                  {...field}
                  errorMsg={errors?.location?.message}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    )}
  </>
);
