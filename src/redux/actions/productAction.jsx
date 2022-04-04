import { ActionTypes } from "../constant/constants";

export const setProduct = (arr, products) => {
  const filteredData = products.filter((x) => x.category === arr)
  console.log(filteredData);
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const selectedProduct = (products) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: products,
  };
};

export const removeSelectedProduct = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCT,
  };
};

export const searchProduct = (searchData, filterData, data) => {
  console.log("data ",filterData);
  console.log("data from header",data);

 const filteredData =  data.filter((item) => filterData.includes(item.category))
 console.log("filtered Data ",filteredData );
  return {
    type: ActionTypes.SEARCH_PRODUCTS,
    payload: {
      products:
        searchData === ""
          ? filteredData
          : filteredData.filter((item) =>
              item?.title
                ?.toLowerCase()
                .includes(searchData.trimStart().toLowerCase())
            ),
    },
  };
};

export const filterByCategory = (filterData, data) => {
  return {
    type: ActionTypes.FILTER_BY_CATEGORY,
    payload: {
      products: data.filter((item) => filterData.includes(item.category)),
    },
  };
};

export const addCart = (products) =>{
    return {
        type : ActionTypes.ADD_CART,
        payload : products
    }
}

export const deleteCart = (products) =>{
    return {
        type : ActionTypes.DELETE_CART,
        payload : products
    }
}
