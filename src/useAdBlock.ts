import { useEffect, useState } from "react";
import { detectAdBlock } from "./utils/detectAdBlock";

export const useAdBlock = () => {
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
