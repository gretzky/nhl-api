interface StandingsOptions {
  season?: number | string;
  date?: string;
  expand?: string;
}
export default function getStandings(options?: StandingsOptions): Promise<void>;
export {};
