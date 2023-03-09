import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import LunchMenuList from '../components/LunchMenuList';
import { getAllMenusThunk, getOneMenuThunk, addMenuThunk, getMenusThunk, modifyMenuThunk, deleteMenuThunk } from '../modules/controlMenus';
import { TLunchMenu, TSubLunchMenu } from '../models/LunchMenuDB';

const LunchMenuContainer = () => {
	const { data, loading, error } = useSelector((state: RootState) => state.controlMenusReducer.lunchMenuState);

	const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

	const onGetAllMenus = () => {
		dispatch(getAllMenusThunk());
	};

	const onGetOneMenu = (constraints: TSubLunchMenu) => {
		dispatch(getOneMenuThunk(constraints));
	};

	const onGetMenus = (constraints: TSubLunchMenu) => {
		dispatch(getMenusThunk(constraints));
	};

	const onAddMenu = (lunchMenu: TLunchMenu) => {
		dispatch(addMenuThunk(lunchMenu));
	};

	const onModifyMenu = (constraints: TSubLunchMenu, lunchMenu: TLunchMenu) => {
		dispatch(modifyMenuThunk(constraints, lunchMenu));
	};

	const onDeleteMenu = (constraints: TSubLunchMenu) => {
		dispatch(deleteMenuThunk(constraints));
	};

	const onFunctions = { onGetAllMenus, onGetOneMenu, onGetMenus, onAddMenu, onModifyMenu, onDeleteMenu };

	return (
		<Fragment>
			{loading && <div>Loading</div>}
			{error && <div>Error</div>}
			{data && (
				<div>
					<LunchMenuList onFunctions={onFunctions} lunchMenuList={data} />
				</div>
			)}
		</Fragment>
	);
};

export default LunchMenuContainer;
