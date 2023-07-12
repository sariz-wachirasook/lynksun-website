export const formatDateTime = (datetime: string) => {
  const date = new Date(datetime);

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};
