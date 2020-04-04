import {
  calculateShotPercentage,
  calculateSavePercentage,
} from "../calculateShotSavePercentage";

describe("calculateShotPercentage", () => {
  it("should get the shot percentage based on goals and shots", () => {
    const result = calculateShotPercentage(3, 28);

    expect(result).toEqual(10.7);
  });
});

describe("calculateSavePercentage", () => {
  it("should get the save percentage based on goals and shots", () => {
    const result = calculateSavePercentage(3, 28);

    expect(result).toEqual(89.29);
  });
});
