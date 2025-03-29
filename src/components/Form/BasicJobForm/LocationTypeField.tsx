import { FormMessage, Label } from "@dashflowx/core";
import { RadioGroupItem } from "@dashflowx/core";
import { FormControl } from "@dashflowx/core";
import { RadioGroupComp } from "@dashflowx/core";
import { FormLabel } from "@dashflowx/core";
import { FormItem } from "@dashflowx/core";

// Location Type Component
export const LocationTypeField = ({
  LocationType,
  handleLocationTypeChange,
}) => (
  <div className="col-span-2">
    <FormItem>
      <FormLabel className="font-bold">Location</FormLabel>
      <RadioGroupComp
        onValueChange={handleLocationTypeChange}
        value={LocationType}
        className="grid grid-cols-4 gap-2 max-w-[70%]"
      >
        <div>
          <FormControl className="mr-2">
            <RadioGroupItem value="Remote" id="r1" />
          </FormControl>
          <Label htmlFor="r1">Remote</Label>
        </div>
        <div>
          <FormControl className="mr-2">
            <RadioGroupItem value="On-site" id="r2" />
          </FormControl>
          <Label htmlFor="r2">On-site</Label>
        </div>
        <div>
          <FormControl className="mr-2">
            <RadioGroupItem value="Hybrid" id="r3" />
          </FormControl>
          <Label htmlFor="r3">Hybrid</Label>
        </div>
      </RadioGroupComp>
      <FormMessage />
    </FormItem>
  </div>
);
