import * as $ from 'jquery';

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

export interface Failure {
    kind: "failure";
}

export interface Reloading<T> {
    kind: "reloading";
    content: T | undefined;
}

export type Resource<T> = Loading | Success<T> | Reloading<T> | Failure | NotLoaded;

export function parseQueryString(url: string): { [key: string]: string[] | undefined } {
    let queryObject: { [key: string]: string[] | undefined } = {};
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
    if ((resource.kind == "success" || resource.kind == "reloading")) {
        return resource.content;
    }
}


export async function get<T>(url: string, params?: object) {
    return new Promise<T>((resolve, reject) => {
        $.ajax({
            url: url,
            dataType: "json",
            traditional: true,
            data: params,
            success: resolve,
            error: (xhr, status, err) => reject(new Error(err)),
            type: "GET"
        })
    });
}