import { useRef } from "react";
import ImageCropper from "./ImageCropper";

const UploadLogoComp = ({ setOpenModal, UploadLogo }: any) => {
  const avatarUrl = useRef(
    "https://avatarfiles.alphacoders.com/161/161002.jpg",
  );
  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };
  return (
    <>
      <ImageCropper
        updateAvatar={updateAvatar}
        closeModal={() => setOpenModal(false)}
        UploadLogo={UploadLogo}
      />
    </>
  );
};

export default UploadLogoComp;
