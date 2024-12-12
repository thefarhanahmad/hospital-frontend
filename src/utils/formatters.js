export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const formatSelectOptions = (values) => {
  return Object.values(values).map(value => ({
    value,
    label: capitalizeFirstLetter(value),
  }));
};