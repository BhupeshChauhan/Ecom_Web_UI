import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../utils";

const CompanyLogo = ({
  logoUrl,
  companyName,
  imageClassName,
  className,
}: any) => {
  const [ImageFallback, setImageFallback] = useState(true);

  if (!logoUrl) {
    return (
      <div>
        {companyName ? (
          <div
            className={cn(
              "flex items-center justify-center h-40 w-64 bg-slate-200 font-serif text-3xl",
              className,
            )}
          >
            {companyName}
          </div>
        ) : (
          <div
            className={cn(
              "flex items-center justify-center h-40 w-64 bg-slate-100 rounded-lg",
              className,
            )}
          >
            <UploadCloud className="w-28 h-28 text-slate-300" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {ImageFallback ? (
        <img
          src={logoUrl}
          alt={companyName}
          className={cn("h-40 w-64", imageClassName)}
          onError={() => setImageFallback(false)}
        />
      ) : (
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-200">
          {companyName}
        </div>
      )}
    </div>
  );
};

export default CompanyLogo;
