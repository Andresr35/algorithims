const capitalize = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};
const reverseString = (string) => {
  const arr = string.split("");
  arr.reverse();
  return arr.join("");
};
const analyzeArray = (array) => {
  const average =
    array.reduce((prev, curr) => (curr = prev + curr)) / array.length;
  const min = Math.min(...array);
  const max = Math.max(...array);
  const length = array.length;

  return { average, min, max, length };
};

export { capitalize, reverseString, analyzeArray };
