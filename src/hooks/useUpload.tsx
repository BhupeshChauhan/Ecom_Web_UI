import { useState } from "react";
import UploadComponet from "../components/Job/Upload";

interface iUploadComponent {
  multiple: boolean;
  acceptedFileExtensions: string[];
}
const useUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");

  const UploadComponent = ({
    multiple,
    acceptedFileExtensions,
  }: iUploadComponent) => {
    return (
      <UploadComponet
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        error={error}
        setError={setError}
        multiple={multiple}
        acceptedFileExtensions={acceptedFileExtensions}
      />
    );
  };
  return { selectedFiles, setSelectedFiles, setError, UploadComponent };
};

export default useUpload;
