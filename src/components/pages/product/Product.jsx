import React from "react";
import Headers from "../../header/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosUtils";
import { useDispatch } from "react-redux";
import {
  searchList,
  searchProduct,
  setProduct,
  updateSearchValue,
} from "../../../redux/actions/productAction";
import Breadcrumb from "../../header/Breadcrumb";

function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchProducts = useSelector((state) => state.allProducts.searchList);

  const allProducts = useSelector((state) => state.allProducts);
  const selectedCategory = useSelector(
    (state) => state.allProducts.selectedCategory
  );

  console.log("searchProducts ", searchProducts);

  const [tempArr, setTempArr] = useState([
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ]);

  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  const [state, setState] = useState([
    {
      id: 1,
      name: "Men's",
      value: "men's clothing",
      checked: false,
    },
    {
      id: 2,
      name: "Women's",
      value: "women's clothing",
      checked: false,
    },
    {
      id: 3,
      name: "Jewelery",
      checked: false,
      value: "jewelery",
    },
    {
      id: 4,
      name: "Electronics",
      checked: false,
      value: "electronics",
    },
    {
      id: 5,
      name: "All",
      value: "ALL",
      checked: true,
    },
  ]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    setData(allProducts.filteredProducts);
  }, [allProducts.filteredProducts]);

  useEffect(() => {
    setTempArr(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    dispatch(
      searchProduct(allProducts.searchValue, tempArr, allProducts.products)
    );
  }, []);

  const fetchProduct = async () => {
    await axiosInstance
      .get("http://localhost:3001/products")
      .then((response) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);

        dispatch(setProduct(tempArr, response.data));
        setData(response.data);
        setFlag(!flag);
      })
      .catch((error) => console.log("Error: ", error));
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    allProducts.searchValue === "" ? setIsHidden(false) : setIsHidden(true);
  }, [allProducts.searchValue]);

  const onFilterChange2 = (e, id) => {
    let tempArr = [...state];
    tempArr[id].checked = !tempArr[id].checked;
    setState(tempArr);

    if (tempArr[id].name === "All" && tempArr[id].checked === true) {
      const newArr = state.map((item) => item.value);

      let newArr2 = tempArr.map((item) => {
        if (item.name !== "All")
          return {
            ...item,
            checked: false,
          };

        return item;
      });

      setState(newArr2);
      dispatch(
        searchProduct(allProducts.searchValue, newArr, allProducts.products)
      );
    } else {
      const newArr = state
        .filter((item) => item.checked === true)
        .map((item) => item.value);

      let newArr2 = tempArr.map((item) => {
        if (item.name === "All")
          return {
            ...item,
            checked: false,
          };

        return item;
      });

      setState(newArr2);
      dispatch(
        searchProduct(allProducts.searchValue, newArr, allProducts.products)
      );
    }
  };

  const handleSort = (param, order) => {
    const sortedData = param.sort((a, b) => {
      var titleA = a.title.toUpperCase();
      var titleB = b.title.toUpperCase();

      if (order === "dsc") {
        if (titleA > titleB) {
          return -1;
        }
        if (titleA < titleB) {
          return 1;
        }
      } else {
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
      }

      return 0;
    });
    dispatch(setProduct(tempArr, sortedData));
    setData(sortedData);
    setFlag(!flag);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.value;
    dispatch(searchList(e.target.value, tempArr, allProducts.products));
    value === "" &&
      dispatch(
        searchProduct(allProducts.searchValue, tempArr, allProducts.products)
      );
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(
      searchProduct(allProducts.searchValue, tempArr, allProducts.products)
    );
  };

  console.log("searchValue ", allProducts.searchValue);

  return (
    <>
      <Headers />
      <Breadcrumb />

      <div className="navbar-rightside">
        <form>
          <input
            type="text"
            list="data"
            placeholder="Search..."
            value={allProducts.searchValue}
            onChange={(e) => {
              handleSearch(e);
              dispatch(updateSearchValue(e.target.value));
            }}
          />
          <button type="submit" onClick={handleClick}>
            <i aria-hidden="true" class="search icon"></i>
          </button>
        </form>
        {isHidden && (
          <div className="">
            <datalist id="data" className="inline-block justify-start text-left w-1/4 h-5 border-solid mt-2 ">
              {searchProducts && searchProducts.length > 0 && 
                searchProducts.map((x) => (
                  <option
                  value={x.title}
                    // className="cursor-pointer z-auto border-solid p-2  border-r border-t font-bold border-l border-b  border-zinc-900"
                    onClick={() => dispatch(updateSearchValue(x.title))}
                  >
                    {/* {x.title} */}
                  </option>
                )
              // ) : (
              //   <option className="cursor-pointer flex justify-center border-solid p-2  border-2 font-bold text-lg border-zinc-900">
              //     Product not found :(
              //   </option>
              )}
            </datalist>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center text-xl font-bold my-10 tracking-widest">
          Loading...
        </div>
      ) : (
        <div>
          {" "}
          <div className="flex justify-end mr-5">
            <div
              style={{
                marginTop: "20px",
                marginBottom: "10px",
                letterSpacing: "2px",
              }}
            >
              <button
                className="ui secondary button"
                disabled={data.length === 0 ? true : false}
                onClick={() => handleSort(data, "asc")}
              >
                A-Z
              </button>
            </div>
            <div
              style={{
                marginTop: "20px",
                marginBottom: "10px",
                // marginRight: "10px",
                letterSpacing: "2px",
              }}
            >
              <button
                className="ui secondary button"
                disabled={data.length === 0 ? true : false}
                onClick={() => handleSort(data, "dsc")}
              >
                Z-A
              </button>
            </div>
          </div>
          <div className="flex justify-center ">
            <div className="grid  xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-3 ">
              {state.map((item, index) => (
                <label class="inline-flex items-center m-3 cursor-pointer ">
                  <input
                    id={item.id}
                    name={item.name}
                    value={item.value}
                    type="checkbox"
                    class="form-checkbox h-5 w-5 text-gray-600 cursor-pointer"
                    onChange={(e) => onFilterChange2(e, index)}
                    checked={item.checked}
                  />
                  <span class="ml-2 text-gray-700 font-semibold ">
                    {item.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
          {
            <div className="m-5">
              <div className="container mx-auto ">
                {" "}
                <div className="grid  xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-6 ">
                  {data && data.length ? (
                    data.map((product) => (
                      <div className="justify-center bg-gray-200 xs:px-2 lg:mx-0 items-center border-2 border-gray-400 rounded-xl p-6">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-52 mb-2"
                        />
                        <div>
                          {" "}
                          <p className="  text-justify font-bold text-2xl pt-2 pb-2 ">
                            {product.title}
                          </p>
                          <p className="font-semibold my-2">
                            <i
                              className="dollar sign icon"
                              style={{ fontWeight: "bold" }}
                            ></i>
                            {product.price}
                          </p>
                          <div>
                            <button
                              className="ui secondary button"
                              style={{
                                marginTop: "10px",
                                letterSpacing: "2px",
                              }}
                              onClick={() => navigate(`/product/${product.id}`)}
                            >
                              Buy
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex col-span-5 justify-center text-xl font-bold mx-auto my-10">
                      No Data Found!!!
                    </div>
                  )}
                </div>
              </div>{" "}
            </div>
          }
        </div>
      )}
    </>
  );
}

export default Product;
