import { ThunkAction } from "redux-thunk";
import TLunchMenu, { TSubLunchMenu } from "../../models/TLunchMenu";
import { RootState } from "..";
import { LunchMenuAction } from "./models";
import { addMenuAsync, deleteMenuAsync, getAllMenusAsync, getMenusByConstraintsAsync, getOneMenuByConstraintsAsync, modifyMenuAsync } from "./actions";
import { addMenu, deleteMenu, getAllMenus, getOneMenuByConstraints, modifyMenu } from "../../apis/lunchMenuAPIs";

// Thunks
export function getAllMenusThunk(): ThunkAction<void, RootState, null, LunchMenuAction> {
    return async dispatch => {
        const { request, success, failure } = getAllMenusAsync;
        dispatch(request());
        try {
            const lunchMenus = await getAllMenus();
            dispatch(success(lunchMenus));
        } catch (err) {
            if (err instanceof Error) { dispatch(failure(err)); }
            else { console.error(err); throw err }
        }
    }
}

export function getOneMenuByConstraintsThunk<T extends TSubLunchMenu>(constraints: T): ThunkAction<void, RootState, null, LunchMenuAction> {
    return async dispatch => {
        const { request, success, failure } = getOneMenuByConstraintsAsync;
        dispatch(request(constraints));
        try {
            const lunchMenus = await getOneMenuByConstraints(constraints);
            dispatch(success(lunchMenus));
        } catch (err) {
            if (err instanceof Error) { dispatch(failure(err)); }
            else { console.error(err); throw err }
        }
    }
}

export function getMenusByConstraintsThunk<T extends TSubLunchMenu>(constraints: T): ThunkAction<void, RootState, null, LunchMenuAction> {
    return async dispatch => {
        const { request, success, failure } = getMenusByConstraintsAsync;
        dispatch(request(constraints));
        try {
            const lunchMenus = await getOneMenuByConstraints(constraints);
            dispatch(success(lunchMenus));
        } catch (err) {
            if (err instanceof Error) { dispatch(failure(err)); }
            else { console.error(err); throw err }
        }
    }
}

export function addMenuThunk(lunchMenu: TLunchMenu): ThunkAction<void, RootState, null, LunchMenuAction> {
    return async dispatch => {
        const { request, success, failure } = addMenuAsync;
        dispatch(request(lunchMenu));
        try {
            const lunchMenus = await addMenu(lunchMenu);
            dispatch(success(lunchMenus));
        } catch (err) {
            if (err instanceof Error) { dispatch(failure(err)); }
            else { console.error(err); throw err }
        }
    }
}

export function modifyMenuThunk(constraints: TSubLunchMenu, lunchMenu: TLunchMenu): ThunkAction<void, RootState, null, LunchMenuAction> {
    return async dispatch => {
        const { request, success, failure } = modifyMenuAsync;
        dispatch(request({ constraints, lunchMenu }));
        try {
            const lunchMenus = await modifyMenu(constraints, lunchMenu);
            dispatch(success(lunchMenus));
        } catch (err) {
            if (err instanceof Error) { dispatch(failure(err)); }
            else { console.error(err); throw err }
        }
    }
}

export function deleteMenuThunk(constraints: TSubLunchMenu): ThunkAction<void, RootState, null, LunchMenuAction> {
    return async dispatch => {
        const { request, success, failure } = deleteMenuAsync;
        dispatch(request(constraints));
        try {
            const lunchMenus = await deleteMenu(constraints);
            dispatch(success(lunchMenus));
        } catch (err) {
            if (err instanceof Error) { dispatch(failure(err)); }
            else { console.error(err); throw err }
        }
    }
}