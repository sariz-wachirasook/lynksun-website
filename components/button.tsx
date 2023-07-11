interface Props {
  label: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  buttonType?: 'default' | 'alternative';
  className?: string;
  onClick?: () => void;
}

const Button = ({
  label,
  type = 'button',
  onClick,
  buttonType,
  prefix,
  suffix,
  className,
}: Props) => {
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
