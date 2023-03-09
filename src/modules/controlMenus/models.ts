// models
import { ActionType } from "typesafe-actions";
import { TLunchMenu, TSubLunchMenu } from "../../models/LunchMenuDB";
import { addMenuAsync, deleteMenuAsync, getAllMenusAsync, getMenusAsync, getOneMenuAsync, modifyMenuAsync } from './actions';

export type TModifyMenuParams = {
    constraints: TSubLunchMenu;
    lunchMenu: TLunchMenu;
}

const actions = { getAllMenusAsync, getOneMenuAsync, getMenusAsync, addMenuAsync, modifyMenuAsync, deleteMenuAsync }
export type LunchMenuAction = ActionType<typeof actions>;

export type LunchMenuState = {
    lunchMenuState: {
        loading: boolean;
        error: Error | null;
        data: TLunchMenu[];
    }
}