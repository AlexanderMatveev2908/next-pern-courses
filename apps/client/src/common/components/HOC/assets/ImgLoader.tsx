/** @jsxImportSource @emotion/react */

"use client";

import { useState, type FC } from "react";
import Image from "next/image";
import AssetHandler from "./AssetHandler";

type PropsType = {
  src: string;
  alt?: string;
};

const ImgLoader: FC<PropsType> = ({ src, alt }) => {
  const [loaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className="relative h-full min-w-full">
      <AssetHandler {...{ loaded, isError }} />
      <Image
        src={src}
        alt={alt ?? ""}
        className={`transition-all rounded-xl duration-500 w-full h-full ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        fill
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
      />
    </div>
  );
};

export default ImgLoader;
