import configs from "../../configs";

// Here are enums of availble jsons
export const enum jsonTypes {
    GET_CARD_BRAND = "GET_CARD_BRAND",
    POST_AMOUNT = "POST_AMOUNT",
    GET_PAYMENT_STATUS = "GET_PAYMENT_STATUS"
}

/**
 * This method will return the json data based on their types above
 * @param {jsonTypes} type The type of the JSON file to retrieve
 * @returns {Promise<any>} Promise
 */
export function getJson(type: jsonTypes): Promise<any> {
    let data: any;
    switch (type) {
        case jsonTypes.GET_CARD_BRAND:
            if (process.env.NODE_ENV !== "production") { data = require("./jsons/sample.json"); }
            return new Promise((resolve, reject) => { simulateData(resolve, data, 200, configs.delay); });
        case jsonTypes.POST_AMOUNT:
            if (process.env.NODE_ENV !== "production") { data = require("./jsons/sample.json"); }
            return new Promise((resolve, reject) => { simulateData(resolve, data, 200, configs.delay); });
        case jsonTypes.GET_PAYMENT_STATUS:
            if (process.env.NODE_ENV !== "production") { data = require("./jsons/sample.json"); }
            return new Promise((resolve, reject) => { simulateData(resolve, data, 200, configs.delay); });
        default: return new Promise((resolve, reject) => reject("JSON data should not be retireved in production mode"));
    }
}

function simulateData(resolve: any, data: any, status: number, timeout: number): any {
    return setTimeout(() => { resolve({ status: status, data: data }); }, timeout);
}
