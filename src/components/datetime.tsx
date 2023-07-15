import { FC } from 'react';
import { formatDateTime } from '../utils/date';

interface Props {
  datetimeString: string;
}

const Datetime: FC<Props> = ({ datetimeString }) => {
  return <time dateTime={datetimeString}>{formatDateTime(datetimeString)}</time>;
};

export default Datetime;
