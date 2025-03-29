import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { Button } from "@dashflowx/core";
import InterviewService from "../../../Api/InterviewService";
import CompanyLogo from "../../../components/Auth/CompanyLogo";
import { retrieveValue } from "../../../utils";
import { Clock, Dot, Timer } from "lucide-react";
import { LoaderMask } from "../../../components/Loader";
import useModal from "../../../hooks/useModal";
import { UnsavedChangesModal } from "../../../components/Form/BasicJobForm/UnsavedChangesModal";

// Define the shape of the question object
interface Question {
  id: number;
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

interface LocationState {
  state: {
    questions: Question[];
  };
}
const VideoScreening = () => {
  const navigate = useNavigate();
  const { openModal, setOpenModal, ModalComp } = useModal();
  const jobDetails = retrieveValue("jobDetails");
  const applicantDetails = retrieveValue("applicantDetails");
  const Location = useLocation() as LocationState;
  const { questions } = Location.state;
  const timeForEachQueston = 120; // 120s
  const [timeLeft, setTimeLeft] = useState(timeForEachQueston);
  const [CompletedInterview, setCompletedInterview] = useState(false);
  const [interviewQn, setInterviewQn] = useState<Question[]>(
    questions.length ? questions : [],
  );
  const [qnIndex, setQnIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [duration, setDuration] = useState(0);
  const [nextButtonEnabled, setNextButtonEnabled] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const audioRecorder = useRef<MediaRecorder | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [videoStream, setvideoStream] = useState<MediaStream | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [permission, setPermission] = useState(false);

  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  const [Loading, setLoading] = useState(false);
  const {
    isLoading,
    AudioUploadAPI,
    VideoUploadAPI,
    StartInterview,
    InterviewComplete,
  } = InterviewService();

  const startVideoRecording = (stream: MediaStream) => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: "video/mp4",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleVideoDataAvailable,
    );
    mediaRecorderRef.current.start();
  };

