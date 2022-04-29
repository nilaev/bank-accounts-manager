import {applyMiddleware, createStore} from "@reduxjs/toolkit";
import rootReducer from "../rootReducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const initialState = {
    accounts: [],
    operations: [],
};

export default createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
