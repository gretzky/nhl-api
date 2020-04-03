import {
  calculateShotDistance,
  calculateShotAngle,
  calculateShotInfo
} from "../calculateShotInfo";

describe("calculateShotDistance", () => {
  test.each([
    [-31, 34, 67.23],
    [-27, -23, 66.13],
    [-52, 15, 39.92],
    [83, -5, 7.81],
    [29, -11, 61],
    [47, 18, 45.69]
  ])("with x %p and y %p, shot distance is %p", (x, y, expected) => {
    const expectedResult = calculateShotDistance(x, y);

    expect(expected).toEqual(expectedResult);
  });
});

describe("calculateShotAngle", () => {
  test.each([
    [-31, 34, 30.38],
    [-27, -23, 20.35],
    [-52, 15, 22.07],
    [83, -5, 39.81],
    [29, -11, 10.39],
    [47, 18, 23.2]
  ])("with x %p and y %p, shot angle is %p", (x, y, expected) => {
    const expectedResult = calculateShotAngle(x, y);

    expect(expected).toEqual(expectedResult);
  });
});
