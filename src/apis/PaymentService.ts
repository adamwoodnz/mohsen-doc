import configs from "../configs";
import { getJson, jsonTypes } from "./offline/mockSimulator";
import { PaymentApis } from "./online/apis";

const getCardBrandCall = (digits: number) => {
    console.log("getCardBrand with 4 digits: ", digits);
    if (configs.type === "LOCAL") {
        return getJson(jsonTypes.GET_CARD_BRAND);
    } else {
        const paymentApis = new PaymentApis();
        return paymentApis.getCardBrand(digits);
    }
};

const createPaymentCall = (amount: string) => {
    console.log("createPayment with amount: ", amount);
    if (configs.type === "LOCAL") {
        return getJson(jsonTypes.POST_AMOUNT);
    } else {
        const paymentApis = new PaymentApis();
        return paymentApis.createPayment(amount);
    }
};

const paymentStatusCall = (id: string) => {
    console.log("paymentStatus with id: ", id);
    if (configs.type === "LOCAL") {
        return getJson(jsonTypes.GET_PAYMENT_STATUS);
    } else {
        const paymentApis = new PaymentApis();
        return paymentApis.getPaymentStatus(id);
    }
};

class PaymentService {
    static getCardBrand(digits: number): Promise<any> {
        return getCardBrandCall(digits);
    }

    static createPayment(amount: string): Promise<any> {
        return createPaymentCall(amount);
    }

    static paymentStatus(id: string): Promise<any> {
        return paymentStatusCall(id);
    }
}

export default PaymentService;
