import React, { useState, useEffect } from 'react';

const detectAdBlock = () => {
    return new Promise((resolve) => {
        const bait = document.createElement("div");
        bait.className =
            "adsbox ad ads banner banner-ad ad-placement ad-banner ad-native";
        bait.style.position = "absolute";
        bait.style.height = "1px";
        bait.style.width = "1px";
        bait.style.top = "-10000px";
        document.body.appendChild(bait);
        const testScript = document.createElement("script");
        try {
            testScript.appendChild(document.createTextNode(`void 0;`));
        }
        catch {
            testScript.text = `void 0;`;
        }
        document.body.appendChild(testScript);
        setTimeout(() => {
            const baitBlocked = !bait ||
                bait.offsetHeight === 0 ||
                bait.clientHeight === 0 ||
                window.getComputedStyle(bait).display === "none";
            bait.remove();
            testScript.remove();
            resolve(baitBlocked);
        }, 100);
    });
};

const useAdBlock = () => {
    const [isChecking, setIsChecking] = useState(true);
    const [isAdBlockActive, setIsAdBlockActive] = useState(false);
    const runDetection = async () => {
        const result = await detectAdBlock();
        setIsAdBlockActive(result);
        setIsChecking(false);
    };
    useEffect(() => {
        runDetection();
        const interval = setInterval(runDetection, 1000);
        return () => clearInterval(interval);
    }, []);
    return { isAdBlockActive, isChecking };
};

const AntiAds = ({ children, fallback, }) => {
    const { isAdBlockActive, isChecking } = useAdBlock();
    if (isChecking) {
        return null;
    }
    if (isAdBlockActive) {
        return (fallback ?? (React.createElement("div", { style: {
                padding: "2rem",
                background: "#ffefef",
                color: "#b00020",
                textAlign: "center",
                fontSize: "1.2rem",
            } }, "\u26A0\uFE0F AdBlock terdeteksi! Mohon matikan AdBlock untuk mendukung kami.")));
    }
    return React.createElement(React.Fragment, null, children);
};

export { AntiAds as default };
