import { ActionTypes } from "../constant/constants";

const initialState = {
  products: [],
  filteredProducts: [],
  searchList: [],
  searchValue: "",
  selectedCategory: [
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ],
};

const cart = [];

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
        searchDropdownList: action.payload,
      };

    case ActionTypes.UPDATE_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload,
      };

    case ActionTypes.SEARCH_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.payload.products,
        searchValue: action.payload.searchValue,
        selectedCategory: action.payload.selectedCategory,
      };

    case ActionTypes.SEARCH_LIST:
      return {
        ...state,
        searchList: action.payload.products,
      };

    default:
      return state;
  }
};

export const selectedProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, ...action.payload };

    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};

export const handleCart = (state = cart, action) => {
  const product = action.payload;
  switch (action.type) {
    case ActionTypes.ADD_CART:
      // return state;
      const exist = state.find((x) => x.id === product.id);
      if (exist) {
        return state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        const product = action.payload;

        return [...state, { ...product, qty: 1 }];
      }

    case ActionTypes.DELETE_CART:
      // return state;

      const exist1 = state.find((x) => x.id === product.id);
      if (exist1.qty === 1) {
        return state.filter((x) => x.id !== exist1.id);
      } else {
        return state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty - 1 } : x
        );
      }

    default:
      return state;
  }
};
