export const getJsonString = (value: unknown, replacer?: (number | string)[] | null, space?: string | number) => {
  return JSON.stringify(value, replacer, space).replace(/\[\s+([^[\]]*?)\s+\]/g, (_match, inner) => {
    return `[ ${inner.replace(/\s+/g, " ").trim()} ]`;
  });
};
