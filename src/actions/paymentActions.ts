import PaymentService from "../apis/PaymentService";
import * as types from "../models/constants/actionTypes";
import { beginAjaxCall, ajaxCallError } from "./ajaxStatusActions";

export function getCardBrandAction(digits: number) {
    return (dispatch) => {
        // dispatch(beginAjaxCall());
        return PaymentService.getCardBrand(digits)
            .then((brandResponse) => {
                dispatch({ type: types.GET_CARD_BRAND_ACTION, brandResponse });
            })
            .catch((brandResponse) => {
                // dispatch(ajaxCallError());
                dispatch({ type: types.GET_CARD_BRAND_FAILED, brandResponse });
                console.log("ERROR within Action: ", brandResponse);
            });
    };
}

export function createPaymentAction(amount: string) {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return PaymentService.createPayment(amount)
            .then((paymentResponse) => {
                dispatch({ type: types.POST_PAYMENT_ACTION, paymentResponse });
            })
            .catch((paymentResponse) => {
                dispatch(ajaxCallError());
                dispatch({ type: types.POST_PAYMENT_FAILED, paymentResponse });
                console.log("ERROR within Action: ", paymentResponse);
            });
    };
}

export function paymentStatusAction(id: string) {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return PaymentService.paymentStatus(id)
            .then((statusResponse) => {
                dispatch({ type: types.GET_STATUS_ACTION, statusResponse });
            })
            .catch((statusResponse) => {
                dispatch(ajaxCallError());
                dispatch({ type: types.GET_STATUS_FAILED, statusResponse });
                console.log("ERROR within Action: ", statusResponse);
            });
    };
}
