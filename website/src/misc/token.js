export function getToken() {
    return (localStorage.getItem('x-access-token'));
}

export function isConnected() {
    if (getToken())
        return (true);
    return (false);
}

export function getTokenInHeader() {
    return ({ headers: { "x-access-token": getToken() } });
}

export function clearToken() {
    localStorage.removeItem('x-access-token');
}