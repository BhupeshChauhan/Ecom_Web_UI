import { useRef } from "react";
import ImageCropper from "./ImageCropper";

const UploadProfileImageComp = ({ setOpenModal, UploadProfileImage }: any) => {
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
        UploadProfileImage={UploadProfileImage}
      />
    </>
  );
};

export default UploadProfileImageComp;
