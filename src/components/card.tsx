import { type FC, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const Card: FC<Props> = ({ children, className }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

export default Card;
