import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField: React.FC<InputProps> = ({
  label,
  error,
  ...props
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium">{label}</label>
    <input
      {...props}
      className={`w-full border border-(--Stroke,#D9D9D9) rounded-3xl px-3 py-3 placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-green-300 hover:border-gray-400 transition ${
        error ? "border-red-500" : ""
      }`}
    />
    {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  </div>
);
