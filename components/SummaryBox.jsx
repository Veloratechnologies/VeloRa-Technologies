import { useEffect, useState } from "react";

const SummaryBox = ({ summary, theme, isDarkMode }) => {
  const [summaryText, setSummaryText] = useState("");

  useEffect(() => {
    setSummaryText(summary || "");
  }, [summary]);

  return (
    <div
      className="rounded-xl p-4"
      style={{
        backgroundColor: theme.rightPanelBg,
      }}
    >
      <h3
        className="mb-4 text-base font-semibold"
        style={{ color: theme.textPrimary }}
      >
        AI Conversation Summary
      </h3>

      <textarea
        value={summaryText}
        readOnly
        placeholder="No summary available."
        className="min-h-[180px] w-full resize-none rounded-lg border p-4 text-sm leading-6 transition-all focus:outline-none"
        style={{
          borderColor: theme.border,
          backgroundColor: isDarkMode ? "#202C33" : "#FFFFFF",
          color: theme.textPrimary,
        }}
      />
    </div>
  );
};

export default SummaryBox;