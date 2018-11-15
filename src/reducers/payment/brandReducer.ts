import * as types from "../../models/constants/actionTypes";
import { initialState } from "../initialState";
import { ReduxResponse } from "../../models/reduxModel";

export default function brandReducer(state: any = initialState.brandResponse, action: any): ReduxResponse {
    switch (action.type) {
        case types.GET_CARD_BRAND_ACTION:
            return { ...state, ...action.brandResponse };
        case types.GET_CARD_BRAND_FAILED:
            return { ...state, ...action.brandResponse.response };
        default:
            return { state };
    }
}
