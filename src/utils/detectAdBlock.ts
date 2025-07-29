export const detectAdBlock = (): Promise<boolean> => {
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
        } catch {
            testScript.text = `void 0;`;
        }
        document.body.appendChild(testScript);

        setTimeout(() => {
            const baitBlocked =
                !bait ||
                bait.offsetHeight === 0 ||
                bait.clientHeight === 0 ||
                window.getComputedStyle(bait).display === "none";

            bait.remove();
            testScript.remove();
            resolve(baitBlocked);
        }, 100);
    });
};
