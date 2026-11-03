
export function formatDate(date: string): string {
  const parsedDate = new Date(`${date.slice(0, 10)}T00:00:00`);

  return parsedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

export function getDaysSince(date: string): number {
  const startDate = new Date(`${date.slice(0, 10)}T00:00:00`);
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return Math.max(
    0,
    Math.floor((today.getTime() - startDate.getTime()) / 86400000)
  );
}

export function isFutureDate(date: string): boolean {
  const selectedDate = new Date(`${date.slice(0, 10)}T00:00:00`);
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return selectedDate > today;
}
