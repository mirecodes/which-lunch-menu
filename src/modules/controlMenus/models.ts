// models
import { ActionType } from "typesafe-actions";
import TLunchMenu, { TSubLunchMenu } from "../../models/TLunchMenu";
import { addMenuAsync, deleteMenuAsync, getAllMenusAsync, getOneMenuByConstraintsAsync } from './actions';
import { getMenusByConstraintsAsync } from './actions';
import { modifyMenuAsync } from './actions';

export type TModifyMenuParams = {
    constraints: TSubLunchMenu;
    lunchMenu: TLunchMenu;
}

const actions = { getAllMenusAsync, getOneMenuByConstraintsAsync, getMenusByConstraintsAsync, addMenuAsync, modifyMenuAsync, deleteMenuAsync }
export type LunchMenuAction = ActionType<typeof actions>;

export type LunchMenuState = {
    lunchMenuState: {
        loading: boolean;
        error: Error | null;
        data: TLunchMenu[];
    }
}