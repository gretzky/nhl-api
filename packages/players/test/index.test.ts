import { getPlayerId } from "..";

const mock = [
  {
    id: 8447400,
    name: "WAYNE GRETZKY",
    nicknames: ["THE GREAT ONE"]
  },
  {
    id: 8458985,
    name: "BRENT GRETZKY",
    nicknames: ["THE OTHER ONE", "THE NOT SO GREAT ONE"]
  }
];

describe("getPlayerId", () => {
  it("gets a player id from a player name", () => {
    const p = getPlayerId("patrice bergeron");
    expect(p).toBe(8470638);
  });
  it("returns all players with a last name", () => {
    const p = getPlayerId("gretzky");
    expect(p).toStrictEqual(mock);
  });
});
