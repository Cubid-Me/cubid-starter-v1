// components/home/terms.tsx
"use client";
import { useTheme } from "@/context/ThemeContext";
import MarkdownViewer from "@/components/MarkdownViewer";

const TermsAndConditions = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen`}>
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <MarkdownViewer filePath="/TermsAndConditions.md" theme={theme} />
      </div>
    </div>
  );
};

export default TermsAndConditions;