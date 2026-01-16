"use client";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import ButtonWithIcon from "../components/ButtonWithIcon";
import { IoCameraOutline } from "react-icons/io5";

export default function Capture() {
  const router = useRouter();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then((stream) => {
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing camera:", err);
        router.push("/result");
      });
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);

      const dataUrl = canvas.toDataURL("image/jpeg");
      setCapturedImage(dataUrl);

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const usePhoto = () => {
    if (capturedImage) {
      const base64String = capturedImage.split(",")[1];
      sessionStorage.setItem("capturedImage", base64String);
      router.push("/processing");
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative h-[calc(100vh-72px)]">
        {!capturedImage ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={capturedImage}
            alt="Captured"
            className="w-full h-full object-cover"
          />
        )}

        <canvas ref={canvasRef} className="hidden" />

        <div className="absolute bottom-32 left-0 right-0 flex flex-col items-center text-white">
          {!capturedImage ? (
            <>
              <p className="text-xs">TO GET BETTER RESULTS MAKE SURE TO HAVE</p>

              <p className="flex items-center gap-4 text-xs mt-4">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 border border-white rotate-45 flex-shrink-0"></span>
                  NEUTRAL EXPRESSION
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 border border-white rotate-45 flex-shrink-0"></span>
                  FRONTAL POSE
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 border border-white rotate-45 flex-shrink-0"></span>
                  ADEQUATE LIGHTING
                </span>
              </p>
            </>
          ) : (
            <p className="text-white font-bold">PREVIEW</p>
          )}
        </div>

        {!capturedImage ? (
          <div className="absolute bottom-1/2 right-8 flex items-center gap-2">
            <p className="text-white font-bold">TAKE PICTURE</p>
            <button
              onClick={capturePhoto}
              className="ml-4 bg-white rounded-full w-16 h-16 outline-2 outline-white outline-offset-4 hover:scale-105 transition-transform duration-300 flex items-center justify-center hover:cursor-pointer"
              aria-label="Capture photo"
            >
              <IoCameraOutline className="w-8 h-8 text-gray-700" />
            </button>
          </div>
        ) : (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <div className="flex gap-4">
              <button
                onClick={retakePhoto}
                className="bg-white text-black px-6 py-3 font-medium hover:cursor-pointer hover:bg-gray-300 transition-colors"
              >
                RETAKE
              </button>
              <button
                onClick={usePhoto}
                className="bg-black text-white px-6 py-3 font-medium hover:cursor-pointer hover:bg-gray-800 transition-colors"
              >
                USE THIS PHOTO
              </button>
            </div>
          </div>
        )}

        <div className="absolute left-[32px] bottom-[48px] invert brightness-200">
          <ButtonWithIcon text="BACK" direction="left" href="/result" />
        </div>
      </div>
    </>
  );
}
