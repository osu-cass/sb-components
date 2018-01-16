export async function mockPromise<T>(resolveVal: T) {
  return new Promise<T>(resolve => {
    resolve(resolveVal);
  });
}

export async function mockPromiseReject<T>(reason: string) {
  return new Promise<T>((resolve, reject) => {
    reject(reason);
  });
}

export async function mockPromiseLoading<T>() {
  // tslint:disable-next-line:promise-must-complete
  return new Promise<T>((resolve, reject) => {
    return;
  });
}
