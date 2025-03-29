import { Button } from "@dashflowx/core";
import { FileIcon, UploadIcon } from "lucide-react";
import { useRef } from "react";
import { cn } from "../../../utils";

export default function UploadComponet({
  selectedFiles,
  setSelectedFiles,
  error,
  setError,
  multiple = false,
  acceptedFileExtensions = ["jpg", "png", "jpeg"],
}: any) {
  const fileInputRef = useRef(null);

  const acceptedFileTypesString = acceptedFileExtensions
    .map((ext) => `.${ext}`)
    .join(",");

  const handleFileChange = (event) => {
    const newFilesArray = Array.from(event.target.files);
    processFiles(newFilesArray);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const processFiles = (filesArray) => {
    const newSelectedFiles = [...selectedFiles];
    let hasError = false;
    const fileTypeRegex = new RegExp(acceptedFileExtensions.join("|"), "i");
    filesArray.forEach((file) => {
      if (newSelectedFiles.some((f) => f.name === file.name)) {
        setError("File names must be unique");
        hasError = true;
      } else if (!fileTypeRegex.test(file.name.split(".").pop())) {
        setError(`Only ${acceptedFileExtensions.join(", ")} files are allowed`);
        hasError = true;
      } else {
        newSelectedFiles.push(file);
      }
    });

    if (!hasError) {
      setError("");
      setSelectedFiles(newSelectedFiles);
    }
  };

  const handleCustomButtonClick = () => {
    // Trigger the click event of the hidden file input
    fileInputRef.current.click();
  };

  const handleFileDelete = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };
  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-5xl bg-white">
        <div
          className={cn(
            "grid grid-cols-1 gap-4 ",
            multiple ? "md:grid-cols-2" : "md:grid-cols-1",
          )}
        >
          <div
            className={cn(
              "min-h-[23rem] border-4 border-dashed border-primary bg-slate-100 rounded-3xl p-4 flex flex-col justify-center items-center space-y-4",
              multiple ? "flex" : selectedFiles[0] ? "hidden" : "flex",
            )}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e)}
          >
            <UploadIcon />
            <p className="text-lg font-semibold mb-0">
              Drag and Drop the files
            </p>
            {multiple && <p className="text-lg mt-0">10 Files at max</p>}

            <p className="text-lg font-bold">or</p>
            <Button
              variant="solid"
              color="primary"
              onClick={handleCustomButtonClick}
            >
              Select File
            </Button>
            <input
              type="file"
              id="files"
              name="files"
              multiple={multiple}
              accept={acceptedFileTypesString}
              ref={fileInputRef}
              max={10}
              className="hidden"
              onChange={handleFileChange}
              onClick={(event: any) => {
                // Reset the input value to allow selecting the same file again
                event.target.value = null;
              }}
            />
          </div>

          {multiple ? (
            <div className="border-2 border-gray-300 rounded-3xl py-4 max-h-[23rem] overflow-auto">
              {selectedFiles.length > 0 ? (
                <ul className="px-4">
                  {selectedFiles.map((file, index) => (
                    <li
                      key={file.name}
                      className="flex justify-between items-center border-b py-2"
                    >
                      <div className="flex items-center">
                        <FileIcon className="w-6 h-6 mr-2" />
                        <span className="text-base">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleFileDelete(index)}
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="none"
                          className="w-6 h-6"
                        >
                          <path
                            stroke="currentColor"
                            stroke-width="2"
                            d="M6 4l8 8M14 4l-8 8"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="h-full flex justify-center items-center">
                  <p className="text-lg font-semibold text-gray-500 text-center">
                    No Files Uploaded Yet
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              {selectedFiles[0] && (
                <>
                  <li
                    key={selectedFiles[0]?.name}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <div className="flex items-center">
                      <FileIcon className="w-6 h-6 mr-2" />
                      <span className="text-base">
                        {selectedFiles[0]?.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleFileDelete(0)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="w-6 h-6"
                      >
                        <path
                          stroke="currentColor"
                          stroke-width="2"
                          d="M6 4l8 8M14 4l-8 8"
                        />
                      </svg>
                    </button>
                  </li>
                </>
              )}
            </>
          )}
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}
