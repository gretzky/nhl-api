import { getPlayerId } from '../src';

const mock = [
  {
    id: 8447400,
    name: 'Wayne Gretzky',
  },
  {
    id: 8456438,
    name: 'Keith Gretzky',
  },
  {
    id: 8458985,
    name: 'Brent Gretzky',
  },
];

describe('getPlayerId', () => {
  it('gets a player id from a player name', () => {
    const p = getPlayerId('patrice bergeron');
    expect(p).toBe(8470638);
  });
  it('returns all players with a last name', () => {
    const p = getPlayerId('gretzky');
    expect(p).toStrictEqual(mock);
  });
});
