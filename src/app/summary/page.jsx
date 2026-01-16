"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import ButtonWithIcon from "../components/ButtonWithIcon";

export default function Summary() {
  const router = useRouter();
  const [results, setResults] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("race");
  const [loading, setLoading] = useState(true);
  const [userSelections, setUserSelections] = useState({
    race: null,
    age: null,
    gender: null,
  });

  useEffect(() => {
    const analysisResults = sessionStorage.getItem("analysisResults");
    if (!analysisResults) {
      router.push("/select");
      return;
    }

    const data = JSON.parse(analysisResults);
    setResults(data.data);
    setLoading(false);
  }, [router]);

  if (loading || !results) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  const getHighestConfidence = (category) => {
    if (!results[category]) return { label: "", value: 0 };

    let highest = { label: "", value: 0 };
    Object.entries(results[category]).forEach(([key, value]) => {
      if (parseFloat(value) > highest.value) {
        highest = { label: key, value: parseFloat(value) };
      }
    });
    return highest;
  };

  const raceHighest = getHighestConfidence("race");
  const ageHighest = getHighestConfidence("age");
  const genderHighest = getHighestConfidence("gender");

  const getDisplayName = (category, key) => {
    const displayNames = {
      race: {
        black: "Black",
        white: "White",
        "southeast asian": "Southeast asian",
        "south asian": "South asian",
        "latino hispanic": "Latino hispanic",
        "east asian": "East asian",
        "middle eastern": "Middle eastern",
      },
      age: {
        "0-2": "0-2",
        "3-9": "3-9",
        "10-19": "10-19",
        "20-29": "20-29",
        "30-39": "30-39",
        "40-49": "40-49",
        "50-59": "50-59",
        "60-69": "60-69",
        "70+": "70+",
      },
      gender: {
        male: "MALE",
        female: "FEMALE",
      },
    };
    return displayNames[category]?.[key] || key;
  };

  const handleItemClick = (category, key) => {
    setUserSelections((prev) => ({
      ...prev,
      [category]: key,
    }));
  };

  const getSelectedValue = (category) => {
    if (userSelections[category]) {
      return {
        label: userSelections[category],
        value: results[category][userSelections[category]],
      };
    }
    return getHighestConfidence(category);
  };

  const getCurrentData = () => {
    const selectedValue = getSelectedValue(selectedCategory);

    switch (selectedCategory) {
      case "race":
        return {
          title: getDisplayName("race", selectedValue.label),
          percentage: Math.round(parseFloat(selectedValue.value) * 100),
          items: Object.entries(results.race || {}).map(([key, value]) => ({
            key,
            label: getDisplayName("race", key),
            value: Math.round(parseFloat(value) * 100),
            isHighest: key === (userSelections.race || raceHighest.label),
          })),
        };
      case "age":
        return {
          title: getDisplayName("age", selectedValue.label),
          percentage: Math.round(parseFloat(selectedValue.value) * 100),
          items: Object.entries(results.age || {}).map(([key, value]) => ({
            key,
            label: getDisplayName("age", key),
            value: Math.round(parseFloat(value) * 100),
            isHighest: key === (userSelections.age || ageHighest.label),
          })),
        };
      case "gender":
        return {
          title: getDisplayName("gender", selectedValue.label),
          percentage: Math.round(parseFloat(selectedValue.value) * 100),
          items: Object.entries(results.gender || {}).map(([key, value]) => ({
            key,
            label: getDisplayName("gender", key),
            value: Math.round(parseFloat(value) * 100),
            isHighest: key === (userSelections.gender || genderHighest.label),
          })),
        };
      default:
        return null;
    }
  };

  const currentData = getCurrentData();

  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-100px)]">
        <div className="p-8 bg-gray-50">
          <h2 className="font-bold mb-3">A.I. ANALYSIS</h2>
          <h1 className="text-7xl font-bold">DEMOGRAPHICS</h1>
          <p className="text-sm mt-3">PREDICTED RACE & AGE</p>
        </div>

        <div className="flex md:flex-row flex-col h-[calc(100%-180px)]">
          <div className="w-full md:w-96 bg-gray-50">
            <div className="mx-2"></div>
            <div className="pr-4 pl-4 md:max-w-none max-w-md mx-auto">
              <div className="border-t border-black"></div>
              <div>
                <button
                  onClick={() => setSelectedCategory("race")}
                  className={`w-full text-left px-4 py-4 hover:cursor-pointer transition-transform duration-300 hover:scale-105 ${
                    selectedCategory === "race"
                      ? "bg-black text-white"
                      : "bg-white"
                  }`}
                >
                  <div className="text-base">
                    {getDisplayName("race", getSelectedValue("race").label)}
                  </div>
                  <div className="text-xs mt-1 font-bold">RACE</div>
                </button>
                <div className="border-t border-black"></div>
                <button
                  onClick={() => setSelectedCategory("age")}
                  className={`w-full text-left px-4 py-4 mt-2 hover:cursor-pointer transition-transform duration-300 hover:scale-105 ${
                    selectedCategory === "age"
                      ? "bg-black text-white"
                      : "bg-white"
                  }`}
                >
                  <div className="text-base">
                    {getDisplayName("age", getSelectedValue("age").label)}
                  </div>
                  <div className="text-xs mt-1 font-bold">AGE</div>
                </button>
                <div className="border-t border-black"></div>
                <button
                  onClick={() => setSelectedCategory("gender")}
                  className={`w-full text-left px-4 py-4 mt-2 hover:cursor-pointer transition-transform duration-300 hover:scale-105 ${
                    selectedCategory === "gender"
                      ? "bg-black text-white"
                      : "bg-white"
                  }`}
                >
                  <div className="text-base">
                    {getDisplayName("gender", getSelectedValue("gender").label)}
                  </div>
                  <div className="text-xs mt-1 font-bold">SEX</div>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white md:order-none order-last">
            <div className="mx-2"></div>
            <div className="border-t border-black"></div>
            <div className="flex flex-col items-center justify-center h-full px-8 relative">
              <h2 className="text-5xl mb-12 md:absolute md:top-8 md:left-8">
                {currentData?.title}
              </h2>

              <div className="relative md:w-80 md:h-80 w-64 h-64">
                <svg className="transform -rotate-90 md:w-80 md:h-80 w-64 h-64">
                  <circle
                    cx={window.innerWidth >= 768 ? "160" : "128"}
                    cy={window.innerWidth >= 768 ? "160" : "128"}
                    r={window.innerWidth >= 768 ? "140" : "112"}
                    stroke="#e5e5e5"
                    strokeWidth="8"
                    fill="none"
                  />

                  <circle
                    cx={window.innerWidth >= 768 ? "160" : "128"}
                    cy={window.innerWidth >= 768 ? "160" : "128"}
                    r={window.innerWidth >= 768 ? "140" : "112"}
                    stroke="#000"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${
                      (2 *
                        Math.PI *
                        (window.innerWidth >= 768 ? 140 : 112) *
                        currentData?.percentage) /
                      100
                    } ${2 * Math.PI * (window.innerWidth >= 768 ? 140 : 112)}`}
                    strokeLinecap="round"
                    className="transition-all duration-500 circle-progress-stroke"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="md:text-7xl text-5xl font-light">
                    {currentData?.percentage}%
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-12 text-center">
                If A.I. estimate is wrong, select the correct one.
              </p>
            </div>
          </div>

          <div className="w-full md:w-96 bg-gray-50">
            <div className="mx-2">
              <div className="border-t border-black"></div>
            </div>
            <div className="p-8 pt-6 md:max-w-none max-w-md mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold">
                  {selectedCategory.toUpperCase()}
                </h3>
                <span className="text-sm font-bold">A.I. CONFIDENCE</span>
              </div>

              <div className="space-y-1">
                {currentData?.items
                  .sort((a, b) => b.value - a.value)
                  .map((item, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleItemClick(selectedCategory, item.key)
                      }
                      className={`w-full flex items-center justify-between px-3 py-3 hover:bg-gray-200 cursor-pointer ${
                        item.isHighest
                          ? "bg-black text-white hover:bg-gray-900"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rotate-45 ${
                            item.isHighest
                              ? "bg-white"
                              : "border border-gray-400"
                          }`}
                        />
                        <span className="text-sm">{item.label}</span>
                      </div>
                      <span className="text-sm">{item.value}%</span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 left-8 right-8 flex justify-between items-center">
        <ButtonWithIcon text="BACK" direction="left" href="/select" />
        <ButtonWithIcon text="CONFIRM" direction="right" href="/thank-you" />
      </div>
    </>
  );
}
