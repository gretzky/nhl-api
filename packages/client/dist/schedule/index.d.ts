import { BaseOptions } from '../util';
declare type ScheduleOptions = BaseOptions & {
    expand?: string;
    team?: any;
    date?: string;
    startDate?: string;
    endDate?: string;
};
export default function getSchedule(options?: ScheduleOptions): Promise<void>;
export {};
