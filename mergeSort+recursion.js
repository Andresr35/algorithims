const mergeSort = (arr) => {
  if (arr.length < 2) return arr;
  return merge(
    mergeSort(arr.slice(0, arr.length / 2)),
    mergeSort(arr.slice(arr.length / 2, arr.length))
  );
};

const merge = (left, right) => {
  let leftCount = 0,
    rightCount = 0;
  const newArr = [];

  while (!(leftCount == left.length && rightCount == right.length)) {
    if (leftCount == left.length) {
      newArr.push(right[rightCount++]);
    } else if (rightCount == right.length) {
      newArr.push(left[leftCount++]);
    } else if (left[leftCount] > right[rightCount]) {
      newArr.push(right[rightCount++]);
    } else {
      newArr.push(left[leftCount++]);
    }
  }
  return newArr;
};

console.log(mergeSort([4, 8, 6, 2, 1, 7, 5, 3, 5, 9, 10]));
