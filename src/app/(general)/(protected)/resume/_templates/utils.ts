export const formatDate = (dateStr: string) => {
  const [year, month] = dateStr.split("-");
  return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
    },
  );
};

export const extractUsername = (url: string): string => {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    const parts = u.pathname.split("/").filter(Boolean);

    if (host.includes("linkedin.com") && parts[0] === "in")
      return parts[1] || host;
    if (host.includes("github.com")) return parts[0] || host;
    if (host.includes("x.com") || host.includes("twitter.com"))
      return parts[0] || host;
    return parts[0] || host;
  } catch {
    return url;
  }
};
