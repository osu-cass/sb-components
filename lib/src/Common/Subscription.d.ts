export declare class PromiseCancelable<T> {
    private prom;
    private isCanceled;
    promise: Promise<T>;
    private canceledString;
    constructor(promise: Promise<T>);
    cancel(): void;
}
export declare class Subscription {
    private subscriptions;
    constructor();
    getSubscription<T>(name: string): PromiseCancelable<T> | undefined;
    add<T>(name: string, promise: Promise<T>): PromiseCancelable<T>;
    cancelAll(): void;
}
