import { combineReducers } from 'redux';

import accountsReducer from "./accounts/reducer";
import operationsReducer from "./operations/reducer";

export default combineReducers({
    accounts: accountsReducer,
    operations: operationsReducer,
});
