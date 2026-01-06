"use client";

import type React from "react";

import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

type CommonInputProps = {
  label?: string;
  name: string;
  type?: "text" | "email" | "password" | "search" | "number" | "tel";
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  iconInput?: boolean;
  noMargin?: boolean;
  error?: string;
  inputMode?:
    | "text"
    | "email"
    | "tel"
    | "url"
    | "numeric"
    | "decimal"
    | "search";
};

const CommonInput: React.FC<CommonInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  defaultValue,
  onChange,
  required = false,
  disabled = false,
  className = "",
  iconInput = false,
  noMargin = false,
  error,
  inputMode,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const hasError = !!error;

  return (
    <div className={`${noMargin ? "" : "mb-5"} w-full`}>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-800"
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          name={name}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          required={required}
          inputMode={inputMode}
          className={`
            w-full rounded-md border px-4 py-3 text-sm
            outline-none transition focus:ring-1
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${
              hasError
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-primary focus:ring-primary"
            }
            ${iconInput || isPassword ? "pr-12" : ""}
            ${type === "number" ? "no-spinner" : ""}
            ${className}
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {hasError && !isPassword && (
          <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
        )}
      </div>

      {hasError && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CommonInput;
