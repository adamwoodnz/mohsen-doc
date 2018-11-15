import * as types from "../../models/constants/actionTypes";
import { initialState } from "../initialState";
import { ReduxResponse } from "../../models/reduxModel";

export default function paymentReducer(state: any = initialState.paymentResponse, action: any): ReduxResponse {
    switch (action.type) {
        case types.POST_PAYMENT_ACTION:
            return { ...state, ...action.paymentResponse };
        case types.POST_PAYMENT_FAILED:
            return { ...state, ...action.paymentResponse.response };
        default:
            return { state };
    }
}
