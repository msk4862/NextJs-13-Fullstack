export const delay = (waitTime: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), waitTime);
  });
};

export const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
