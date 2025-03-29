import { Button } from "@dashflowx/core";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ title }) => {
  return (
    <div className="flex justify-between pt-3 mx-1 mb-0">
      <h3 className="mb-0">Welcome, {title}!</h3>
      <div className="flex">
        <Link rel="noopener noreferrer" to="/jobs/create">
          <Button variant="solid" color="primary" className="text-sm p-2 py-1">
            <Plus className="mr-2 w-4" /> Create App
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
