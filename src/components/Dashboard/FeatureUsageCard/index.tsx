import { TriangleAlert } from "lucide-react";

const FeatureUsageItem = ({
  src,
  title,
  usage,
  remaining,
  total,
  bgColor = "bg-[#f8f8f8]",
  warning = false,
}) => {
  // Calculate the percentage filled (0-1)
  const percentageFilled = remaining / total;

  // Calculate how many full segments we need (0-5)
  const fullSegments = Math.floor(percentageFilled * 5);

  // Calculate the partial fill for the last segment (0-1)
  const partialFill = (percentageFilled * 5) % 1;

  const segments = Array(5).fill(null);

  return (
    <div className="self-stretch justify-start items-center gap-3 inline-flex">
      <div
        className={`p-2 ${bgColor} rounded-[66px] flex-col justify-center items-center gap-[6.67px] inline-flex`}
      >
        <img src={src} height={20} width={20} />
      </div>
      <div className="grow shrink basis-0 flex-col justify-center items-start gap-2 inline-flex">
        <div className="self-stretch justify-between items-center inline-flex">
          <div className="text-[#020c17] text-sm font-medium font-['Golos Text'] leading-none">
            {warning ? (
              <TriangleAlert
                size={12}
                strokeWidth={3}
                className="inline"
                color="#c27317"
              />
            ) : null}{" "}
            {title}
          </div>
          {usage !== undefined ? (
            <div>
              <span className="text-[#4e5760] text-xs font-normal font-['Golos Text'] leading-none">
                Used
              </span>
              <span className="text-[#020c17] text-xs font-medium font-['Golos Text'] leading-none">
                {" " + usage}
              </span>
            </div>
          ) : (
            <div>
              <span className="text-[#4e5760] text-xs font-normal font-['Golos Text'] leading-none">
                remaining
              </span>
              <span className="text-[#020c17] text-xs font-medium font-['Golos Text'] leading-none">
                {" " + remaining}
              </span>
              <span className="text-[#4e5760] text-xs font-normal font-['Golos Text'] leading-none">
                {` of ${total}`}
              </span>
            </div>
          )}
        </div>
        <div className="self-stretch h-1.5 justify-start items-start gap-0.5 inline-flex">
          {segments.map((_, index) => {
            // Determine if this segment should be partially filled
            const isPartialSegment = index === fullSegments;
            const isActiveSegment = index < fullSegments || isPartialSegment;

            return (
              <div
                key={index}
                className={`grow shrink basis-0 self-stretch rounded-[99px] justify-start items-start gap-0.5 flex relative overflow-hidden`}
              >
                {isPartialSegment ? (
                  <>
                    <div
                      className={`absolute inset-0 ${warning ? "bg-[red]" : "bg-[#333333]"}`}
                      style={{ width: `${partialFill * 100}%` }}
                    />
                    <div
                      className={`absolute inset-0 ${warning ? "bg-[#333333]" : "bg-[#333333]"} opacity-20`}
                      style={{ left: `${partialFill * 100}%` }}
                    />
                  </>
                ) : (
                  <div
                    className={`absolute inset-0 ${"bg-[#333333]"} 
                         ${!isActiveSegment ? "opacity-20" : ""}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const FeatureUsageCard = ({ data }) => {
  const srcMapping = {
    "AI interviews": "/thought.png",
    "AI job description": "/write.png",
    "Assessment report": "/graphup.png",
    "Resume matching": "/thumbsup.png",
  };

  const defaultSrc = "/star.png";

  const featuresWithSrc = data?.map((feature) => ({
    ...feature,
    src: srcMapping[feature.title] || defaultSrc,
  }));

  return (
    <div className="self-stretch  p-4 bg-white rounded-xl border border-[#e3eaee] flex-col justify-center items-start gap-5 flex">
      <div className="self-stretch text-[#4e5760] text-sm font-medium font-['Golos Text'] leading-none">
        Key features usage
      </div>
      {featuresWithSrc?.map((feature, index) => (
        <FeatureUsageItem key={index} {...feature} />
      ))}
    </div>
  );
};

export default FeatureUsageCard;
