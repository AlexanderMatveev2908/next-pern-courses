/** @jsxImportSource @emotion/react */
"use client";

import { type FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import CodeBlock from "./components/CodeBlock/CodeBlock";

type PropsType = {
  data: string;
};

const ContentMD: FC<PropsType> = ({ data }) => {
  return (
    <div className="w-full h-full pt-6">
      <div className="w-full flex flex-col min-h-0 max-h-full overflow-y-auto scroll__app px-3 pb-8 prose prose-neutral dark:prose-invert">
        <div className="h-fit w-full overflow-y-visible">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              a: (props) => (
                <a {...props} target="_blank" rel="noopener noreferrer" />
              ),

              code: CodeBlock,
            }}
          >
            {data}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ContentMD;
