function countDuration(num) {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;
  return `${hours}ч ${minutes}м`;
}

export default countDuration;
