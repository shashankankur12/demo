export const formatValue = (value: string) => {
  if (value) {
    const str = value.replace(/([^\d])/g, '');
    if (str.length <= 3) {
      return `(${str.slice(0, 3)}`;
    }
    if (str.length <= 6) {
      return `(${str.slice(0, 3)}) ${str.slice(3, 6)}${str.slice(6)}`;
    }
    if (str.length <= 14) {
      return `(${str.slice(0, 3)}) ${str.slice(3, 6)}-${str.slice(
        6,
        10,
      )}${str.slice(15)}`;
    }
  }
  return '';
};
