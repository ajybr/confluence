import React, { forwardRef } from "react";

interface FormInputProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  error?: string;
  rightElement?: React.ReactNode;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      value,
      onChange,
      placeholder,
      type = "text",
      disabled,
      required,
      readOnly,
      maxLength,
      error,
      rightElement,
    },
    ref,
  ) => {
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      if (maxLength && e.target.value.length > maxLength) return;
      if (!readOnly && onChange) onChange(e.target.value);
    };

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={label.toLowerCase().replace(/\s+/g, "")}
            className="text-sm text-white/70 pl-2"
          >
            {label}
            {required && <span className="text-red-400">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={label.toLowerCase().replace(/\s+/g, "")}
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            className={`w-full px-3 py-3 rounded-sm border-1 border-white/20 font-nebula-light text-[#e9e6e1] bg-transparent/50 outline-none focus:placeholder:pt-15 placeholder:absolute placeholder:duration-500  h-fit resize-none border-b focus:outline-none focus:border-[#977DFF]/50 transition-colors ${
              rightElement ? "pr-24" : ""
            } ${error ? "border-red-400" : ""}`}
          />
          {rightElement && (
            <div className="absolute right-1 top-1 bottom-1 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-400 pl-2">{error}</p>}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export default FormInput;

