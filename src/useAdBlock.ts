import { useEffect, useState } from "react";

export const useAdBlock = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAdBlockActive, setIsAdBlockActive] = useState(false);

  const detect = () => {
    let scriptBlocked = false;

    const bait = document.createElement("div");
    bait.className =
      "adsbox ad ads banner banner-ad ad-placement ad-banner ad-native";
    bait.style.position = "absolute";
    bait.style.height = "1px";
    bait.style.width = "1px";
    bait.style.top = "-10000px";
    document.body.appendChild(bait);

    const inlineScript = document.createElement("script");
    inlineScript.appendChild(document.createTextNode("void 0;"));
    document.body.appendChild(inlineScript);
    setTimeout(() => {
      const baitBlocked =
        !bait ||
        bait.offsetHeight === 0 ||
        bait.clientHeight === 0 ||
        window.getComputedStyle(bait).display === "none";

      const isBlocked = baitBlocked || scriptBlocked;

      bait.remove();
      inlineScript.remove();

      setIsAdBlockActive(isBlocked);
      setIsChecking(false);
    }, 500);
  };

  useEffect(() => {
    detect();
    const interval = setInterval(detect, 1000);
    return () => clearInterval(interval);
  }, []);

  return { isAdBlockActive, isChecking };
};
