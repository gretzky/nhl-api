import { BaseOptions } from '../util';
declare type DraftOptions = BaseOptions & {
  year?: number | string;
};
export default function getDraft(options?: DraftOptions): Promise<void>;
export {};
