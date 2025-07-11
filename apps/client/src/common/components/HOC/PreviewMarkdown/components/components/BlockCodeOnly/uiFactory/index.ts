/* eslint-disable @typescript-eslint/no-explicit-any */
export const getTxt = <T extends React.ReactNode>(node: T): string => {
  if (typeof node === "string" || typeof node === "number") {
    return node + "";
  }
  if (Array.isArray(node)) {
    return node.map(getTxt).join("");
  }
  if (typeof node === "object" && node !== null && "props" in node) {
    return getTxt((node as any).props.children);
  }

  return "";
};
