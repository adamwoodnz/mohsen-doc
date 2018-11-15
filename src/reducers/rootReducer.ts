import { combineReducers } from "redux";
// common
import ajaxCallsInProgress from "./shared/ajaxStatusReducer";

// We combine all the reducters here. don"t forget all newely added reducers should be added here
const rootReducer = combineReducers({
    ajaxCallsInProgress
});

export default rootReducer;
