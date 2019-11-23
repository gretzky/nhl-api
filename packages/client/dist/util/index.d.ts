export declare type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
}[Keys];
export declare type BaseOptions = {
    id?: number | string;
};
export declare const api: import("axios").AxiosInstance;
export declare const throwError: (fn: string, msg?: string | undefined, err?: Error | undefined) => void;
export declare const handleUrl: (res: string, options?: BaseOptions | undefined) => string;
export declare function get(url: string, res?: any, options?: any): Promise<any>;
