export class PromiseCancelable<T> {
  private prom: Promise<T>;
  private isCanceled = false;
  public promise: Promise<T>;
  private canceledString = "Canceled";

  constructor(promise: Promise<T>) {
    this.prom = promise;

    this.promise = new Promise<T>((resolve, reject) => {
      this.prom
        .then(val => {
          this.isCanceled ? reject(this.canceledString) : resolve(val);
        })
        .catch(err => {
          this.isCanceled ? reject(this.canceledString) : reject(err);
        });
    });
  }

  public cancel() {
    this.isCanceled = true;
  }
}

export class Subscription {
  // tslint:disable-next-line:no-any
  private subscriptions: Map<string, PromiseCancelable<any>>;

  constructor() {
    this.subscriptions = new Map();
  }

  public getSubscription<T>(name: string): PromiseCancelable<T> | undefined {
    return this.subscriptions.get(name);
  }

  public add<T>(name: string, promise: Promise<T>): PromiseCancelable<T> {
    const promiseWrapper = new PromiseCancelable(promise);
    this.subscriptions.set(name, promiseWrapper);

    return promiseWrapper;
  }

  public cancelAll(): void {
    this.subscriptions.forEach((item, key, mapObj) => {
      item.cancel();
    });
  }
}
