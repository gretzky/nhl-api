import { throwError, handleUrl, get } from '../util';

type GameOptions = {
  id: number | string;
  type: string;
};

export default async function getGame(options: GameOptions): Promise<void> {
  const baseUrl = handleUrl('game', options);

  const isFeed = options.type.includes('feed') || options.type.includes('live');

  const url = () => {
    if (isFeed) {
      return `${baseUrl}/feed/live`;
    }
    return `${baseUrl}/${options.type}`;
  };

  if (!options || !options.id) {
    throwError('getGame', 'Must include a game ID.');
  }

  try {
    const response = await get(url(), undefined, options).then((data: any) => {
      if (isFeed) {
        return {
          gamePk: data.gamePk,
          link: data.link,
          liveData: data.liveData,
          gameData: data.gameData,
        };
      }
      return data;
    });

    //const response = await get('game', url(), options).then(res => res);
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getGame', err);
  }
}
