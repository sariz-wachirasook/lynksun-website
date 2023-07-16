interface Props {
  className?: string;
}

const CardSkeleton = ({ className }: Props) => {
  return (
    <div
      role="status"
      className={`w-full p-4 border border-gray-200 rounded-lg shadow animate-pulse md:p-6 dark:border-gray-700 ${className}`}
    >
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default CardSkeleton;
