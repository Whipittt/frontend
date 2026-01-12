export function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function getStartOfWeek(date = new Date()) {
  //Week start Sunday

  const d = new Date(date);
  const day = d.getDay();

  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);

  return d.toLocaleDateString("en-CA");
}


