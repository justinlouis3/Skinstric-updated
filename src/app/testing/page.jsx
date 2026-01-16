"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ButtonWithIcon from "../components/ButtonWithIcon";
import Navbar from "../components/Navbar";

export default function Testing() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState("name");
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });
  const [currentValue, setCurrentValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (field, value) => {
    const hasNumbers = /\d/.test(value);

    if (!value.trim()) {
      return `${field} is required`;
    }
    if (hasNumbers) {
      return `${field} should not contain numbers`;
    }
    if (value.trim().length < 2) {
      return `${field} should be at least 2 characters`;
    }
    return "";
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (currentStep === "name") {
        const nameError = validateField("Name", currentValue);
        if (nameError) {
          setError(nameError);
          return;
        }

        setFormData((prev) => ({ ...prev, name: currentValue }));
        setCurrentValue("");
        setError("");
        setCurrentStep("location");
      } else if (currentStep === "location") {
        const locationError = validateField("Location", currentValue);
        if (locationError) {
          setError(locationError);
          return;
        }

        const finalData = {
          ...formData,
          location: currentValue,
        };

        localStorage.setItem("userData", JSON.stringify(finalData));

        setIsLoading(true);
        try {
          const response = await fetch(
            "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(finalData),
            }
          );

          const data = await response.json();

          if (data.SUCCESS || response.ok) {
            setCurrentStep("complete");
          } else {
            setError("Something went wrong. Please try again.");
          }
        } catch (error) {
          console.error("Error submitting form:", error);
          setError("An error occurred. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleInputChange = (value) => {
    setCurrentValue(value);
    if (error) {
      setError("");
    }
  };

  const getPlaceholder = () => {
    if (currentStep === "name") return "Introduce Yourself";
    if (currentStep === "location") return "your city name";
    return "";
  };

  const handleProceed = () => {
    router.push("/result");
  };

  return (
    <>
      <Navbar />
      <p className="ml-8 font-bold">TO START ANALYSIS</p>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-260px)] gap-8">
        <div className="relative flex flex-col items-center gap-6 w-full max-w-md transition-transform duration-300 hover:scale-110 input-hover-container">
          <div className="absolute w-[500px] h-[500px] left-1/2 top-3/4 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rotate-45 border-[#A0A4AB] hidden xl:block lg:block md:block input-dashed-border transition-transform duration-300"></div>
          {currentStep !== "complete" ? (
            <>
              <p className="text-sm text-gray-600 relative z-10">
                CLICK TO TYPE
              </p>
              <input
                type="text"
                placeholder={getPlaceholder()}
                value={currentValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className={`outline-none text-center text-2xl bg-transparent border-b-2 pb-4 w-full relative z-10 ${
                  error ? "border-red-500" : "border-gray-300"
                } focus:border-black transition-colors`}
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-sm mt-1 relative z-10">
                  {error}
                </p>
              )}
              {isLoading && (
                <div className="flex flex-col items-center gap-4 relative z-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-300 border-t-black"></div>
                  <p className="text-gray-600 text-sm">Processing...</p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-6 relative z-10 fade-in-smooth">
              <h2 className="text-4xl text-center">Thank you!</h2>
              <p className="text-xl text-gray-600">Proceed to the next step</p>
            </div>
          )}
        </div>
      </div>

      <div className="absolute left-[32px] bottom-[32px]">
        <ButtonWithIcon text="BACK" direction="left" href="/" />
      </div>

      {currentStep === "complete" && (
        <div className="absolute right-[4px] bottom-[32px]">
          <ButtonWithIcon
            text="PROCEED"
            direction="right"
            onClick={handleProceed}
          />
        </div>
      )}
    </>
  );
}
