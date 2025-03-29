import { DfxStats } from "@dashflowx/ui";
import { Button } from "@dashflowx/core";
import { Link } from "react-router-dom";

const HrpDashboard = () => {
  const sectionItems = [
    {
      content: (
        <div className="flex items-center p-4 m-4 bg-white rounded">
          <div className="flex-grow flex flex-col text-center">
            <span className="text-md text-gray-500">Open Positions</span>
            <span className="text-2xl font-bold">40</span>
          </div>
        </div>
      ),
    },
    {
      content: (
        <div className="flex items-center p-4 m-4 bg-white rounded">
          <div className="flex-grow flex flex-col text-center">
            <span className="text-md text-gray-500">Closed Positions</span>
            <span className="text-2xl font-bold">21</span>
          </div>
        </div>
      ),
    },
    {
      content: (
        <div className="flex items-center p-4 m-4 bg-white rounded">
          <div className="flex-grow flex flex-col text-center">
            <span className="text-md text-gray-500">Top Applicants</span>
            <span className="text-2xl font-bold">4000</span>
          </div>
        </div>
      ),
    },
    {
      content: (
        <div className="flex items-center p-4 m-4 bg-white rounded">
          <div className="flex-grow flex flex-col text-center">
            <span className="text-md text-gray-500">Assignments Completed</span>
            <span className="text-2xl font-bold">1000</span>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="p-6 bg-slate-100 rounded-lg">
      <div className="flex justify-between">
        <Link to="/jobs/create">
          <Button variant="solid" color="primary">
            Create Position
          </Button>
        </Link>
        <div>
          <Button variant="ghost">Week</Button>
          <Button variant="ghost" className="text-black">
            Month
          </Button>
          <Button variant="ghost" className="text-black">
            YTD
          </Button>
        </div>
      </div>
      <DfxStats
        variant="basic"
        items={sectionItems}
        className="py-4 px-0 lg:px-0 w-full"
        itemContainerClassName="w-full gap-6"
        itemClassName="justify-center"
      />
    </div>
  );
};

export default HrpDashboard;
