import * as types from "../../models/constants/actionTypes";
import { initialState } from "../initialState";
/**
 * Checks if the action succeeds
 * @param type The type of the Redux action
 */
function actionTypeEndsInSuccess(type: string): boolean {
    return type.substring(type.length - 7) === "_ACTION";
}

export default function ajaxStatusReducer(state: number = initialState.ajaxCallsInProgress, action: any): number {
    if (action.type === types.BEGIN_AJAX_CALL) {
        return ++state;
    } else if (action.type === types.AJAX_CALL_ERROR || action.type === types.END_AJAX_CALL ||
        actionTypeEndsInSuccess(action.type)) {
        return --state;
    } else { return state; }
}
