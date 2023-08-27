const maxProfit = (prices, profit = 0, min = Number.MAX_SAFE_INTEGER) => {
  let current = prices.shift();
  if (current < min) min = current;
  let max = Math.max(...prices) - min;
  profit = Math.max(max, profit);
  if (prices.length == 0) return profit;
  return maxProfit(prices, profit, min);
};

maxProfit([7, 1, 5, 3, 6, 4]);
