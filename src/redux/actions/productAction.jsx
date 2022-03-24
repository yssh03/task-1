import { ActionTypes } from "../constant/constants"


export const setProduct = (products) =>{
    return {
        type : ActionTypes.SET_PRODUCTS,
        payload : products
    }
}

export const selectedProduct = (products) =>{
    return {
        type : ActionTypes.SELECTED_PRODUCT,
        payload : products
    }
}


export const removeSelectedProduct = () =>{
    return {
        type : ActionTypes.REMOVE_SELECTED_PRODUCT,
    }
}


export const filteredProduct = (products)=>{
    return {
        type: ActionTypes.FILTERED_PRODUCTS,
        payload: products
    }
}
// export const addCart = (products) =>{
//     return {
//         type : ActionTypes.ADD_CART,
//         payload : products
//     }
// }

// export const deleteCart = (products) =>{
//     return {
//         type : ActionTypes.DELETE_CART,
//         payload : products
//     }
// }
