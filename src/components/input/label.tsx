import { type FC } from 'react';

interface Props {
  label: string;
  name: string;
  required: boolean;
  className?: string;
}

const Label: FC<Props> = ({ label, required, className = '', name }) => {
  return (
    <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
  );
};

export default Label;
