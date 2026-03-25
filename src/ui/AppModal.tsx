"use client";

import { AppModalProps } from "@/types/post";
import AppButton from "./AppButton";

const AppModal = ({ isOpen, onClose, title, children }: AppModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          {title && <h2 className="text-xl font-bold text-black">{title}</h2>}

          <AppButton
            type="button"
            className="rounded-lg bg-gray-200 px-3 py-1 text-black"
            onClick={onClose}
          >
            ✕
          </AppButton>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default AppModal;
