export const formatDate = (date: Date | null, locale = "es-ES") => {
  if (!date) return "No disponible";
  return date.toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
