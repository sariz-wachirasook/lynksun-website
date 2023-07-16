import Card from '../Card';

interface Props {
  className?: string;
}

const CardBar = ({ className }: Props) => {
  return (
    <Card className={`animate-pulse ${className}`}>
      <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-2.5"></div>
      <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full"></div>
      <div className="flex items-baseline mt-4 space-x-6">
        <div className="w-full bg-gray-200 rounded-t-lg h-72"></div>
        <div className="w-full h-56 bg-gray-200 rounded-t-lg"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-72"></div>
        <div className="w-full h-64 bg-gray-200 rounded-t-lg"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-80"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-72"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-80"></div>
        <div className="w-full h-64 bg-gray-200 rounded-t-lg"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-80"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-72"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-80"></div>
        <div className="w-full h-64 bg-gray-200 rounded-t-lg"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-80"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-72"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-80"></div>
        <div className="w-full h-64 bg-gray-200 rounded-t-lg"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </Card>
  );
};

export default CardBar;
