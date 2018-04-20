export interface Loading {
    kind: "loading";
}
export interface NotLoaded {
    kind: "none";
}
export interface Success<T> {
    kind: "success";
    content: T | undefined;
}
export interface Failure<T> {
    kind: "failure";
    content?: T;
}
export interface Reloading<T> {
    kind: "reloading";
    content: T | undefined;
}
export declare type Resource<T> = Loading | Success<T> | Reloading<T> | Failure<T> | NotLoaded;
export declare function getResourceContent<T>(resource: Resource<T>): T | undefined;
