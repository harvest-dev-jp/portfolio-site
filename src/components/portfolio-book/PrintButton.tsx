"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      className="portfolio-book-print-button"
      onClick={() => window.print()}
    >
      PDFとして保存
    </button>
  );
}
