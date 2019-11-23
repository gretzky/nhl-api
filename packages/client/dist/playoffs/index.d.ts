import { BaseOptions } from '../util';
declare type PlayoffOptions = BaseOptions & {
    season?: string | number;
};
export default function getPlayoffs(options?: PlayoffOptions): Promise<void>;
export {};
