import { createAsyncAction } from "typesafe-actions";
import { TLunchMenu, TSubLunchMenu } from "../../models/LunchMenuDB";
import { TModifyMenuParams } from "./models";

// Actions
export const GET_ALL_MENUS = 'lunchMenu/GET_ALL_MENUS';
export const GET_ONE_MENU = 'lunchMenu/GET_ONE_MENU';
export const GET_MENUS = 'lunchMenu/GET_MENUS';
export const ADD_MENU = 'lunchMenu/ADD_MENU';
export const MODIFY_MENU = 'lunchMenu/MODIFY_MENU';
export const DELETE_MENU = 'lunchMenu/DELETE_MENU';
export const REQUEST_SUCCESS = 'lunchMenu/REQUEST_SUCCESS';
export const REQUEST_FAILURE = 'lunchMenu/REQUEST_FAILURE';

// Action Creators
export const getAllMenusAsync = createAsyncAction(
    GET_ALL_MENUS,
    REQUEST_SUCCESS,
    REQUEST_FAILURE
)<undefined, TLunchMenu[], Error>();

export const getOneMenuAsync = createAsyncAction(
    GET_ONE_MENU,
    REQUEST_SUCCESS,
    REQUEST_FAILURE
)<TSubLunchMenu, TLunchMenu[], Error>();

export const getMenusAsync = createAsyncAction(
    GET_MENUS,
    REQUEST_SUCCESS,
    REQUEST_FAILURE
)<TSubLunchMenu, TLunchMenu[], Error>();

export const addMenuAsync = createAsyncAction(
    ADD_MENU,
    REQUEST_SUCCESS,
    REQUEST_FAILURE
)<TLunchMenu, TLunchMenu[], Error>();

export const modifyMenuAsync = createAsyncAction(
    MODIFY_MENU,
    REQUEST_SUCCESS,
    REQUEST_FAILURE
)<TModifyMenuParams, TLunchMenu[], Error>();

export const deleteMenuAsync = createAsyncAction(
    DELETE_MENU,
    REQUEST_SUCCESS,
    REQUEST_FAILURE
)<TSubLunchMenu, TLunchMenu[], Error>();

