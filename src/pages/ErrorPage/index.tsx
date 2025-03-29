import { Button, TypographyComp } from "@dashflowx/core";
import { FlagIcon } from "lucide-react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="bg-white m-[10px] rounded-3xl h-[calc(100vh-20px)] mx-auto grid place-items-center text-center px-8">
      <div className="flex flex-col items-center justify-center">
        <FlagIcon className="w-20 h-20 mx-auto" />
        <TypographyComp
          as="h1"
          color="blue-gray"
          className="mt-10 !text-3xl !leading-snug md:!text-4xl text-center font-bold"
        >
          Error 500 <br /> It looks like something went wrong.
        </TypographyComp>
        <TypographyComp className=" text-center mt-8 mb-14 text-[18px] text-gray-500 mx-auto md:max-w-sm font-light">
          Don&apos;t worry, our team is already on it.Please try refreshing the
          page or come back later.
        </TypographyComp>
        <Link to="/dashboard">
          <Button
            variant="solid"
            color="primary"
            className="w-full px-4 md:w-[8rem]"
          >
            Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
