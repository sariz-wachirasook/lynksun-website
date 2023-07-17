import { type FC, type ReactNode } from 'react';

interface Props {
  label?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  buttonType?: 'default' | 'alternative' | 'error';
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

const Button: FC<Props> = ({
  label,
  type = 'button',
  onClick,
  buttonType,
  prefix,
  suffix,
  className = '',
  children,
}) => {
  const modifier = buttonType ? `btn-${buttonType}` : 'btn-primary';
  return (
    <button type={type} className={`btn ${modifier} ${className}`} onClick={onClick}>
      {prefix}
      {label} {children}
      {suffix}
    </button>
  );
};

export default Button;
