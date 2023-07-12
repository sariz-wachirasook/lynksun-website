import { FC } from 'react';

interface Props {
  label: string;
  className?: string;
}

const Badge: FC<Props> = ({ label, className }) => {
  return (
    <span
      className={`bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ${className}`}
    >
      {label}
    </span>
  );
};

export default Badge;
