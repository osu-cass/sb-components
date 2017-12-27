import * as $ from "jquery";

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

export type Resource<T> =
  | Loading
  | Success<T>
  | Reloading<T>
  | Failure<T>
  | NotLoaded;

export function parseQueryString(
  url: string
): { [key: string]: string[] | undefined } {
  const queryObject: { [key: string]: string[] | undefined } = {};
  const pairs = url.slice(url.indexOf("?") + 1).split("&");
  for (const pair of pairs) {
    const pairParts = pair.split("=");
    if (pairParts[0] && pairParts[1]) {
      queryObject[pairParts[0]] = pairParts[1].split(",");
    }
  }
  return queryObject;
}

export function getResourceContent<T>(resource: Resource<T>): T | undefined {
  if (
    resource.kind === "success" ||
    resource.kind === "reloading" ||
    resource.kind === "failure"
  ) {
    return resource.content;
  }
}

export async function get<T>(url: string, params?: object) {
  return new Promise<T>((resolve, reject) => {
    $.ajax({
      url,
      dataType: "json",
      traditional: true,
      data: params,
      success: resolve,
      error: (xhr, status, err) => reject(new Error(err)),
      type: "GET"
    });
  });
}

export async function post<T>(url: string, items?: object) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.responseType = "blob";
    req.onerror = event => reject(event.error);
    req.onload = event => {
      const blob = req.response;
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `Scoring_Guide${new Date().toDateString}.pdf`;
      document.body.appendChild(link);
      link.click();
      resolve();
    };
    items ? req.send(items) : req.send();
  });
}
