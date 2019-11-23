import teams from './teams';
interface Team {
    id: number;
    name: string;
    abbreviation: string;
    nicknames: string[];
    colors: string[];
}
declare const getTeamId: (name: string) => number | Team[];
export { getTeamId };
export default teams;
