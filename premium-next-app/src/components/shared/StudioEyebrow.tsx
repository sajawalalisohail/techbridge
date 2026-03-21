import type { ReactNode } from "react";
import { STUDIO_TYPE } from "@/lib/type-system";

interface StudioEyebrowProps {
  children: ReactNode;
  className?: string;
}

export default function StudioEyebrow({ children, className = "" }: StudioEyebrowProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${STUDIO_TYPE.eyebrow} ${className}`.trim()}>
      <span className="h-1.5 w-1.5 rounded-full bg-brand-accent-light" />
      <span className="h-px w-4 bg-brand-accent/35" />
      {children}
    </span>
  );
}

