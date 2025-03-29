import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface LineChartCardProps {
  data: {
    data: Array<{ month: string; scheduled: number; completed: number }>;
    percentage: string;
  };
  title: string;
  percentage: string;
}
const LineChartCard = React.memo(
  ({ data, title, percentage }: LineChartCardProps) => {
    return (
      <div className="grow shrink basis-0  pt-4 pb-6 bg-white rounded-xl border border-[#e3eaee] flex-col justify-start items-start gap-4 inline-flex w-[300px] h-[300px]">
        <div className="self-stretch px-4 h-11 flex-col justify-start items-start gap-1 flex">
          <div className="self-stretch text-[#4e5760] text-sm font-normal font-['Golos Text'] leading-none">
            {title}
          </div>
          <div className="justify-center items-center gap-0.5 inline-flex">
            <div className="text-[#020c17] text-base font-medium font-['Golos Text'] leading-normal">
              {data?.percentage}%
            </div>
            <div className="w-4 h-4 justify-center items-center flex">
              <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
            </div>
          </div>
        </div>

        <LineChart width={300} height={200} data={data?.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" axisLine={false} />
          <YAxis axisLine={false} />
          <Tooltip />
          <Legend />

          <Line
            type="basis"
            dataKey="scheduled"
            stroke="#4E5760"
            name="Scheduled"
            legendType="circle"
          />
          <Line
            type="basis"
            dataKey="completed"
            stroke="#FF7233"
            name="Completed"
            legendType="circle"
          />
        </LineChart>
      </div>
    );
  },
);

export default LineChartCard;
