import { memo } from "react";

export const ProfilePhotoSection = memo(() => (
  <div className="justify-start items-center gap-4 inline-flex">
    <div className="w-20 h-20 bg-[#e3eaee] rounded-[220px] justify-center items-center flex">
      <div className="text-center text-[#4e5760] text-2xl font-medium font-['Golos Text']">
        AM
      </div>
    </div>
    <div className="w-[153px] flex-col justify-start items-start gap-2 inline-flex">
      <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium">
        Upload photo
      </button>
      <div className="w-[1232px] h-6 text-[#899198] text-sm font-normal font-['Golos Text'] leading-normal">
        JPG, PNG or GIF. Max size of 5MB
      </div>
    </div>
  </div>
));
