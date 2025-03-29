import { DfxPageHead } from "@dashflowx/ui";
import BillingSettingsForm from "../../../components/Form/BillingSettingsForm";

const BillingSettings = () => {
  return (
    <div className="bg-white p-6">
      <DfxPageHead
        title="Billing Detials"
        description=""
        variant="basic"
        actions={<></>}
      />
      <BillingSettingsForm />
    </div>
  );
};

export default BillingSettings;
