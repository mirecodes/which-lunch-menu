import { combineReducers } from 'redux';
import controlMenusReducer from './controlMenus';


// Root Reducer
const rootReducer = combineReducers({
    controlMenusReducer
});

// Export Default Root Reducer
export default rootReducer;

// Type of Root Reducer
export type RootState = ReturnType<typeof rootReducer>;