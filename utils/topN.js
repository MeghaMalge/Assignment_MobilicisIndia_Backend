const topN = (arr, n) => {
  if (n > arr.length) {
    return false;
  }
  return arr
    .slice()
    .sort((a, b) => {
      return b.total - a.total;
    })
    .slice(0, n);
};

exports.topN = topN;
