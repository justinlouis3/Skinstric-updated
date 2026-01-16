"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import ButtonWithIcon from "../components/ButtonWithIcon";
import Image from "next/image";

export default function Camera() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        setIsReady(true);

        setTimeout(() => {
          router.push("/capture");
        }, 1000);
      })
      .catch((err) => {
        console.error("Camera permission denied:", err);
        alert("Camera permission is required to proceed");
      });
  }, [router]);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-72px)]">
        <div className="text-center flex flex-col items-center">
          <Image src="/camera.png" alt="Camera icon" width={136} height={136} className="camera-setup-icon" />
          <h2 className="text-lg font-bold mb-4 camera-setup-text">SETTING UP CAMERA...</h2>
          {isReady ? (
            <p className="text-lg"></p>
          ) : (
            <p className="text-lg">Please allow camera access</p>
          )}
          <p className="text-xs mt-24">
            TO GET BETTER RESULTS MAKE SURE TO HAVE
          </p>

          <p className="flex items-center gap-4 text-xs mt-4">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 border border-[#1A1B1C] rotate-45 flex-shrink-0"></span>
              NEUTRAL EXPRESSION
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 border border-[#1A1B1C] rotate-45 flex-shrink-0"></span>
              FRONTAL POSE
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 border border-[#1A1B1C] rotate-45 flex-shrink-0"></span>
              ADEQUATE LIGHTING
            </span>
          </p>
        </div>
      </div>

      <div className="absolute left-[32px] bottom-[32px]">
        <ButtonWithIcon text="BACK" direction="left" href="/result" />
      </div>
    </>
  );
}
