import { useEffect, useState } from "react";
import { retrieveValue } from "../../utils";
import AuthService from "../../Api/AuthService";
import { LoaderMask } from "../Loader";

export const staterPlans = [
  {
    link: "https://pay.hireomatic.com/b/test_00g5oofawclW2nC14b",
    productId: "prod_R1m8SPr10nimmx",
    price: 249,
    discountedPrice: 0,
    duration: "month",
    description:
      "Unlimited Job Post, Auto Roll-over unused job posts, 500 Interviews, Unlimited JD Creation and regeneration, Unlimited Resume Screening, Unlimited Question Generation",
  },
  {
    link: "https://pay.hireomatic.com/b/test_00gbMMbYk4Tu5zO8wx",
    productId: "prod_R0jPwyJ9IMrSOe",
    price: 249,
    discountedPrice: 199,
    duration: "year",
    description:
      "Unlimited Job Post, Auto Roll-over unused job posts, 500 Interviews/Month, Unlimited JD Creation and regeneration, Unlimited Resume Screening, Unlimited Question Generation",
  },
];

export const growthPlans = [
  {
    link: "https://pay.hireomatic.com/b/test_6oEcQQ6E071CbYc9AI",
    productId: "prod_R1mGLIVD8O45z6",
    price: 499,
    discountedPrice: 0,
    duration: "month",
    description:
      "Unlimited Job Post, Auto Roll-over unused job posts, 10 Interviews/Job, Unlimited JD Creation and regeneration, Unlimited Resume Screening, Unlimited Question Generation",
  },
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://pay.hireomatic.com/b/test_3csaII5zWdq04vK002"
        : "",
    productId: "prod_R1lcoxzNEp02s2",
    price: 499,
    discountedPrice: 399,
    duration: "year",
    description:
      "Unlimited Job Post, Auto Roll-over unused job posts, 10 Interviews/Job, Unlimited JD Creation and regeneration, Unlimited Resume Screening, Unlimited Question Generation",
  },
];

export const peakPlans = [
  {
    link: "https://pay.hireomatic.com/b/test_eVag326E0eu49Q4cMV",
    productId: "prod_R1mJ0EC7qZv6Nz",
    price: 999,
    discountedPrice: 799,
    duration: "month",
    description:
      "Unlimited Job Post, Auto Roll-over unused job posts, 10 Interviews/Job, Unlimited JD Creation and regeneration, Unlimited Resume Screening, Unlimited Question Generation",
  },
  {
    link: "https://pay.hireomatic.com/b/test_14kg32aUgclWe6kdQV",
    productId: "prod_R1lgQ7ElJIZxan",
    price: 11988,
    discountedPrice: 0,
    duration: "year",
    description:
      "Unlimited Job Post, Auto Roll-over unused job posts, 10 Interviews/Job, Unlimited JD Creation and regeneration, Unlimited Resume Screening, Unlimited Question Generation",
  },
];

export const payAsGoPlan = {
  link: "https://pay.hireomatic.com/b/test_dR6cQQe6s4Tufao7sy",
  productId: "prod_R1ljgTHjU7mtsg",
  price: 0,
  discountedPrice: 0,
  duration: "month",
  description:
    "Unlimited Job Post, 10 Interviews/Job, Unlimited JD Creation and regeneration, Unlimited Resume Screening, Unlimited Question Generation",
};

