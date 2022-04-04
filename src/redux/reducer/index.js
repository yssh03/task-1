import { combineReducers } from "redux";
import { productReducer, handleCart, selectedProductReducer } from "./productReducer";

export const reducers = combineReducers({
    allProducts: productReducer,
    product: selectedProductReducer,
    handleCart
    // searchProduct : searchProductReducer
})