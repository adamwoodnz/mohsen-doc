import * as types from "../../models/constants/actionTypes";
import { initialState } from "../initialState";
import { ReduxResponse } from "../../models/reduxModel";

export default function statusReducer(state: any = initialState.statusResponse, action: any): ReduxResponse {
    switch (action.type) {
        case types.GET_STATUS_ACTION:
            return { ...state, ...action.statusResponse };
        case types.GET_STATUS_FAILED:
            return { ...state, ...action.statusResponse.response };
        default:
            return { state };
    }
}
