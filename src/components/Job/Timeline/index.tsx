const Timeline = ({ jobDetails }) => {
  return (
    <div>
      <ol className="border-s border-neutral-300 dark:border-neutral-500 md:flex md:justify-center md:gap-6 md:border-s-0 md:border-t ml-0 list-none">
        <li>
          <div className="flex-start flex items-center pt-2 md:block md:pt-0">
            <div className="-ms-[5px] me-3 h-[9px] w-[9px] rounded-full bg-neutral-300 md:-mt-[5px] md:me-0 md:ms-0"></div>
            <span>{jobDetails?.applicationStats?.applied | 0}</span>
            <p className="text-sm text-neutral-500 dark:text-neutral-300 mt-0">
              Applied{" "}
            </p>
          </div>
        </li>

        <li>
          <div className="flex-start flex items-center pt-2 md:block md:pt-0">
            <div className="-ms-[5px] me-3 h-[9px] w-[9px] rounded-full bg-neutral-300 md:-mt-[5px] md:me-0 md:ms-0"></div>
            <span>
              {jobDetails?.applicationStats?.["interview-pending"] | 0}
            </span>
            <p className="text-sm text-neutral-500 dark:text-neutral-300 mt-0">
              Evalution Pending{" "}
            </p>
          </div>
        </li>

        <li>
          <div className="flex-start flex items-center pt-2 md:block md:pt-0">
            <div className="-ms-[5px] me-3 h-[9px] w-[9px] rounded-full bg-neutral-300 md:-mt-[5px] md:me-0 md:ms-0"></div>
            <span>{jobDetails?.applicationStats?.["interview-done"] | 0}</span>
            <p className="text-sm text-neutral-500 dark:text-neutral-300 mt-0">
              Evalution Done{" "}
            </p>
          </div>
        </li>

        <li>
          <div className="flex-start flex items-center pt-2 md:block md:pt-0">
            <div className="-ms-[5px] me-3 h-[9px] w-[9px] rounded-full bg-neutral-300 md:-mt-[5px] md:me-0 md:ms-0"></div>
            <span>{jobDetails?.applicationStats?.rejected | 0}</span>
            <p className="text-sm text-neutral-500 dark:text-neutral-300 mt-0">
              Rejected{" "}
            </p>
          </div>
        </li>

        <li>
          <div className="flex-start flex items-center pt-2 md:block md:pt-0">
            <div className="-ms-[5px] me-3 h-[9px] w-[9px] rounded-full bg-neutral-300 md:-mt-[5px] md:me-0 md:ms-0"></div>
            <span>{jobDetails?.applicationStats?.shortlisted | 0}</span>
            <p className="text-sm text-neutral-500 dark:text-neutral-300 mt-0">
              Shortlisted{" "}
            </p>
          </div>
        </li>
      </ol>
    </div>
  );
};

export default Timeline;
