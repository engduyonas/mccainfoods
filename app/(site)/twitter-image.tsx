import { ImageResponse } from "next/og";
import { MCCAIN_LOGO_BASE64 } from "@/lib/logo";

export const alt = "McCain Foods | Celebrating Real Connections";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #006341 0%, #004d32 40%, #003825 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(255, 199, 44, 0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            left: "-60px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.04)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MCCAIN_LOGO_BASE64}
            width={320}
            height={194}
            alt="McCain Logo"
          />
          <div
            style={{
              width: "80px",
              height: "4px",
              borderRadius: "2px",
              background: "#FFC72C",
            }}
          />
          <div
            style={{
              fontSize: "32px",
              color: "rgba(255, 255, 255, 0.9)",
              fontWeight: 600,
            }}
          >
            Celebrating Real Connections
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "rgba(255, 255, 255, 0.5)",
              maxWidth: "600px",
              textAlign: "center",
              lineHeight: "1.5",
            }}
          >
            Global leader in prepared potato products and appetizers
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "6px",
            background: "linear-gradient(90deg, #FFC72C 0%, #006341 50%, #FFC72C 100%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
