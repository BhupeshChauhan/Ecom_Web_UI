import ReactPlayer from "react-player";

const VideoPlayer = () => {
  return (
    <div className="aspect-video  mb-14">
      <ReactPlayer
        width="100%"
        height="100%"
        stopOnUnmount={false}
        playing={true}
        loop={true}
        className="h-full w-full"
        url="https://res.cloudinary.com/zapier-media/video/upload/f_auto,q_auto/v1706042175/Homepage%20ZAP%20Jan%2024/012324_Homepage_Hero1_1920x1080_pwkvu4.mp4"
      />
    </div>
  );
};

export default VideoPlayer;
