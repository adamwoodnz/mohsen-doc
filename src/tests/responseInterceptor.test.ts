import { responseInterceptor } from "../../src/utils/responseInterceptor";
const historyMock = require("../tests/__mocks__/historyMock");

describe("Util: responseInterceptor", () => {
    const success = jest.fn();
    const fail = jest.fn();
    const push = jest.fn();
    const replace = jest.fn();
    historyMock.push = push;
    historyMock.replace = replace;

    it("Should call the success callback if the status is positive and data is available", () => {
        responseInterceptor({ status: 200, data: "data" }, success, fail);
        expect(success).toBeCalledWith("data");
    });

    it("Should call the success callback and returns the status if the status is positive and data is not available", () => {
        responseInterceptor({ status: 200 }, success, fail);
        expect(success).toHaveBeenLastCalledWith({ status: 200 });
    });

    it("Should call the fail callback if the status is negative or unknown", () => {
        responseInterceptor({ status: 401 }, success, fail);
        expect(fail).toHaveBeenLastCalledWith({ status: 401 });
        responseInterceptor({ status: 700 }, success, fail);
        expect(fail).toHaveBeenLastCalledWith({ status: 700 });
    });

    it("Should navigate to `/login` fi the status is negative and history object is available", () => {
        responseInterceptor({ status: 401 }, success, fail, historyMock);
        expect(replace).toHaveBeenLastCalledWith("/login");
    });

});
