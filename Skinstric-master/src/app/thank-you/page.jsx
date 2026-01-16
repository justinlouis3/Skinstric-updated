"use client";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import ButtonWithIcon from "../components/ButtonWithIcon";

export default function ThankYou() {
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-72px)]">
        <div className="text-center flex flex-col items-center gap-8 fade-in-smooth">
          <h1 className="text-6xl font-bold">Thank you for using</h1>
          <h2 className="text-6xl font-bold">Skinstric</h2>
          <p className="text-gray-600 mt-8 text-lg">Your analysis is complete</p>
        </div>
      </div>

      <div className="fixed bottom-8 left-8 right-8 flex justify-center">
        <ButtonWithIcon text="HOME" direction="right" onClick={handleHome} />
      </div>
    </>
  );
}
