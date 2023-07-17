import { type FC, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: FC<Props> = ({ children, className = '', onClick }) => {
  return (
    <div className={`card w-full bg-base-100 shadow-lg border border-base-300 ${className}`} onClick={onClick}>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
