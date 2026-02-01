import React from "react";

interface FormTextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  maxLength?: number;
  error?: string;
}

const FormTextArea = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  disabled, 
  required,
  rows = 3,
  maxLength,
  error
}: FormTextAreaProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (maxLength && e.target.value.length > maxLength) return;
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={label.toLowerCase().replace(/\s+/g, '')} className="text-sm text-white/70 pl-2">
          {label}
          {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <div className="relative">
        <textarea
          id={label.toLowerCase().replace(/\s+/g, '')}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className="w-full px-3 py-3 rounded-sm border-1 border-white/20 font-nebula-light text-[#e9e6e1] bg-transparent/50 resize-none outline-none focus:placeholder:pt-15 placeholder:absolute placeholder:duration-500 h-fit border-b focus:outline-none focus:border-[#977DFF]/50 transition-colors"
        />
      </div>
      {error && (
        <p className="text-xs text-red-400 pl-2">{error}</p>
      )}
    </div>
  );
};

export default FormTextArea;