import { type FC, type ReactNode } from 'react';

interface Props {
  label: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  buttonType?: 'default' | 'alternative' | 'danger';
  className?: string;
  onClick?: () => void;
}

const Button: FC<Props> = ({
  label,
  type = 'button',
  onClick,
  buttonType,
  prefix,
  suffix,
  className,
}) => {
  const modifier = buttonType ? `btn--${buttonType}` : '';
  return (
    <button type={type} className={`btn ${modifier} ${className}`} onClick={onClick}>
      {prefix}
      {label}
      {suffix}
    </button>
  );
};

export default Button;
