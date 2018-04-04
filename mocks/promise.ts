export async function mockPromise<T>(resolveVal: T): Promise<T> {
  return resolveVal;
}

export async function mockPromiseReject<T>(reason: string): Promise<T> {
  throw reason;
}

export function mockPromiseLoading<T>() {
  // tslint:disable-next-line:promise-must-complete no-empty
  return new Promise<T>((resolve, reject) => {
    return;
  });
}
