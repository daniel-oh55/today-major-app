import type { AdPlacement } from "@/lib/config/ads";
import { AD_CONFIG } from "@/lib/config/ads";

interface AdPlaceholderProps {
  placement: AdPlacement;
  className?: string;
}

export function AdPlaceholder({ placement, className = "" }: AdPlaceholderProps) {
  const config = AD_CONFIG[placement];
  return (
    <div
      className={`w-full ${config.heightClass} flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded ${className}`}
      aria-label={`광고 영역: ${config.label}`}
      role="complementary"
    >
      <span className="text-xs text-gray-400 select-none">광고 {config.label}</span>
    </div>
  );
}
