import { ActionTypes } from "../constant/constants";

export const setProduct = (arr, products) => {
  const temp = [];
  if (arr.indexOf("men's clothing") !== -1) {
    const men = products.filter((x) => x.category === "men's clothing");
    temp.push(...men);
  }
  if (arr.indexOf("women's clothing") !== -1) {
    const women = products.filter((x) => x.category === "women's clothing");
    temp.push(...women);
  }
  if (arr.indexOf("jewelery") !== -1) {
    const jewelery = products.filter((x) => x.category === "jewelery");
    temp.push(...jewelery);
  }
  if (arr.indexOf("electronics") !== -1) {
    const electronic = products.filter((x) => x.category === "electronics");
    temp.push(...electronic);
  }

  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: temp,
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

export const searchProduct = (searchValue, filterData, data) => {
  let searchData = searchValue ?? "";

  const filteredData = data.filter((item) =>
    filterData.includes(item.category)
  );

  return {
    type: ActionTypes.SEARCH_PRODUCTS,
    payload: {
      products:
        searchData.length === 0
          ? filteredData.length > 0
            ? filteredData
            : []
          : filteredData.filter((item) => {
              return item?.title
                ?.toLowerCase()
                .includes(searchData.trimStart().toLowerCase());
            }),

      searchValue: searchData.trimStart().toLowerCase() || "",
      selectedCategory: filterData,
    },
  };
};

export const searchList = (searchValue, filterData, data) => {
  let searchData = searchValue ?? "";

  const filteredData = data.filter((item) =>
    filterData.includes(item.category)
  );

  return {
    type: ActionTypes.SEARCH_LIST,
    payload: {
      products:
        searchData.length === 0
          ? filteredData.length > 0
            ? filteredData
            : []
          : filteredData.filter((item) => {
              return item?.title
                ?.toLowerCase()
                .includes(searchData.trimStart().toLowerCase());
            }),

      searchValue: searchData.trimStart().toLowerCase() || "",
      selectedCategory: filterData,
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

export const updateSearchValue = (searchData) => {
  return {
    type: ActionTypes.UPDATE_SEARCH_VALUE,
    payload: searchData,
  };
};

export const addCart = (products) => {
  return {
    type: ActionTypes.ADD_CART,
    payload: products,
  };
};

export const deleteCart = (products) => {
  return {
    type: ActionTypes.DELETE_CART,
    payload: products,
  };
};
