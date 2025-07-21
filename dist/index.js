'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

const useAdBlock = () => {
    const [isChecking, setIsChecking] = React.useState(true);
    const [isAdBlockActive, setIsAdBlockActive] = React.useState(false);
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
            const baitBlocked = !bait ||
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
    React.useEffect(() => {
        detect();
        const interval = setInterval(detect, 1000);
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

exports.default = AntiAds;
