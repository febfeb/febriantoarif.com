import * as types from "./constants"

export function setUser(payload) {
    return { type: types.SET_USER, payload };
};

export function setBottomBar(payload) {
    return { type: types.SET_BOTTOM_BAR, payload };
};

export function setDebug(payload) {
    return { type: types.SET_IS_DEBUG, payload };
};

export function setRibbon(payload) {
    return { type: types.SET_RIBBON, payload };
};