export const formatDate = (value: number): string => {
  const date = value < 1e12 ? new Date(value * 1000) : new Date(value);
  return date.toLocaleString();
};

export const getDate = (dateStr: number) => formatDate(dateStr);
