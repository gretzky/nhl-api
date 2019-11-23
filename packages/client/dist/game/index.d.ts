declare type GameOptions = {
  id: number | string;
  type: string;
};
export default function getGame(options: GameOptions): Promise<void>;
export {};
