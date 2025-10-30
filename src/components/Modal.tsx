
"use client";

import React from "react";
import Image from "next/image";

export default function Modal({
  imageSrc,
  title,
  description,
  buttonText = "Proceed",
  onClose,
}: {
  imageSrc?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div role="dialog" aria-modal="true" className="bg-white rounded-2xl px-12 py-6 max-w-md w-full text-center shadow-xl mx-4">
       
        {imageSrc ? (
         
          <div className="flex justify-center mb-4 mt-5">
            <Image src={imageSrc} alt="Success" width={100} height={100} />
          </div>
        ) : null}

        <h2 className="mb-5 text-2xl font-semibold mt-5">{title}</h2>
        <p className="text-gray-700 mb-8">{description}</p>

        <div className="flex flex-col gap-3 mb-5">
          <button
            onClick={() => {
              onClose();
            }}
            className="w-full py-3 rounded-full font-medium text-white bg-linear-to-r from-[#1C9647] to-[#29c35f] hover:scale-[1.02]"
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            {buttonText}
          </button>

        </div>
      </div>
    </div>
  );
}

