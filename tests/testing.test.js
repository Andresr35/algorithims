import { capitalize, reverseString, analyzeArray } from "./testing";

test("hello should go to Hello", () => {
  expect(capitalize("hello")).toMatch(/Hello/);
});

test("abc should go to cba", () => {
  expect(reverseString("abc")).toBe("cba");
});

test("average: 4", () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6]).average).toBe(4);
});

test("min: 1", () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6]).min).toBe(1);
});
test("max: 8", () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6]).max).toBe(8);
});
test("length: 6", () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6]).length).toBe(6);
});
