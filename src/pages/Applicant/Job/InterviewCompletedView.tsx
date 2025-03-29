import { retrieveValue } from "../../../utils";

const InterviewCompletedView = () => {
  const jobDetails = retrieveValue("jobDetails");
  return (
    <div
      className="completion-screen flex flex-col justify-center font-sans bg-white min-h-screen p-4 md:p-8 lg:p-12"
    >
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary text-center">
          Thank you for taking the time to complete our AI assessment interview.
        </h1>

        <div className="next-steps mt-4 md:mt-6 lg:mt-8">
          <p className="mt-2 text-gray-700 font-serif text-sm md:text-base">
            Our team will now review your responses. This process may take a few
            hours.
          </p>
          <p className="mt-2 text-gray-700 font-serif text-sm md:text-base">
            We will inform you about the next steps in the hiring process. You may
            be contacted for follow-up interviews or receive further instructions
            via email.
          </p>
        </div>

        <div className="thank-you mt-4 md:mt-6 lg:mt-8 text-gray-700">
          <p className="text-sm md:text-base">
            We appreciate your interest in joining our team and your effort in
            completing this interview. We will get back to you soon with the next
            steps.
          </p>
        </div>

        <div className="contact mt-4 md:mt-6 lg:mt-8 text-gray-700">
          {jobDetails?.clientDetails?.companyEmail && (
            <p className="text-sm md:text-base">
              If you have any questions or need further assistance, please don't
              hesitate to contact us at {jobDetails?.clientDetails?.companyEmail}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewCompletedView;
