import axios from 'axios';
import configs from "../../configs";

export class PaymentApi {
    basePath = configs.baseURL;

    getCardBrand(digits) {
        const localVarPath = this.basePath + '/cardbrand?firstFourDigits={digits}'
            .replace('{' + 'digits' + '}', String(digits));
        let requestOptions = {
            method: 'get',
            url: localVarPath
        };
        return axios(requestOptions);
    }

    createPayment(amount) {
        const localVarPath = this.basePath + '/create-payment?amount={amount}'
            .replace('{' + 'amount' + '}', String(amount));
        let requestOptions = {
            method: 'post',
            url: localVarPath
        };
        return axios(requestOptions);
    }

    getPaymentStatus(id) {
        const localVarPath = this.basePath + '/get-payment-status?id={id}'
            .replace('{' + 'id' + '}', String(id));
        let requestOptions = {
            method: 'get',
            url: localVarPath
        };
        return axios(requestOptions);
    }
}