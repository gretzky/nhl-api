import { getTeamId } from '../src';

const mockTeams = [
  {
    id: 10,
    name: 'Toronto Maple Leafs',
    abbreviation: 'TOR',
    nicknames: ['Leafs', 'Cry Babies'],
    colors: ['#00205B', '#FFF'],
    logo:
      'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Toronto_Maple_Leafs_2016_logo.svg/440px-Toronto_Maple_Leafs_2016_logo.svg.png',
    goalHorn:
      'https://github.com/gretzky/nhl-api/blob/master/packages/teams/src/assets/horns/tor.m4a',
    goalHornSong:
      'https://github.com/gretzky/nhl-api/blob/master/packages/teams/src/assets/songs/tor.mp3',
    isActive: true,
  },
  {
    id: 58,
    name: 'Toronto St. Patricks',
    abbreviation: 'TSP',
    nicknames: [],
    colors: ['#046A38', '#FFF'],
    logo:
      'https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Toronto_St._Patricks_logo.svg/440px-Toronto_St._Patricks_logo.svg.png',
    goalHorn: '',
    goalSong: '',
    isActive: false,
  },
  {
    id: 57,
    name: 'Toronto Arenas',
    abbreviation: 'TAN',
    nicknames: [],
    colors: ['#003087'],
    logo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Toronto_Arenas_Logo.svg/440px-Toronto_Arenas_Logo.svg.png',
    goalHorn: '',
    goalSong: '',
    isActive: false,
  },
];

describe('getTeamId', () => {
  it('gets a team by a name', () => {
    const t = getTeamId('bruins');
    expect(t).toBe(6);
  });

  it('gets all teams that match a query', () => {
    const t = getTeamId('toronto');
    expect(t).toStrictEqual(mockTeams);
  });
});
