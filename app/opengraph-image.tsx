import { ImageResponse } from "next/og";

export const alt =
  "Restaurantes Avenida — Getafe · Calidad al mejor precio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** OG del grupo (§13.3): la placa sobre hueso, con el claim. */
export default function Imagen() {
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
          background: "#F7F3EB",
          gap: 36,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "10px solid #1E40AF",
            borderRadius: 18,
            background: "#FDFBF7",
            padding: "44px 90px",
            boxShadow: "0 30px 70px rgba(22,33,58,0.25)",
          }}
        >
          <div
            style={{
              fontSize: 26,
              letterSpacing: 12,
              color: "#1E40AF",
              fontWeight: 600,
            }}
          >
            RESTAURANTES
          </div>
          <div
            style={{
              fontSize: 130,
              fontWeight: 900,
              color: "#1E40AF",
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            AVENIDA
          </div>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 16,
              color: "#1E40AF",
              opacity: 0.8,
            }}
          >
            GETAFE
          </div>
        </div>
        <div style={{ fontSize: 34, color: "#C2410C", fontStyle: "italic" }}>
          Calidad al mejor precio
        </div>
      </div>
    ),
    size,
  );
}
