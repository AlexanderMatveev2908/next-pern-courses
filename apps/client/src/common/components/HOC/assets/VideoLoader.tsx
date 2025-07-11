/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import { useRef, useState, type FC } from "react";
import { __cg } from "@shared/first/lib/logger";
import AssetHandler from "./AssetHandler";

type PropsType = {
  src?: string;
};

const VideoLoader: FC<PropsType> = ({ src }) => {
  const [loaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const vidRef = useRef<HTMLVideoElement | null>(null);

  const handleEnd = async () => {
    const el = vidRef.current;
    if (!el) return;

    el.currentTime = 0;
    const playCB = el.play();

    try {
      await playCB;
    } catch (err: any) {
      __cg("err autoplay", err);
    }
  };

  return (
    <div className="relative max-w-full max-h-full min-w-full min-h-full">
      <AssetHandler {...{ loaded, isError }} />
      <video
        ref={vidRef}
        src={src}
        className={`transition-all rounded-xl duration-500 object-cover max-w-full max-h-full min-w-full min-h-full ${
          loaded && !isError ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        controls
        onLoadedData={() => {
          setIsLoaded(true);
        }}
        onError={(err) => {
          __cg("err video", err);
          setIsError(true);
        }}
        onEnded={handleEnd}
      />
    </div>
  );
};

export default VideoLoader;
