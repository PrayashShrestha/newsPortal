export const isEmptyObject = (value: Object | null) => {
  for (let prop in value) {
    if (value.hasOwnProperty(prop)) return false;
  }
  return true;
};
