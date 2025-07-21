import React from "react";
import AntiAds from "react-anti-ads";

function App() {
  return (
    <AntiAds
      fallback={
        <div style={{ color: "red", textAlign: "center" }}>
          🚫 AdBlock terdeteksi
        </div>
      }
    >
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>Demo React Anti Ads</h1>
        <p>AdBlock tidak terdeteksi. Terima kasih 🙏</p>
      </div>
    </AntiAds>
  );
}

export default App;
