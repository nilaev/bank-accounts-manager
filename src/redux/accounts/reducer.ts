import {
    ADD_ACCOUNT,
    CHANGE_ACCOUNT_TITLE,
    LOAD_ACCOUNTS,
    LOAD_ACCOUNTS_FAILURE,
    LOAD_ACCOUNTS_SUCCESS,
    REMOVE_EXTERNAL_ACCOUNT
} from "./types";

const reducer = (state: any = [], action) => {
    switch (action.type) {
        case LOAD_ACCOUNTS:
            return null;
        case LOAD_ACCOUNTS_FAILURE:
            return null;
        case LOAD_ACCOUNTS_SUCCESS:
            return action.payload;
        case CHANGE_ACCOUNT_TITLE:
            return state.map(account => account.id === action.payload.id ?
                {...account, customTitle: action.payload.customTitle} : account);
        case ADD_ACCOUNT:
            return [...state, action.payload];
        case REMOVE_EXTERNAL_ACCOUNT:
            return state.filter(account => account.type !== 'external' || account.id !== action.payload.id);
        default:
            return state;
    }
};

export default reducer;
