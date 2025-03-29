  import { useNavigate } from "react-router-dom";
  import { Datagrid, UseDataGrid } from "@dashflowx/datagrid";
  import { retrieveValue } from "../../utils";
  import { LoaderMask } from "../Loader";
  import { useEffect, useState } from "react";
  import { ErrorPopUp } from "../../utils/AlearUtils";
import { ActiveJobsCard } from "../Job/Cards/JobCard/ActiveJobsCard";
import NoData from "../Nodata";
  
const AppsDataGrid = () => {
    const navigate = useNavigate();
    const token = retrieveValue("accessToken");
    const { handleReload, error } = UseDataGrid();
    const [firstRender, setFirstRender] = useState(true);
  
  
    useEffect(() => {
      if (error?.message === "Session Expired") {
        localStorage.clear();
        navigate(`/`);
        ErrorPopUp(error.message);
      }
    }, [error]);
  
    useEffect(() => {
      if (firstRender) {
        setFirstRender(false);
      }
      if (!firstRender) {
        console.log("here");
        handleReload(
          `${import.meta.env.VITE_API_JOB_BASE_URI}/jobs/list-jobs?status=${status}`,
          token,
        );
      }
    }, [status]);
  
    return (
      <div>
        {/* {isLoading && <LoaderMask />} */}
        <Datagrid
          listColumns={[]}
          CardComponent={ActiveJobsCard}
          variant="ssr2"
          getApi={``}
          defaultView="grid"
          unableDefaultSort={true}
          showSelectAction={false}
          showChangeButton={false}
          auth={token}
          noDataComp={<NoData />}
        />
      </div>
    );
  };
  
  export default AppsDataGrid;
  