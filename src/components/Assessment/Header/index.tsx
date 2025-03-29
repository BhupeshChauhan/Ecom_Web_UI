import CompanyLogo from "../../Auth/CompanyLogo";

const AssessmentHeader = ({ jobDetails, Colors, applicantDetails }) => {
  return (
    <>
      <div className="flex justify-between w-full items-center border-b-1 mb-6">
        <CompanyLogo
          logoUrl={jobDetails?.clientDetails?.logoUrl || null}
          companyName={jobDetails?.clientDetails?.name}
          className="h-16 text-md w-fit p-2"
          imageClassName="h-[80px] w-[80px] rounded-lg w-fit"
        />
        <div className="flex flex-col items-end text-lg">
          <div style={{ fontSize: 30, fontWeight: "bold" }}>
            AI Assessment Round
          </div>
        </div>
      </div>

      <div
        style={{
          fontSize: 20,
          fontWeight: "bold",
          paddingBottom: 0,
          color: Colors.newBlack,
        }}
        className="mb-6"
      >
        Hello,{" "}
        <span className="text-primary">
          {applicantDetails?.user?.users?.name}
        </span>
      </div>
      <div
        className="w-full text-start mb-6"
        style={{ fontSize: 20, color: "#BBBBBB" }}
      >
        This screening will cover your communication skills as well as your
        technical skills for the role of{" "}
        <span style={{ color: Colors.newBlack, fontWeight: "bold" }}>
          {jobDetails?.title}
        </span>{" "}
        for {jobDetails?.clientDetails?.name}.
      </div>
      <div className="border-[1px] border-slate-100 m-2"></div>
    </>
  );
};

export default AssessmentHeader;
