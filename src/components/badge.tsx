import { FC, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: (e: any) => void;
}

const Badge: FC<Props> = ({ className, children, onClick }) => {
  return (
    <span
      onClick={onClick}
      className={`bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
