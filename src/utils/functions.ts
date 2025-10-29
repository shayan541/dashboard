export const getDayTimeMessage = (hourTime: number) => {
  switch (true) {
    case hourTime < 12:
      return "morning_msg";
    case hourTime < 18:
      return "evening_msg";
    default:
      return "night_msg";
  }
};

export const timeFormat = (time: Date, currentLocale: "fa-IR" | "en-GB") => {
  console.log(time);
  return time.toLocaleTimeString(currentLocale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const checkIsWindy = (speed: number) => {
  if (speed <= 5) {
    return "normal";
  }
  if (speed > 5) {
    return "windy";
  }
};
