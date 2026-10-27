type Props = {
  dateStr: number;
};

const LastSeen = ({ dateStr }:Props) => {
  const date = new Date(dateStr).toLocaleDateString();

  return <em><sup><sup>был(а) {date}</sup></sup></em>
};

export default LastSeen;
