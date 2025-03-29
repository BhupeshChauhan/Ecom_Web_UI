import React, { useEffect } from "react";
const StripePricingTable = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return React.createElement("stripe-pricing-table", {
    "pricing-table-id": "prctbl_1Q3drHRolCcocJAWQmFQi9qp",
    "publishable-key":
      "pk_test_51Q3c3IRolCcocJAW3HNg8S9xZarpOwmQSOpgq6OEVcbrB0YrcN3pbWi1fjVR4i4bkzyFGEwdrW63MDJin85Qlv5F009Af18de7",
  });
};
export default StripePricingTable;
