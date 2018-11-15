import axios, { AxiosRequestConfig, AxiosPromise } from "axios";
import configs from "../../configs";

// This is a sampole of munaually implementing api calls via axios
// This APIs will be auto gen via Swagger Code Gen to sync Backend to Client, in case of implementing Swagger
export class PaymentApis {
    protected basePath = configs.baseURL;

    getCardBrand(digits): AxiosPromise {
        const localVarPath = this.basePath + "/cardbrand?firstFourDigits={digits}"
            .replace("{" + "digits" + "}", String(digits));
        const requestOptions: AxiosRequestConfig = {
            method: "get",
            url: localVarPath
        };
        return axios(requestOptions);
    }

    createPayment(amount): AxiosPromise {
        const localVarPath = this.basePath + "/create-payment?amount={amount}"
            .replace("{" + "amount" + "}", String(amount));
        const requestOptions: AxiosRequestConfig = {
            method: "post",
            url: localVarPath
        };
        return axios(requestOptions);
    }

    getPaymentStatus(id): AxiosPromise {
        const localVarPath = this.basePath + "/get-payment-status?id={id}"
            .replace("{" + "id" + "}", String(id));
        const requestOptions: AxiosRequestConfig = {
            method: "get",
            url: localVarPath
        };
        return axios(requestOptions);
    }
}
