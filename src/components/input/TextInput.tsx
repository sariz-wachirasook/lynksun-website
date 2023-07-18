import { type FC } from 'react';

import Label from './Label';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  type?: 'text' | 'email' | 'password' | 'hidden' | 'search';
  maxLength?: number;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  autoComplete?: string;
  pattern?: string;
  readOnly?: boolean;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: FC<Props> = ({
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
  id,
  onChange,
}) => {
  return (
    <div className={`${label ? 'form-control w-full mb-4' : 'form-control w-full'} ${className}`}>
      {label && <Label label={label} name={name} required={required} />}
      <input
        className={`input input-bordered w-full ${type === 'search' ? 'pl-12' : ''}`}
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
        {...(id && { id })}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
