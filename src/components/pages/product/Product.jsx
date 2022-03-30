import React from "react";
import Headers from "../../header/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosUtils";
import { useDispatch } from "react-redux";
import { setProduct } from "../../../redux/actions/productAction";
import Breadcrumb from "../../header/Breadcrumb";

function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.allProducts.filteredProducts);

  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    setData(products);
  }, [products]);

  const fetchProduct = async () => {
    const response = await axiosInstance
      .get("http://localhost:3001/products")
      .catch((error) => console.log("Error: ", error));

    await dispatch(setProduct(response.data));
    await setData(response.data);
    await setFlag(!flag);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

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
    dispatch(setProduct(sortedData));
    setData(sortedData);
    setFlag(!flag);
  };

  return (
    <>
      <Headers />
      <Breadcrumb />
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
            hidden={data.length === 0 ? true : false}
            onClick={() => handleSort(data, "dsc")}
          >
            Z-A
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <label class="inline-flex items-center m-3 ">
          <input name="productCheckbox" type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" checked />
          <span class="ml-2 text-gray-700 font-semibold ">All</span>
        </label>
        <label class="inline-flex items-center m-3">
          <input name="productCheckbox" type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" />
          <span class="ml-2 text-gray-700 font-semibold">Men's</span>
        </label>
        <label class="inline-flex items-center m-3">
          <input name="productCheckbox" type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" />
          <span class="ml-2 text-gray-700 font-semibold">Women's</span>
        </label>
        <label class="inline-flex items-center m-3">
          <input name="productCheckbox" type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" />
          <span class="ml-2 text-gray-700 font-semibold">Jewelry</span>
        </label>
        <label class="inline-flex items-center m-3">
          <input name="productCheckbox" type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" />
          <span class="ml-2 text-gray-700 font-semibold">Electronics</span>
        </label>
      </div>

      {
        <div className="m-5">
          <div className="container mx-auto ">
            {" "}
            <div className="grid  xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-6 ">
              {data && data.length ? (
                data.map((product) => (
                  <div className="justify-center bg-gray-300 xs:px-2 lg:mx-0 items-center border-2 border-gray-400 rounded-xl p-6 bg-black-100">
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
      {/* )} */}
      {/* {noDataFlag && (
         <div className="flex justify-center text-xl font-bold mx-auto my-10">
           No Data Found!!!
         </div>
       )} */}
    </>
  );
}

export default Product;
