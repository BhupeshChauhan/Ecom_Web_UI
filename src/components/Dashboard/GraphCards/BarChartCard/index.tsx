import React from "react";
import { BarChart, Bar, XAxis, LabelList, Label, Tooltip } from "recharts";

interface BarChartCardProps {
  data: Array<{ label: string; count: number }>;
  title: string;
}
const BarChartCard = React.memo(({ data, title }: BarChartCardProps) => {
  return (
    <div className="p-4 bg-white rounded-xl border border-[#e3eaee] flex-col justify-start items-start gap-[0px] inline-flex w-[300px] h-[300px]">
      <div className="self-stretch text-[#4e5760] text-sm font-normal font-['Golos Text']">
        {title}
      </div>
      <div className="self-stretch justify-start items-end gap-4 inline-flex">
        <BarChart width={320} height={250} data={data} barSize={40}>
          <Tooltip />
          <Bar dataKey="count" fill="#FF7233" radius={[6, 6, 0, 0]}>
            <LabelList dataKey="count" position="top" />
          </Bar>
          <XAxis dataKey="label" axisLine={false}>
            <Label offset={0} position="insideBottom" />
          </XAxis>
        </BarChart>
      </div>
    </div>
  );
});

export default BarChartCard;
