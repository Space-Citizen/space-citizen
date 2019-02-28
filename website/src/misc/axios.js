import axios from 'axios';
import { getTokenInHeader, clearToken } from './token';
import { createNotification } from './notification';

function catchInvalidToken(error) {
    if (!window || !window.ERROR_CODES)
        return;
    if (error.code === window.ERROR_CODES.TOKEN_INVALID
        || error.code === window.ERROR_CODES.TOKEN_EXPIRED) {
        clearToken();
        window.location = "/signin";
    }
}

function handleError(error) {
    var response = undefined;

    if (error && error.response)
        response = error.response;
    if (!response || !response.data) {
        return ("An error was catched");
    }
    response = response.data;
    // check if the error is regarding the token
    catchInvalidToken(response);
    createNotification('warning', response.error);
    return ("An error was catched");
}

export function post(url, data) {
    return (new Promise(function (resolve, reject) {
        axios.post(url, data, getTokenInHeader()).then(response => {
            resolve(response);
        }).catch(error => {
            reject(handleError(error));
        });
    }));
}

export function get(url) {
    return (new Promise(function (resolve, reject) {
        axios.get(url, getTokenInHeader()).then(response => {
            resolve(response);
        }).catch(error => {
            reject(handleError(error));
        });
    }));
}