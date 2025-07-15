/** @jsxImportSource @emotion/react */

"use client";

import { useState, type FC } from "react";
import Image from "next/image";
import AssetHandler from "./AssetHandler";

type PropsType = {
  src: string;
  alt?: string;
  FooterImg?: React.ReactNode;
};

const ImgLoader: FC<PropsType> = ({ src, alt, FooterImg }) => {
  const [loaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className="relative min-h-full min-w-full rounded-xl overflow-hidden">
      <AssetHandler {...{ loaded, isError }} />
      <Image
        src={src}
        alt={alt ?? ""}
        className={`transition-all duration-500 object-cover ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        fill
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
      />

      {FooterImg}
    </div>
  );
};

export default ImgLoader;
