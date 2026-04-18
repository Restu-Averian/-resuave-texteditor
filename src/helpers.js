export const normalizeUrl = (value) => {
  const trimmed = value?.trim();

  if (!trimmed) return "";

  if (
    trimmed?.startsWith("http://") ||
    trimmed?.startsWith("https://") ||
    trimmed?.startsWith("mailto:") ||
    trimmed?.startsWith("tel:")
  ) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

export const validateUrl = (value) => {
  if (!value.trim()) {
    return "Link must not be empty.";
  }

  const normalized = normalizeUrl(value);

  try {
    new URL(normalized);
    return "";
  } catch {
    return "Invalid link format.";
  }
};
