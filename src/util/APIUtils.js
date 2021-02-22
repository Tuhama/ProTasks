import {
  API_BASE_URL,
  ACCESS_TOKEN,
  LOGIN_URL,
  INVENTORY_ISSUES_URL,
  RESOURCE_CATEGORIES_URL,
  CATEGORY_RESOURCES_URL,
  CATEGORY_PARAM,
} from "../constants";
import axios from "axios";

const request = (options) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "token hmac",
  };
  if (!options.noAuth) {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      Object.assign(headers, {
        Authorization: "token " + localStorage.getItem(ACCESS_TOKEN) + " hmac",
      });
    } else console.log("token lost");
  }

  return axios({ ...options, headers: headers, timeout: 5000 })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + LOGIN_URL,
    method: "POST",
    data: loginRequest,
    noAuth: true,
  });
}

export function getInventoryIssues() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + INVENTORY_ISSUES_URL,
    method: "GET",
    noAuth: false,
  });
}
export function addInventoryIssue(inventoryIssue) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + INVENTORY_ISSUES_URL,
    method: "POST",
    body: inventoryIssue,
    noAuth: false,
  });
}

export function getResourceCategories() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  return request({
    url: API_BASE_URL + RESOURCE_CATEGORIES_URL,
    method: "GET",
    noAuth: false,
  });
}

export function getCategoryResources(categoryId) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + CATEGORY_RESOURCES_URL + categoryId,
    method: "GET",
    noAuth: false,
  });
}

export function getInventoryTableHeaders() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "tableheader?tablename=inventoryissue",
    method: "GET",
    noAuth: false,
  });
}