const UpgradePlan = () => {
  const [selectedDuration, setSelectedDuration] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<any>({});
  const [ClientSecret, setClientSecret] = useState("");
  const userData = retrieveValue("userData");
  const { isLoading, GetPlansDetails, CreatePaymentIntent } = AuthService();
  const [MonthlyData, setMonthlyData] = useState([]);
  const [YearlyData, setYearlyData] = useState([]);
  const [payAsYouGo, setPayAsYouGo] = useState([]);

  useEffect(() => {
    GetPlansDetails(
      (data) => {
        const monthlyPlans = data.planDetails.filter(
          (plan) => plan.duration === "monthly",
        );
        const yearlyData = data.planDetails.filter(
          (plan) => plan.duration === "annually",
        );
        const payAsYouGo = data.planDetails.filter(
          (plan) => plan.duration === "pay as you go",
        );
        setMonthlyData(monthlyPlans);
        setYearlyData(yearlyData);
        setPayAsYouGo(payAsYouGo);
        setCurrentPlan(data.subscriptionDetails);
        if (
          data.subscriptionDetails.planId === 2 ||
          data.subscriptionDetails.planId === 4 ||
          data.subscriptionDetails.planId === 6
        ) {
          setSelectedDuration(true);
        }
      },
      () => {},
    );
    CreatePaymentIntent((data) => {
      setClientSecret(data.clientSecret);
    });
  }, []);

  console.log(currentPlan, MonthlyData);

  return (
    <section>
      {isLoading && <LoaderMask />}
      <div className="px-4 sm:px-6">
        <div className="mb-6">
          <h2 className="font-manrope text-2xl text-center font-bold text-primary mb-3">
            Choose your plan{" "}
          </h2>
          <p className="text-gray-500 text-center leading-6 mb-3">
            Make your life easier by choosing Hiromatic.
          </p>
          <div className="flex justify-center items-center">
            <label className="min-w-[3.5rem] text-xl relative text-gray-900 mr-4 font-medium">
              Monthly
            </label>
            <input
              type="checkbox"
              id="basic-with-description"
              checked={selectedDuration}
              onChange={() => setSelectedDuration((prev) => !prev)}
              className="relative shrink-0 w-11 h-6 p-0.5 bg-primary/10 checked:bg-none checked:bg-primary/20 rounded-full cursor-pointer transition-colors ease-in-out duration-200  focus:border-blue-600  appearance-none before:inline-block before:w-5 before:h-5 before:bg-primary checked:before:bg-primary before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform  before:transition before:ease-in-out before:duration-200 "
            />
            <label className="relative min-w-[3.5rem] font-medium text-xl text-gray-500 ml-4 ">
              Yearly <span className="text-primary/80">(Save 20%)</span>
            </label>
          </div>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-4 sm:gap-6 xl:gap-8 lg:space-y-0 lg:items-center">
          {payAsYouGo.map((data, index) =>
            currentPlan.planId === data.id ? (
              <div
                className="flex flex-col text-gray-900 rounded-2xl bg-primary/10 transition-all duration-500 hover:bg-primary/20 "
                key={data.id}
              >
                <div className="uppercase bg-gradient-to-r from-primary/80 to-primary rounded-t-2xl p-3 text-center text-white">
                  Current Plan
                </div>
                <div className="p-6 xl:py-9 xl:px-12">
                  <h3 className="font-manrope text-2xl font-bold mb-3">
                    {data?.name}
                  </h3>
                  <div className="flex items-center mb-6">
                    <span className="font-manrope mr-2 text-2xl font-semibold">
                      ${data.price}
                    </span>
                    <span className="text-xl text-gray-500 ">/ month</span>
                  </div>
                  <ul className="mb-12 space-y-6 text-left text-lg ">
                    {data.description.split(", ").map((data, index) => (
                      <li className="flex items-center space-x-4" key={index}>
                        <svg
                          className="flex-shrink-0 w-6 h-6 text-primary"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                            stroke="currentColor"
                            stroke-width="1.6"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span>{data}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className="flex flex-col text-gray-900 rounded-2xl bg-gray-50 p-6 xl:py-9 xl:px-12 transition-all duration-500 hover:bg-gray-100"
              >
                <h3 className="font-manrope text-2xl font-bold mb-3">
                  {data?.name}
                </h3>
                <div className="flex items-center mb-6">
                  <span className="font-manrope mr-2 text-2xl font-semibold">
                    ${data.price}
                  </span>
                  <span className="text-xl text-gray-500 ">/ month</span>
                </div>
                <ul className="mb-12 space-y-6 text-left text-lg text-gray-500">
                  {data.description.split(", ").map((data, index) => (
                    <li className="flex items-center space-x-4" key={index}>
                      <svg
                        className="flex-shrink-0 w-6 h-6 text-primary"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                          stroke="currentColor"
                          stroke-width="1.6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span>{data}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          )}
          {!selectedDuration
            ? MonthlyData.map((data) =>
                currentPlan.planId === data.id ? (
                  <div
                    className="flex flex-col text-gray-900 rounded-2xl bg-primary/10 transition-all duration-500 hover:bg-primary/20 "
                    key={data.id}
                  >
                    <div className="uppercase bg-gradient-to-r from-primary/80 to-primary rounded-t-2xl p-3 text-center text-white">
                      MOST POPULAR
                    </div>
                    <div className="p-6 xl:py-9 xl:px-12">
                      <h3 className="font-manrope text-2xl font-bold mb-3">
                        {data?.name}
                      </h3>
                      <div className="flex items-center mb-6">
                        <span className="font-manrope mr-2 text-2xl font-semibold">
                          ${data.price}
                        </span>
                        <span className="text-xl text-gray-500 ">/ month</span>
                      </div>
                      <ul className="mb-12 space-y-6 text-left text-lg ">
                        {data.description.split(", ").map((data, index) => (
                          <li
                            className="flex items-center space-x-4"
                            key={index}
                          >
                            <svg
                              className="flex-shrink-0 w-6 h-6 text-primary"
                              viewBox="0 0 30 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                                stroke="currentColor"
                                stroke-width="1.6"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            <span>{data}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div
                    key={data.id}
                    className="flex flex-col text-gray-900 rounded-2xl bg-gray-50 p-6 xl:py-9 xl:px-12 transition-all duration-500 hover:bg-gray-100"
                  >
                    <h3 className="font-manrope text-2xl font-bold mb-3">
                      {data?.name}
                    </h3>
                    <div className="flex items-center mb-6">
                      <span className="font-manrope mr-2 text-2xl font-semibold">
                        ${data.price}
                      </span>
                      <span className="text-xl text-gray-500 ">/ month</span>
                    </div>
                    <ul className="mb-12 space-y-6 text-left text-lg text-gray-500">
                      {data.description.split(", ").map((data, index) => (
                        <li className="flex items-center space-x-4" key={index}>
                          <svg
                            className="flex-shrink-0 w-6 h-6 text-primary"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                              stroke="currentColor"
                              stroke-width="1.6"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <span>{data}</span>
                        </li>
                      ))}
                    </ul>
                    {data.name === "Starter" && currentPlan.planId === 7 ? (
                      <a
                        href={`${data?.paymentLink}?prefilled_email=${userData.email}&client_reference_id=${ClientSecret}`}
                        className="py-2.5 px-5 bg-primary shadow-sm rounded-full transition-all duration-500 text-base text-white font-semibold text-center w-fit mx-auto hover:bg-indigo-700"
                      >
                        Purchase Plan
                      </a>
                    ) : null}
                    {data.name === "Growth" &&
                    (currentPlan.planId !== 5 || currentPlan.planId !== 6) ? (
                      <a
                        href={`${data?.paymentLink}?prefilled_email=${userData.email}&client_reference_id=${ClientSecret}`}
                        className="py-2.5 px-5 bg-primary shadow-sm rounded-full transition-all duration-500 text-base text-white font-semibold text-center w-fit mx-auto hover:bg-indigo-700"
                      >
                        Purchase Plan
                      </a>
                    ) : null}

                    {data.name === "Peak" && (
                      <a
                        href={`${data?.paymentLink}?prefilled_email=${userData.email}&client_reference_id=${ClientSecret}`}
                        className="py-2.5 px-5 bg-primary shadow-sm rounded-full transition-all duration-500 text-base text-white font-semibold text-center w-fit mx-auto hover:bg-indigo-700"
                      >
                        Purchase Plan
                      </a>
                    )}
                  </div>
                ),
              )
            : YearlyData.map((data) =>
                currentPlan.planId === data.id ? (
                  <div
                    className="flex flex-col text-gray-900 rounded-2xl bg-primary/10 transition-all duration-500 hover:bg-primary/20 "
                    key={data.id}
                  >
                    <div className="uppercase bg-gradient-to-r from-primary/80 to-primary rounded-t-2xl p-3 text-center text-white">
                      MOST POPULAR
                    </div>
                    <div className="p-6 xl:py-9 xl:px-12">
                      <h3 className="font-manrope text-2xl font-bold mb-3">
                        {data?.name}
                      </h3>
                      <div className="flex items-center mb-6">
                        <span className="font-manrope mr-2 text-xl font-light text-neutral-500 line-through">
                          ${data.price}
                        </span>
                        <span className="font-manrope mr-2 text-2xl font-semibold">
                          ${data.discountedPrice}
                        </span>
                        <span className="text-xl text-gray-500 ">/ month</span>
                      </div>
                      <ul className="mb-12 space-y-6 text-left text-lg ">
                        {data.description.split(", ").map((data, index) => (
                          <li
                            className="flex items-center space-x-4"
                            key={index}
                          >
                            <svg
                              className="flex-shrink-0 w-6 h-6 text-primary"
                              viewBox="0 0 30 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                                stroke="currentColor"
                                stroke-width="1.6"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            <span>{data}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div
                    key={data.id}
                    className="flex flex-col text-gray-900 rounded-2xl bg-gray-50 p-6 xl:py-9 xl:px-12 transition-all duration-500 hover:bg-gray-100"
                  >
                    <h3 className="font-manrope text-2xl font-bold mb-3">
                      {data?.name}
                    </h3>
                    <div className="flex items-center mb-6">
                      <span className="font-manrope mr-2 text-xl font-light text-neutral-500 line-through">
                        ${data.price}
                      </span>
                      <span className="font-manrope mr-2 text-2xl font-semibold">
                        ${data.discountedPrice}
                      </span>
                      <span className="text-xl text-gray-500 ">/ month</span>
                    </div>
                    <ul className="mb-12 space-y-6 text-left text-lg text-gray-500">
                      {data.description.split(", ").map((data, index) => (
                        <li className="flex items-center space-x-4" key={index}>
                          <svg
                            className="flex-shrink-0 w-6 h-6 text-primary"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                              stroke="currentColor"
                              stroke-width="1.6"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <span>{data}</span>
                        </li>
                      ))}
                    </ul>
                    {data.name === "Starter" && currentPlan.planId === 7 ? (
                      <a
                        href={`${data?.paymentLink}?prefilled_email=${userData.email}&client_reference_id=${ClientSecret}`}
                        className="py-2.5 px-5 bg-primary shadow-sm rounded-full transition-all duration-500 text-base text-white font-semibold text-center w-fit mx-auto hover:bg-indigo-700"
                      >
                        Purchase Plan
                      </a>
                    ) : null}
                    {data.name === "Growth" &&
                    (currentPlan.planId !== 5 || currentPlan.planId !== 6) ? (
                      <a
                        href={`${data?.paymentLink}?prefilled_email=${userData.email}&client_reference_id=${ClientSecret}`}
                        className="py-2.5 px-5 bg-primary shadow-sm rounded-full transition-all duration-500 text-base text-white font-semibold text-center w-fit mx-auto hover:bg-indigo-700"
                      >
                        Purchase Plan
                      </a>
                    ) : null}

                    {data.name === "Peak" && (
                      <a
                        href={`${data?.paymentLink}?prefilled_email=${userData.email}&client_reference_id=${ClientSecret}`}
                        className="py-2.5 px-5 bg-primary shadow-sm rounded-full transition-all duration-500 text-base text-white font-semibold text-center w-fit mx-auto hover:bg-indigo-700"
                      >
                        Purchase Plan
                      </a>
                    )}
                  </div>
                ),
              )}
        </div>
      </div>
    </section>
  );
};

export default UpgradePlan;
