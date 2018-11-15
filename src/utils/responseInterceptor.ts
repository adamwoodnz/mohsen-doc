import { navigate } from "./navigateUtil";

/* This interceptor listens to status types and take actions based on them
 * @param {any} response Response data
 * @param {function} success Success handler method
 * @param {function} failed Fail handler method
 * @param {any} history Redux History Object to be used to navigate to login page
*/
export function responseInterceptor(
    response: any,
    success: (data: any) => void,
    failed: (response: any) => void,
    history?: any
): void {
    // We succeed
    if (response && response.status && ([200, 201, 204].indexOf(response.status) !== -1)) {
        // We return success if we found data obj from axios response
        if (response.data) {
            success(response.data);
        } else {
            success(response);
        }
    } else if (response && response.status && (response.status === 401)) {
        // Unauthorized access, redirecting to login page
        if (history) {
            navigate(history, "/login", true);
        } else {
            failed(response);
        }
    } else {
        // We have generic fail with the call
        failed(response);
    }
}
