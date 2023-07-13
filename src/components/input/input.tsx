import { type FC } from 'react';

import Label from './label';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  type?: 'text' | 'email' | 'password';
  maxLength?: number;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  autoComplete?: string;
  pattern?: string;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Text: FC<Props> = ({
  name,
  label,
  placeholder,
  required = false,
  type = 'text',
  maxLength = 255,
  defaultValue,
  value,
  disabled = false,
  className = '',
  autoComplete,
  pattern,
  readOnly = false,
  onChange,
}) => {
  return (
    <div className={`${label ? 'mb-4' : ''} ${className}`}>
      {label && <Label label={label} name={name} required={required} />}
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        {...(pattern && { pattern })}
        {...(autoComplete && { autoComplete })}
        {...(defaultValue && { defaultValue })}
        disabled={disabled}
        {...(disabled && { readOnly: true })}
        {...(readOnly && !disabled && { readOnly: true })}
        {...(value && { value })}
        onChange={onChange}
      />
    </div>
  );
};

export default Text;
