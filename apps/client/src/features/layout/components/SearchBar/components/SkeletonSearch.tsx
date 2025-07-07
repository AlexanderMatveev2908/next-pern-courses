import type { FC } from "react";

const SkeletonSearch: FC = () => {
  return (
    <div className="skeleton w-[95%] mx-auto border-[3px] border-neutral-600 p-5 rounded-xl max-w-[1200px] h-[200px] relative"></div>
  );
};

export default SkeletonSearch;
