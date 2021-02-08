import {API_BASE_URL, ACCESS_TOKEN, LOGIN_URL, INVENTORY_URL} from "../constants";
import axios from "axios";

const request = (options) => {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": "token hmac"
    };
    if (!options.noAuth) {
        if (localStorage.getItem(ACCESS_TOKEN)) {
            Object.assign(headers, {
                Authorization: "token " +localStorage.getItem(ACCESS_TOKEN)+ " hmac",
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

export function getInventoryIssue() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + INVENTORY_URL,
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
