import React from 'react';
import { getAllMenus } from './apis/lunchMenuAPIs';
import LunchMenuContainer from './containers/LunchMenuContainer';

const App = () => {
	return (
		<div>
			<LunchMenuContainer />
		</div>
	);
};

export default App;
