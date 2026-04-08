import React from 'react';
import { cn } from '@/src/lib/utils';

interface FormInputProps {
  label: string;
  error?: string;
  textarea?: boolean;
  rows?: number;
  id?: string;
  name?: string;
  type?: string;
  required?: boolean;
  value?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  className?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, FormInputProps>(
  ({ label, error, className, textarea, rows, id: propId, name, type, required, value, onChange }, ref) => {
    const id = propId || name;
    
    return (
      <div className="space-y-1.5">
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">
          {label}
        </label>
        {textarea ? (
          <textarea
            id={id}
            name={name}
            required={required}
            value={value}
            onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
            rows={rows}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={cn(
              "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            required={required}
            value={value}
            onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
            ref={ref as React.Ref<HTMLInputElement>}
            className={cn(
              "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
          />
        )}
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
