import {
    LOAD_OPERATIONS, LOAD_OPERATIONS_FAILURE, LOAD_OPERATIONS_SUCCESS
} from "./types";

const operationsReducer = (state: any = [], action) => {
    switch (action.type) {
        case LOAD_OPERATIONS:
            return null;
        case LOAD_OPERATIONS_FAILURE:
            return null;
        case LOAD_OPERATIONS_SUCCESS:
            return [...action.payload];
        default:
            return state;
    }
};

export default operationsReducer;
