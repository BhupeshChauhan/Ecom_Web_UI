import { ArrowUp, ArrowDown, TriangleAlert } from "lucide-react";

const StatCard = ({ title, value, change, changeType, subtitle }) => {
  const changeColors = {
    positive: "bg-[#edf7ed] text-[#1d4620]",
    negative: "bg-[#ffeaeb] text-[#d74544]",
    warning: "bg-[#fff5d5] text-[#c27317]",
  };

  return (
    <div className="grow shrink basis-0 p-4 bg-white rounded-xl border border-[#e3eaee] flex-col justify-start items-start gap-[22px] inline-flex min-w-[180px]">
      <div className="self-stretch text-[#4e5760] text-sm font-normal font-['Golos Text']">
        {title}
      </div>
      <div className="self-stretch justify-start items-end gap-2 inline-flex">
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex">
          <div className="justify-center items-center gap-1 inline-flex">
            <div className="text-[#020c17] text-2xl font-normal font-['Golos Text'] leading-normal">
              {value}
            </div>
            <div
              className={`px-1 py-0.5 rounded justify-center items-center gap-0.5 flex ${changeColors[changeType]}`}
            >
              <div className="text-xs font-medium font-['Golos Text'] leading-none">
                {changeType === "positive" && (
                  <ArrowUp
                    size={12}
                    color="#0BBB59"
                    strokeWidth={3}
                    className="inline"
                  />
                )}
                {changeType === "negative" && (
                  <ArrowDown
                    size={12}
                    color="#FF3C3B"
                    strokeWidth={3}
                    className="inline"
                  />
                )}
                {changeType === "warning" && (
                  <>
                    <TriangleAlert
                      size={12}
                      color="#FFBA1F"
                      strokeWidth={3}
                      className="inline"
                    />{" "}
                    {change ? change : ""}
                  </>
                )}
                {changeType !== "warning" && `${change}%`}
              </div>
            </div>
          </div>
          {subtitle && (
            <div className="text-[#899198] text-xs font-normal font-['Golos Text'] leading-none">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
