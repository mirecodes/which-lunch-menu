
import { createReducer } from "typesafe-actions";
import { LunchMenuAction, LunchMenuState } from "./models";
import { ADD_MENU, DELETE_MENU, GET_ALL_MENUS, GET_MENUS, GET_ONE_MENU, MODIFY_MENU, REQUEST_FAILURE, REQUEST_SUCCESS } from "./actions";

// Initial State
const initialState: LunchMenuState = {
    lunchMenuState: {
        loading: false,
        error: null,
        data: [],
    }
}

// Reducer
const controlMenusReducer = createReducer<LunchMenuState, LunchMenuAction>(initialState, {
    [GET_ALL_MENUS]: state => ({
        ...state,
        lunchMenuState: {
            loading: true,
            error: null,
            data: [],
        }
    }),
    [GET_ONE_MENU]: state => ({
        ...state,
        lunchMenuState: {
            loading: true,
            error: null,
            data: [],
        }
    }),
    [GET_MENUS]: state => ({
        ...state,
        lunchMenuState: {
            loading: true,
            error: null,
            data: [],
        }
    }),
    [ADD_MENU]: state => ({
        ...state,
        lunchMenuState: {
            loading: true,
            error: null,
            data: [],
        }
    }),
    [MODIFY_MENU]: state => ({
        ...state,
        lunchMenuState: {
            loading: true,
            error: null,
            data: [],
        }
    }),
    [DELETE_MENU]: state => ({
        ...state,
        lunchMenuState: {
            loading: true,
            error: null,
            data: [],
        }
    }),
    [REQUEST_SUCCESS]: (state, action) => ({
        ...state,
        lunchMenuState: {
            loading: false,
            error: null,
            data: action.payload
        }
    }),
    [REQUEST_FAILURE]: (state, action) => ({
        ...state,
        lunchMenuState: {
            loading: false,
            error: action.payload,
            data: []
        }
    })
});

export default controlMenusReducer;