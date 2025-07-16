/** @jsxImportSource @emotion/react */
"use client";

import { CloudAssetType } from "@/common/types/cloud";
import { type FC } from "react";
import ImagesSwapper from "../../HOC/ImagesSwapper/ImagesSwapper";
import VideoLoader from "../../HOC/assets/VideoLoader";
import ClickTxtLonger from "../../elements/ClickTxtLonger";
import PreviewMarkdown from "../../HOC/PreviewMarkdown/PreviewMarkdown";
import JustText from "../../elements/JustText";

type PropsType = {
  title: string;
  images: CloudAssetType[];
  video?: CloudAssetType | null;
  description?: string | null;
  markdown: string;
  Content?: React.ReactNode;
  Header?: React.ReactNode;
  Footer?: React.ReactNode;
};

const PageItemShape: FC<PropsType> = ({
  images,
  video,
  title,
  description,
  markdown,
  Content,
  Header,
  Footer,
}) => {
  return (
    <div className="w-full grid grid-cols-1 gap-10">
      <JustText {...{ title, isTitle: true }} />

      {Header}

      <ImagesSwapper
        {...{
          urls: images.map((img) => img.url),
        }}
      />

      <div className="w-full grid grid-cols-1 gap-6">
        <div className="w-full flex flex-col gap-2">
          <JustText
            {...{
              txt: "Description",
            }}
          />

          <ClickTxtLonger
            {...{
              description,
            }}
          />
        </div>

        <div className="w-full grid grid-cols-1 gap-2">
          <JustText
            {...{
              txt: "Markdown",
            }}
          />

          <PreviewMarkdown {...{ data: markdown }} />
        </div>

        {Content}
      </div>

      <div className="w-full max-w-[800px] aspect-[16/9] max-h-[400px] justify-self-center mt-[25px] border-[3px] border-neutral-800 p-5 rounded-xl">
        <VideoLoader
          {...{
            src: video?.url,
          }}
        />
      </div>

      {Footer}
    </div>
  );
};

export default PageItemShape;
