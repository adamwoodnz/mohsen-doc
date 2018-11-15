import { combineReducers } from "redux";
// common
import ajaxCallsInProgress from "./shared/ajaxStatusReducer";

// payment
import brandResponse from "./payment/brandReducer";
import paymentResponse from "./payment/paymentReducer";
import statusResponse from "./payment/statusReducer";

// We combine all the reducters here. don"t forget all newely added reducers should be added here
const rootReducer = combineReducers({
    ajaxCallsInProgress,
    brandResponse,
    paymentResponse
});

export default rootReducer;
