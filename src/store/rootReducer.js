import { combineReducers } from "redux";
import { btFormReducer } from "store";

export const rootReducer= combineReducers({
    btFormRedux: btFormReducer
});