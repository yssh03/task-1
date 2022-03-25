import { combineReducers } from "redux";
import { productReducer, searchProductReducer, selectedProductReducer } from "./productReducer";

export const reducers = combineReducers({
    allProducts: productReducer,
    product: selectedProductReducer,
    // searchProduct : searchProductReducer
})