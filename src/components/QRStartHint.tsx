"use client";

import type { QRStartHintState } from "@/types/navigation";

type QRStartHintProps = {
  hint: QRStartHintState;
};

export default function QRStartHint({ hint }: QRStartHintProps) {
  if (!hint) {
    return null;
  }

  if (hint.kind === "invalid") {
    return (
      <div className="rounded-[24px] border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-amber-700 sm:px-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">QR Start</p>
        <p className="mt-2">QR-style 起點參數無效，請改以搜尋或地圖手動設定起點。</p>
      </div>
    );
  }

  return (
    <div className="rounded-[24px] border border-teal-200 bg-teal-50 px-4 py-4 text-sm leading-6 text-teal-700 sm:px-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">QR Start</p>
      <p className="mt-2 break-words">已套用 QR-style 起點：{hint.label}</p>
    </div>
  );
}