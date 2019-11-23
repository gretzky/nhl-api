interface TeamOptions {
    id?: string | number;
    name?: string;
    expand?: string;
    season?: string | number;
}
export default function getTeams(options?: TeamOptions): Promise<any>;
export {};
