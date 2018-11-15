import * as types from "../models/constants/actionTypes";

export function beginAjaxCall(): any {
    return { type: types.BEGIN_AJAX_CALL };
}

export function ajaxCallEnded(): any {
    return { type: types.END_AJAX_CALL };
}

export function ajaxCallError(): any {
    return { type: types.AJAX_CALL_ERROR };
}
