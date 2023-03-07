import React, { Fragment, useState } from 'react';
import TLunchMenu, { TSubLunchMenu } from '../models/TLunchMenu';
type TOnFunctions = {
	onGetAllMenus: () => void;
	onGetOneMenuByConstraints: (constraints: TSubLunchMenu) => void;
	onGetMenusByConstraints: (constraints: TSubLunchMenu) => void;
	onAddMenu: (lunchMenu: TLunchMenu) => void;
	onModifyMenu: (constraints: TSubLunchMenu, lunchMenu: TLunchMenu) => void;
	onDeleteMenu: (constraints: TSubLunchMenu) => void;
};

type LunchMenuListProps = { lunchMenuList: TLunchMenu[]; onFunctions: TOnFunctions };

const LunchMenuList = ({ lunchMenuList, onFunctions }: LunchMenuListProps) => {
	const { onGetAllMenus, onGetOneMenuByConstraints, onGetMenusByConstraints, onAddMenu, onModifyMenu, onDeleteMenu } = onFunctions;

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
			idx: inputState.idx + 1,
			name: '',
			category: '',
			store: '',
			price: 0,
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
				<input name='idx' type='number' value={inputState.idx} onChange={onChange}></input>
				<input name='name' type='string' value={inputState.name} onChange={onChange}></input>
				<input name='category' type='string' value={inputState.category} onChange={onChange}></input>
				<input name='store' type='string' value={inputState.store} onChange={onChange}></input>
				<input name='price' type='number' value={inputState.price} onChange={onChange}></input>
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
						onGetOneMenuByConstraints(getInputValues());
						onSubmit();
					}}>
					getOneMenu
				</button>
				<button
					onClick={() => {
						onGetMenusByConstraints(getInputValues());
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
