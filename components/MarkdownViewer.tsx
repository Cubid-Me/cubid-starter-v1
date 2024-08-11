// components/MarkdownViewer.tsx
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

type MarkdownViewerProps = {
  filePath: string;
  theme: string;
};

const MarkdownViewer = ({ filePath, theme }: MarkdownViewerProps) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchMarkdown = async () => {
      const response = await fetch(filePath);
      const text = await response.text();
      setContent(text);
    };

    fetchMarkdown();
  }, [filePath]);

  return (
    <div
      className={`prose mx-auto p-4 rounded ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
      />
    </div>
  );
};

export default MarkdownViewer;
