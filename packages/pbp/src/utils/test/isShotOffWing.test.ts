import { isShotOffWing } from "../isShotOffWing";

describe("isShotOffWing", () => {
  test.each([
    ["left", "home", 1, 50, true],
    ["left", "home", 1, -50, false],
    ["left", "home", 2, -50, true],
    ["left", "home", 2, 50, false],
    ["left", "home", 3, 50, true],
    ["left", "home", 3, -50, false],
    ["left", "away", 1, -50, true],
    ["left", "away", 1, 50, false],
    ["left", "away", 2, 50, true],
    ["left", "away", 2, -50, false],
    ["left", "away", 3, -50, true],
    ["left", "away", 3, 50, false],
    ["right", "home", 1, -50, true],
    ["right", "home", 1, 50, false],
    ["right", "home", 2, -50, false],
    ["right", "home", 2, 50, true],
    ["right", "home", 3, -50, true],
    ["right", "home", 3, 50, false],
    ["right", "away", 1, 50, true],
    ["right", "away", 1, -50, false],
    ["right", "away", 2, 50, false],
    ["right", "away", 2, -50, true],
    ["right", "away", 3, 50, true],
    ["right", "away", 3, -50, false],
  ])(
    "player shoots %p, team side %p, period %p, shot coord %p, %p",
    (playerShoots, teamSide, period, yCoord, expected) => {
      const result = isShotOffWing(playerShoots, teamSide, period, yCoord);

      expect(result).toEqual(expected);
    }
  );
});
