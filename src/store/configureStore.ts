import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";

/**
 * Configures the Redux store
 * @param {any} initialState The initial state
 * @returns {any} The created Redux store
 */
function configureStore(initialState?: any): any {
    /** @important Be sure to ONLY add this middleware in development! */
    const middleware = process.env.NODE_ENV !== "production" ?
        [require("redux-immutable-state-invariant").default(), thunk] :
        [thunk];
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleware)
    );
}

export default configureStore;
