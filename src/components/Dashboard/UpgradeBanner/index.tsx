import { Link } from "react-router-dom";

const UpgradeBanner = () => {
  return (
    <div className="self-stretch p-6 bg-[#fff1eb] rounded-xl border border-[#ffdccc] justify-start items-start gap-6 inline-flex">
      <img src="/rocket.png" height={50} width={50} />
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
        <div className="self-stretch h-[88px] flex-col justify-start items-start gap-1 flex">
          <div className="self-stretch text-[#020c17] text-base font-medium font-['Golos Text'] leading-normal">
            Keep hiring process going!
          </div>
          <div className="self-stretch text-[#020c17] text-sm font-normal font-['Golos Text'] leading-tight">
            To be sure, your hiring process goes smoothly and with no frictions,
            upgrade your plan to get more AI capacity.
          </div>
        </div>
        <div className="px-3 py-1.5 bg-[#ff4f01] rounded-lg justify-center items-center gap-2 inline-flex cursor-pointer">
          <Link to="/settings/users">
            <div className="text-white text-sm font-semibold font-['Golos Text'] leading-normal ">
              Upgrade plan
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default UpgradeBanner;
