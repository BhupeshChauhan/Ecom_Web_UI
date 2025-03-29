export const ReadonlyFormSection = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <div className="self-stretch h-[76px] flex-col justify-start items-start gap-2 flex mb-2">
      <div className="justify-center items-center gap-1 inline-flex">
        <div className="text-[#4e5760] text-base font-medium font-['Golos Text'] leading-tight">
          {title}
        </div>
      </div>
      <div className="self-stretch px-4 py-3 rounded-lg border border-[#e3eaee] justify-center items-center gap-2.5 inline-flex">
        <div className="grow shrink basis-0 text-[#020c17] text-base font-normal font-['Golos Text'] leading-normal">
          {value}
        </div>
        <div className="w-6 h-6 relative" />
      </div>
    </div>
  );
};
