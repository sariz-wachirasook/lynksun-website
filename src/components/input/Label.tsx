import { type FC } from 'react';

interface Props {
  label: string;
  name: string;
  required: boolean;
  className?: string;
}

const Label: FC<Props> = ({ label, required, className = '', name }) => {
  return (
    <label htmlFor={name} className="label pt-0">
      <span className="label-text">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
    </label>
  );
};

export default Label;
