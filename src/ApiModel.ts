import * as $ from "jquery";
import { resolve } from "path";

export async function getRequest<T>(url: string, params?: object) {
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

export async function postRequest<T>(url: string, data: object) {
  return new Promise<T>((resolve, reject) => {
    $.ajax({
      url,
      data: JSON.stringify(data),
      dataType: "json",
      contentType: "application/json",
      traditional: true,
      success: resolve,
      error: (xhr, status, err) => reject(new Error(err)),
      type: "POST"
    });
  });
}

export async function downloadPdfPost(url: string, items?: object) {
  return new Promise((resolve, reject) => {
    const now = new Date();
    const fileName = `Scoring_Guide${now.getMonth()}-${now.getDay()}-${now.getFullYear()}_${now.getHours()}:${now.getMinutes()}.pdf`;
    const req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.responseType = "blob";
    req.onerror = event => reject(event.error);
    req.onload = event => {
      const blob = req.response;
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      resolve();
    };
    items ? req.send(JSON.stringify({ items })) : req.send();
  });
}

export async function downloadPdfGet(url: string) {
  return new Promise((resolve, reject) => {
    const now = new Date();
    const fileName = `Scoring_Guide${now.getMonth()}-${now.getDay()}-${now.getFullYear()}_${now.getHours()}:${now.getMinutes()}.pdf`;
    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.responseType = "blob";
    req.onerror = event => reject(event.error);
    req.onload = event => {
      const blob = req.response;
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      resolve();
    };
    req.send();
  });
}
