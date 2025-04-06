export const getShowStatus = (dateTime) => {
  const now = new Date();
  const showTime = new Date(dateTime);

  const startBuffer = 0; // buffer before show starts
  const endBuffer = 4 * 60 * 60 * 1000; //  4 hours show duration

  if (showTime > now) return "notStarted";
  if (now - showTime <= endBuffer) return "started";
  return "expired";
};
