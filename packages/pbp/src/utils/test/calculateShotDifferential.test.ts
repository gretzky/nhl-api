import { calculateShotDifferential } from "../calculateShotDifferential";

describe("calculateShotDifferential", () => {
  it("gets the corsi and fenwick ratings based on given shots in a game", () => {
    const forShots = {
      goals: 3,
      shots: 14,
      missed: 8,
      blocked: 5,
    };
    const againstShots = {
      goals: 2,
      shots: 17,
      missed: 9,
      blocked: 12,
    };

    const result = calculateShotDifferential(forShots, againstShots);

    const expectedResult = {
      cf: 30,
      ca: 40,
      corsi: -10,
      corsiPctg: "42.9",
      ff: 25,
      fa: 28,
      fenwick: -3,
      fenwickPctg: "47.2",
    };

    expect(result).toEqual(expectedResult);
  });
});
