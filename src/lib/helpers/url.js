export const isSafeRedirect = (path) =>
  path && path.startsWith("/") && !path.startsWith("//");
