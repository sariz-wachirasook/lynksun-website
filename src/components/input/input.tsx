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
  value?: string;
  disabled?: boolean;
}

const Text: FC<Props> = ({
  name,
  label,
  placeholder,
  required = false,
  type = 'text',
  maxLength = 255,
  value,
  disabled = false,
  className = '',
}) => {
  let pattern = null;

  if (type === 'email') {
    pattern = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  }

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
        value={value}
        disabled={disabled}
      />
    </div>
  );
};

export default Text;
