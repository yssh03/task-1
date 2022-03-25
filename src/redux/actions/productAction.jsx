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


export const searchProduct = (searchData,data)=>{
    // const filteredSearch =
    //     data.filter((item) => item.category === searchData);

    //    console.log("in action ",searchData); 
    //    console.log("in action ",filteredSearch); 

    return {
        type: ActionTypes.SEARCH_PRODUCTS,
        payload: {
            products : searchData === "" ? data : data.filter((item) => item?.category?.toLowerCase().includes(searchData.toLowerCase()))
        }
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
