import {
    ADD_ACCOUNT,
    CHANGE_ACCOUNT_TITLE,
    LOAD_ACCOUNTS,
    LOAD_ACCOUNTS_FAILURE,
    LOAD_ACCOUNTS_SUCCESS,
    REMOVE_EXTERNAL_ACCOUNT
} from "./types";
import {getAccounts} from "../../services/requestMock";

export const loadAccountsAction = () => ({type: LOAD_ACCOUNTS});
export const loadAccountsFailureAction = () => ({type: LOAD_ACCOUNTS_FAILURE});
export const loadAccountsSuccess = (payload) => ({type: LOAD_ACCOUNTS_SUCCESS, payload});
export const changeAccountTitle = (payload) => ({type: CHANGE_ACCOUNT_TITLE, payload});
export const addAccount = (payload) => ({type: ADD_ACCOUNT, payload});
export const removeExternalAccount = (payload) => ({type: REMOVE_EXTERNAL_ACCOUNT, payload});

export const loadAccounts = () => dispatch => {
    return getAccounts()
        .then(data => dispatch(loadAccountsSuccess(data)))
        .catch(() => dispatch(loadAccountsFailureAction));
};