  const handleVideoDataAvailable = ({ data }: BlobEvent) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  };

  const startAudioRecording = async (stream: MediaStream) => {
    setIsRecording(true);
    audioRecorder.current = new MediaRecorder(stream, {
      mimeType: "audio/webm",
    });
    audioRecorder.current.addEventListener(
      "dataavailable",
      handleAudioDataAvailable,
    );
    audioRecorder.current.start();
  };

  const handleAudioDataAvailable = ({ data }: BlobEvent) => {
    if (data.size > 0) {
      setAudioChunks((prev) => prev.concat(data));
    }
  };

  const stopVideoRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
      mediaRecorderRef.current.onstop = function () {};
    }
  };

  const stopAudioRecording = () => {
    setIsRecording(false);
    if (audioRecorder.current) {
      audioRecorder.current.stop();
      audioRecorder.current.onstop = function () {
        // handleAudioUpload();
      };
    }
  };

  const handleAudioUpload = async (res) => {
    if (audioChunks.length) {
      const blob = new Blob(audioChunks, { type: "audio/webm" });
      setAudioChunks([]);
      startAudioRecording(audioStream!);
      await AudioUploadAPI({
        blob: blob,
        currentQuestion: currentQuestion,
        duration: duration,
        isLastQuestion: res,
      });
    }
  };

  const handleVideoUpload = async () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/mp4" });
      setRecordedChunks([]);
      startVideoRecording(videoStream!);
      await VideoUploadAPI({
        blob: blob,
        currentQuestion: currentQuestion,
      });
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""} left`;
    } else {
      return `${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""} left`;
    }
  };

  const submitAndMoveToNextQn = () => {
    if (qnIndex < interviewQn.length) {
      stopVideoRecording();
      stopAudioRecording();
      setCurrentQuestion(interviewQn[qnIndex]);
      if (qnIndex !== interviewQn.length) {
        setQnIndex(qnIndex + 1);
      }
      setDuration(timeForEachQueston - timeLeft);
      setTimeLeft(timeForEachQueston);
      setNextButtonEnabled(false);
      setTimeout(() => {
        setNextButtonEnabled(true);
      }, 5000);
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }

    if (timeLeft === 0) {
      submitAndMoveToNextQn();
    }
  }, [timeLeft]);

  // Handle navigation away from form
  const handleLeave = async () => {
    setOpenModal(false);
    await InterviewComplete();
    navigate(-1);
  };

  useEffect(() => {
    try {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: false,
        })
        .then((mediaStream) => {
          setPermission(true);
          setAudioStream(mediaStream);
          startAudioRecording(mediaStream);
        });

      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true,
        })
        .then((mediaStream) => {
          setPermission(true);
          setvideoStream(mediaStream);
          startVideoRecording(mediaStream);
          setIsVideoLoaded(true);
        });
    } catch (err) {
      alert((err as Error).message);
    }

    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current?.stop();
      }
      if (audioRecorder.current) {
        audioRecorder.current?.stop();
      }
    };
  }, []);

  const handleUpload = async () => {
    if (
      !isRecording &&
      audioChunks.length > 0 &&
      qnIndex !== interviewQn.length
    ) {
      handleAudioUpload(false);
      handleVideoUpload();
    }
    if (
      !isRecording &&
      audioChunks.length > 0 &&
      qnIndex === interviewQn.length
    ) {
      setCompletedInterview(true);
      setLoading(true);
      await handleAudioUpload(true);
      await handleVideoUpload();
      await InterviewComplete();
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUpload();
  }, [audioChunks, isRecording]);

  useEffect(() => {
    StartInterview();
    // Enable next button after 5 seconds initially
    setTimeout(() => {
      setNextButtonEnabled(true);
    }, 5000);
  }, []);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      setOpenModal(true);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  if (CompletedInterview) {
    return (
      <>
        {Loading && <LoaderMask />}
        <div className="bg-gray-100 min-h-screen flex flex-col">
          <div className="flex flex-col items-center w-full h-full gap-6 p-4">
            <div className="bg-white shadow-lg w-full">
              <div className="flex flex-col md:flex-row justify-between p-3 max-w-screen-2xl mx-auto h-full">
                <div className="flex gap-3 items-center justify-center">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                    <CompanyLogo
                      logoUrl={jobDetails?.client?.logoUrl || null}
                      companyName={jobDetails?.client?.name}
                      className="h-16 text-md w-fit p-2"
                      imageClassName="h-[80px] w-[80px] rounded-lg w-fit"
                    />
                    <div className="text-center md:text-left">
                      <h3 className="mb-0 font-normal">Virtual Evaluation</h3>
                      <span>{jobDetails?.client?.name}</span>
                      <span className="mx-2">•</span>
                      <span>{jobDetails?.title}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 items-center justify-center mt-4 md:mt-0">
                  <h4>
                    Powered by <span className="text-primary">Hireomatic</span>
                  </h4>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 max-w-xl w-full mx-4 border border-gray-300">
              <div className="w-full p-4 flex justify-center">
                <Clock className="text-primary w-12 h-12" />
              </div>
              <h1 className="text-xl md:text-2xl font-semibold mb-4 text-center">
                Thank you for taking the time to complete our AI assessment
                interview.
              </h1>
              <p className="text-gray-700 mb-4 text-sm md:text-base">
                Our team will now review your responses. This process may take a
                few hours.
                <br /> We will inform you about the next steps in the hiring
                process. You may be contacted for follow-up interviews or
                receive further instructions via email.
              </p>
              <p className="text-gray-700 mb-4 text-sm md:text-base">
                We appreciate your interest in joining our team and your effort
                in completing this interview. We will get back to you soon with
                the next steps. <br />
                If you have any questions or need further assistance, please
                don't hesitate to contact us at{" "}
                <span className="text-orange-500">
                  {jobDetails?.client?.companyEmail}
                </span>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center justify-center p-4">
      {!isVideoLoaded && <LoaderMask />}
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="bg-white shadow-lg w-full">
          <div className="flex flex-col md:flex-row justify-between p-3 max-w-screen-2xl mx-auto">
            <div className="flex gap-3 items-center justify-center">
              <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                <CompanyLogo
                  logoUrl={jobDetails?.client?.logoUrl || null}
                  companyName={jobDetails?.client?.name}
                  className="h-16 text-md w-fit p-2"
                  imageClassName="h-[80px] w-[80px] rounded-lg w-fit"
                />
                <div className="text-center md:text-left">
                  <h3 className="mb-0 font-normal">Virtual Evaluation</h3>
                  <span>{jobDetails?.client?.name}</span>
                  <span className="mx-2">•</span>
                  <span>{jobDetails?.title}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center justify-center mt-4 md:mt-0">
              <h4>
                Powered by <span className="text-primary">Hireomatic</span>
              </h4>
            </div>
          </div>
        </div>

        {audio ? (
          <div className="audio-player">
            <audio src={audio} controls></audio>
            <>
              <a download href={audio}>
                Download Recording
              </a>
            </>
          </div>
        ) : null}

        <div className="flex flex-col md:flex-row h-full gap-6 md:gap-12 w-full max-w-screen-xl py-6">
          {/* Question Section */}
          <div className="flex flex-col gap-4 w-full md:w-[40%] bg-white h-fit p-4 rounded-md border border-gray-300">
            <div className="text-md font-thin">
              {`Question ${qnIndex + 1} of ${interviewQn.length}`}
            </div>
            <h4 className="font-semibold text-left">
              {interviewQn[qnIndex]?.question}
            </h4>

            <div className="flex items-center gap-2">
              <Timer />
              {timeLeft > 0 ? formatTime(timeLeft) : "Time's up!"}
            </div>
            <Button
              variant="solid"
              color="primary"
              className="w-fit"
              onClick={submitAndMoveToNextQn}
              disabled={!nextButtonEnabled}
            >
              Submit Answer
            </Button>
          </div>

          {/* Video Recording Section */}
          <div className="flex relative h-fit w-full md:w-[60%]">
            {!CompletedInterview && (
              <Webcam
                muted={true}
                mirrored={true}
                audio={true}
                ref={webcamRef}
                style={{ borderRadius: 16, width: '100%' }}
              />
            )}
            <div className="absolute -top-6 -right-2 z-1 text-white bg-primary-orange">
              <Dot className="text-red-400 h-20 w-20 p-0 text-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      <UnsavedChangesModal
        ModalComp={ModalComp}
        setOpenModal={setOpenModal}
        handleLeave={handleLeave}
      />
    </div>
  );
};

export default VideoScreening;
