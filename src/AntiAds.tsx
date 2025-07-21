import React from "react";
import { useAdBlock } from "./useAdBlock";

const AntiAds = ({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) => {
  const { isAdBlockActive, isChecking } = useAdBlock();

  if (isChecking) {
    return null;
  }

  if (isAdBlockActive) {
    return (
      fallback ?? (
        <div
          style={{
            padding: "2rem",
            background: "#ffefef",
            color: "#b00020",
            textAlign: "center",
            fontSize: "1.2rem",
          }}
        >
          ⚠️ AdBlock terdeteksi! Mohon matikan AdBlock untuk mendukung kami.
        </div>
      )
    );
  }

  return <>{children}</>;
};

export default AntiAds;
