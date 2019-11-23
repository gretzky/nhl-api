import players from './players';
interface Player {
    id: number;
    name: string;
}
declare const getPlayerById: (id: string | number) => Player;
declare const getPlayerId: (name: string) => number | Player[];
declare type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
}[Keys];
interface Options {
    id?: number | string;
    name?: string;
    team: string;
    season?: number | string;
}
declare const getPlayerMugshot: (options: RequireOnlyOne<Options, "id" | "name">) => string;
export { getPlayerById, getPlayerId, getPlayerMugshot };
export default players;
