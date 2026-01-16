"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Processing() {
  const router = useRouter();

  useEffect(() => {
    const analyzeImage = async () => {
      const base64Image = sessionStorage.getItem("capturedImage");

      if (!base64Image) {
        router.push("/");
        return;
      }

      try {
        const response = await fetch(
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image: base64Image,
            }),
          }
        );

        const data = await response.json();

        sessionStorage.setItem("analysisResults", JSON.stringify(data));

        router.push("/select");
      } catch (error) {
        console.error("Error analyzing image:", error);
        alert("Error analyzing image. Please try again.");
        router.push("/");
      }
    };

    analyzeImage();
  }, [router]);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-72px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold">ANALYZING IMAGE</h2>
          <p className="text-gray-600 mt-2">Please wait...</p>
        </div>
      </div>
    </>
  );
}
