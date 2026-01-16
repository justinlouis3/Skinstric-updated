"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ButtonWithIcon from "../components/ButtonWithIcon";
import Navbar from "../components/Navbar";

export default function Result() {
  const router = useRouter();

  const handleFaceScan = () => {
    router.push("/camera");
  };

  const handleGalleryAccess = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result.split(",")[1];

          sessionStorage.setItem("capturedImage", base64String);

          router.push("/processing");
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <>
      <Navbar />
      <p className="ml-8 font-bold">START ANALYSIS</p>

      <div className="flex items-center justify-center h-[calc(100vh-100px)] gap-40 xl:gap-170 lg:gap-100 md:gap-80 flex-col xl:flex-row lg:flex-row md:flex-row sm:flex-col">
        <button
          onClick={handleFaceScan}
          className="relative flex flex-col items-center gap-4 icon-hover-button"
        >
          <div className="relative">
            <div className="absolute w-[300px] h-[300px] left-1/2 top-[70px] -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rotate-45 border-[#A0A4AB] hidden xl:block lg:block md:block pointer-events-none icon-dashed-border transition-transform duration-300"></div>

            <Image
              src="/camera.png"
              alt="Camera icon"
              width={136}
              height={136}
              className="hover:cursor-pointer icon-hover-rotate"
            />

            <div className="absolute -top-[31px] -right-[40px] w-[66px] h-[59px] hidden xl:block lg:block md:block sm:hidden">
              <svg
                className="absolute top-1 left-0"
                width="62"
                height="55"
                viewBox="0 0 62 55"
              >
                <path
                  d="M 0 55 L 62 0"
                  stroke="#1A1B1C"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
              <div className="absolute top-0 right-0 w-[5px] h-[5px] border border-[#1A1B1C] rounded-full bg-white"></div>
            </div>

            <div className="xl:absolute lg:absolute md:absolute xl:-top-18 xl:-right-[160px] lg:-top-18 lg:-right-[130px] md:-top-18 md:-right-[130px] text-xs uppercase text-left space-y-2">
              <p className="mt-4 xl:mt-0 lg:mt-0 md:mt-0">Allow A.I.</p>
              <p>to scan your face</p>
            </div>
          </div>
        </button>

        <button
          onClick={handleGalleryAccess}
          className="relative flex flex-col items-center gap-4 icon-hover-button"
        >
          <div className="relative">
            <div className="absolute w-[300px] h-[300px] left-1/2 top-[68px] -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rotate-45 border-[#A0A4AB] hidden xl:block lg:block md:block pointer-events-none icon-dashed-border transition-transform duration-300"></div>
            <Image
              src="/gallery.png"
              alt="Gallery icon"
              width={136}
              height={136}
              className="hover:cursor-pointer icon-hover-rotate"
            />

            <div className="absolute -bottom-[30px] -left-[40px] w-[66px] h-[59px] hidden xl:block lg:block md:block sm:hidden">
              <svg
                className="absolute bottom-1 right-0"
                width="62"
                height="55"
                viewBox="0 0 62 55"
              >
                <path
                  d="M 62 0 L 0 55"
                  stroke="#1A1B1C"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
              <div className="absolute bottom-0 left-0 w-[5px] h-[5px] border border-[#1A1B1C] rounded-full bg-white"></div>
            </div>

            <div className="xl:absolute lg:absolute md:absolute xl:-bottom-18 xl:-left-[140px] lg:-bottom-18 lg:-left-[150px] md:-bottom-18 md:-left-[150px] text-xs uppercase text-right space-y-2">
              <p className="mt-4 xl:mt-0 lg:mt-0 md:mt-0">Allow A.I.</p>
              <p>access gallery</p>
            </div>
          </div>
        </button>
      </div>

      <div className="absolute left-[32px] bottom-[32px]">
        <ButtonWithIcon text="BACK" direction="left" href="/testing" />
      </div>
    </>
  );
}
