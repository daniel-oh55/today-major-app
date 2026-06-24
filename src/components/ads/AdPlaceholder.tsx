import type { AdRenderInstruction } from "@/lib/ads/types";

interface AdPlaceholderProps {
  instruction: Extract<AdRenderInstruction, { type: "placeholder" }>;
  className?: string;
}

export function AdPlaceholder({ instruction, className = "" }: AdPlaceholderProps) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div
      style={{ height: instruction.reservedHeight }}
      className={`w-full flex items-center justify-center bg-gray-50 border border-dashed border-gray-200 rounded ${className}`}
      aria-label={`광고 영역: ${instruction.label}`}
      role="complementary"
    >
      <span className="text-xs text-gray-400 select-none pointer-events-none">
        {isDev ? `[광고 슬롯] ${instruction.placement}` : `광고 ${instruction.label}`}
      </span>
    </div>
  );
}
