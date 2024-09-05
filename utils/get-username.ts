export const getUsername = (name: string | null, uid: string): string => {
  if (!name && !uid) return "";
  return (
    `@${name?.split(" ")[0].toLowerCase()}` + `${uid.slice(-4).toLowerCase()}`
  );
};
