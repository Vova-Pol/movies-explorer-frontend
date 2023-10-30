export function countDuration(num: number): string {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;
  return `${hours}ч ${minutes}м`;
}

export function countUserAge(dateOfBirth: string): string {
  const now = new Date().valueOf();
  const birth = new Date(dateOfBirth).valueOf();
  return String(new Date(now - birth).getFullYear() - 1970);
}
