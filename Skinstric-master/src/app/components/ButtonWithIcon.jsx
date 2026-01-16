import Link from "next/link";

export default function ButtonWithIcon({
  text = "button",
  onClick,
  direction = "left",
  href,
}) {
  const buttonContent = (
    <>
      {direction === "left" && (
        <div className="relative w-[44px] h-[44px] flex-shrink-0">
          <div className="absolute inset-0 border border-[#1A1B1C] rotate-45 button-spin-counterclockwise"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 10 10"
              className="w-[10px] h-[10px] fill-[#1A1B1C]"
            >
              <polygon points="0,5 10,0 10,10" />
            </svg>
          </div>
        </div>
      )}

      <span className={`uppercase text-[14px] font-semibold leading-[16px] tracking-[-0.02em] text-[#1A1B1C] opacity-70 transition-all duration-300 group-hover:opacity-100 ${direction === "left" ? "button-text-hover-left" : "button-text-hover-right"}`}>
        {text}
      </span>

      {direction === "right" && (
        <div className="relative w-[44px] h-[44px] flex-shrink-0">
          <div className="absolute inset-0 border border-[#1A1B1C] rotate-45 button-spin-clockwise"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 10 10"
              className="w-[10px] h-[10px] fill-[#1A1B1C]"
            >
              <polygon points="0,0 10,5 0,10" />
            </svg>
          </div>
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="flex items-center gap-4 w-[150px] h-[44px] hover:cursor-pointer group"
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 w-[150px] h-[44px] hover:cursor-pointer group"
    >
      {buttonContent}
    </button>
  );
}
