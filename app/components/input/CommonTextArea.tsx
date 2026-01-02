"use client";

import React from "react";

type CommonTextareaProps = {
  label?: string;
  name: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
};

const CommonTextarea: React.FC<CommonTextareaProps> = ({
  label,
  name,
  placeholder,
  value,
  defaultValue,
  onChange,
  required = false,
  disabled = false,
  rows = 5,
  className = "",
}) => {
  return (
    <div className="mb-5 w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-800"
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`
          w-full rounded-md border border-gray-300 px-4 py-3 text-sm
          outline-none transition
          focus:border-primary focus:ring-1 focus:ring-primary
          disabled:bg-gray-100 disabled:cursor-not-allowed
          resize-none
          ${className}
        `}
      />
    </div>
  );
};

export default CommonTextarea;
