import { ImageResponse } from "next/og";
import TechBridgeSymbol from "@/components/shared/TechBridgeSymbol";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(180deg, rgba(14,16,20,1) 0%, rgba(7,8,11,1) 100%)",
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.12)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top right, rgba(255,255,255,0.14), transparent 30%), radial-gradient(circle at bottom left, rgba(212,192,154,0.16), transparent 34%)",
          }}
        />
        <TechBridgeSymbol className="h-[42px] w-[42px]" />
      </div>
    ),
    size,
  );
}
