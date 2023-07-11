interface Props {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: Props) => {
  return <div className={`card ${className}`}>{children}</div>;
};

export default Card;
