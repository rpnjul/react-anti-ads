import { detectAdBlock } from "./utils/detectAdBlock";

export const isAdBlockOn = async (): Promise<boolean> => {
  return await detectAdBlock();
};
