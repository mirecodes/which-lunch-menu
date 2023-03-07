import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import LunchMenuList from '../components/LunchMenuList';
import {
	getAllMenusThunk,
	getOneMenuByConstraintsThunk,
	addMenuThunk,
	getMenusByConstraintsThunk,
	modifyMenuThunk,
	deleteMenuThunk,
} from '../modules/controlMenus';
import TLunchMenu, { TSubLunchMenu } from '../models/TLunchMenu';

const LunchMenuContainer = () => {
	const { data, loading, error } = useSelector((state: RootState) => state.controlMenusReducer.lunchMenuState);

	const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

	const onGetAllMenus = () => {
		dispatch(getAllMenusThunk());
	};

	const onGetOneMenuByConstraints = (constraints: TSubLunchMenu) => {
		dispatch(getOneMenuByConstraintsThunk(constraints));
	};

	const onGetMenusByConstraints = (constraints: TSubLunchMenu) => {
		dispatch(getMenusByConstraintsThunk(constraints));
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

	const onFunctions = { onGetAllMenus, onGetOneMenuByConstraints, onGetMenusByConstraints, onAddMenu, onModifyMenu, onDeleteMenu };

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
