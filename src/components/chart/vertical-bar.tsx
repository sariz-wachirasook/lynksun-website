import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { FC } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Dataset {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string[];
  borderWidth?: number;
}

interface Props {
  title: string;
  datasets: Dataset[];
  labels: string[];
}

const VerticalBar: FC<Props> = ({
  title,
  datasets = [
    {
      label: 'Dataset 1',
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
  labels = ['na/1'],
}) => {
  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <div className="w-full">
      <Bar data={chartData} options={options as any} />
    </div>
  );
};

export default VerticalBar;
