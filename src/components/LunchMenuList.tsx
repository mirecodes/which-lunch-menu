import React, { Fragment, useState } from 'react';
import { TLunchMenu, TSubLunchMenu } from '../models/LunchMenuDB';
type TOnFunctions = {
	onGetAllMenus: () => void;
	onGetOneMenu: (constraints: TSubLunchMenu) => void;
	onGetMenus: (constraints: TSubLunchMenu) => void;
	onAddMenu: (lunchMenu: TLunchMenu) => void;
	onModifyMenu: (constraints: TSubLunchMenu, lunchMenu: TLunchMenu) => void;
	onDeleteMenu: (constraints: TSubLunchMenu) => void;
};

type LunchMenuListProps = { lunchMenuList: TLunchMenu[]; onFunctions: TOnFunctions };

const LunchMenuList = ({ lunchMenuList, onFunctions }: LunchMenuListProps) => {
	const { onGetAllMenus, onGetOneMenu, onGetMenus, onAddMenu, onModifyMenu, onDeleteMenu } = onFunctions;

	const [inputState, setInput] = useState<TLunchMenu>({ idx: 3, name: '', category: '', store: '', price: 0 });

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const newInputState = {
			...inputState,
			[name]: value,
		};
		setInput(newInputState);
	};

	const getInputValues = () => {
		const inputValues: TSubLunchMenu = {};
		if (inputState.idx) {
			inputValues.idx = inputState.idx;
		}
		if (inputState.name) {
			inputValues.name = inputState.name;
		}
		if (inputState.category) {
			inputValues.category = inputState.category;
		}
		if (inputState.store) {
			inputValues.store = inputState.store;
		}
		if (inputState.price) {
			inputValues.price = inputState.price;
		}
		return inputValues;
	};

	const onSubmit = () => {
		const newInputState = {
			idx: parseInt(''),
			name: '',
			category: '',
			store: '',
			price: parseInt(''),
		};
		setInput(newInputState);
	};

	return (
		<Fragment>
			{lunchMenuList.map((lunchMenu) => (
				<div key={lunchMenu.idx + lunchMenu.name + lunchMenu.category + lunchMenu.store + lunchMenu.price}>
					{lunchMenu.idx}/{lunchMenu.name}/{lunchMenu.category}/{lunchMenu.store}/{lunchMenu.price}
				</div>
			))}
			<div>
				<input name='idx' type='number' placeholder='idx' value={inputState.idx} onChange={onChange}></input>
				<input name='name' type='string' placeholder='name' value={inputState.name} onChange={onChange}></input>
				<input name='category' type='string' placeholder='category' value={inputState.category} onChange={onChange}></input>
				<input name='store' type='string' placeholder='store' value={inputState.store} onChange={onChange}></input>
				<input name='price' type='number' placeholder='price' value={inputState.price} onChange={onChange}></input>
			</div>
			<div>
				<button
					onClick={() => {
						onGetAllMenus();
						onSubmit();
					}}>
					getAllMenus
				</button>
				<button
					onClick={() => {
						onGetOneMenu(getInputValues());
						onSubmit();
					}}>
					getOneMenu
				</button>
				<button
					onClick={() => {
						onGetMenus(getInputValues());
						onSubmit();
					}}>
					getMenus
				</button>
				<button
					onClick={() => {
						onAddMenu(inputState);
						onSubmit();
					}}>
					addMenu
				</button>
				<button
					onClick={() => {
						onDeleteMenu(getInputValues());
						onSubmit();
					}}>
					deleteMenu
				</button>
			</div>
		</Fragment>
	);
};

export default LunchMenuList;
