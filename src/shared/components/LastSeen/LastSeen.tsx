import { formatDate } from '@utils/getDate.ts';

type Props = {
  dateStr: number;
};

const LastSeen = ({ dateStr }: Props) => {
  return <em><sup><sup>{formatDate(dateStr)}</sup></sup></em>;
};

export default LastSeen;
