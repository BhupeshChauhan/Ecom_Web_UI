import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen z-10">
      <div className="relative inline-flex">
        <div className="w-8 h-8 bg-primary rounded-full"></div>
        <div className="w-8 h-8 bg-primary rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-8 h-8 bg-primary rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </div>
  );
};

export const LoaderMask = () => {
  return (
    <div
      className="fixed top-0 right-0 flex justify-center items-center h-screen w-screen z-[60] bg-black/70"
      style={{ zIndex: 500 }}
    >
      <div className="relative inline-flex">
        <div className="w-8 h-8 bg-primary rounded-full"></div>
        <div className="w-8 h-8 bg-primary rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-8 h-8 bg-primary rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </div>
  );
};

export const LoadingCompoent = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-400px)] w-full">
      <div className="relative inline-flex">
        <div className="w-8 h-8 bg-primary rounded-full"></div>
        <div className="w-8 h-8 bg-primary rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-8 h-8 bg-primary rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;
