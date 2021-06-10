import * as types from "./constants"

const initialState = {
    user: null,
    bottomBar: 'Root',
    debug: true,
    ribbon: null
};

export function apiReducer(state = initialState, action) {
    return state
}

export function loginReducer(state = initialState, action) {
    if (state == null) state = initialState;

    if (action.type == types.SET_USER) {
        return { ...state, user: action.payload };
    }

    if (action.type == types.SET_BOTTOM_BAR) {
        return { ...state, bottomBar: action.payload };
    }

    if (action.type == types.SET_IS_DEBUG) {
        return { ...state, debug: action.payload };
    }

    if (action.type == types.SET_RIBBON) {
        return { ...state, ribbon: action.payload };
    }

    return state;
}