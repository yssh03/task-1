import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  removeSelectedProduct,
  selectedProduct,
} from "../../../redux/actions/productAction";
import axiosInstance from "../../AxiosUtils";
import Breadcrumb from "../../header/Breadcrumb";
import Headers from "../../header/Header";

function ProductDetails() {
  const { productID } = useParams();
  const product = useSelector((state) => state.product);
  const { title, description, price, category, image, rating } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [navigate, token]);
  useEffect(() => {
    productID && productID !== "" && fetchProduct();
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productID]);

  const fetchProduct = async () => {
    const response = await axiosInstance
      .get(`http://localhost:3001/products/${productID}`)
      .catch((error) => console.log("Error : ", error));

    dispatch(selectedProduct(response.data));
  };
  return (
    <>
      <Headers />
      <Breadcrumb />
      {Object.keys(product).length === 0 ? (
        <div>
          {" "}
          <div className="flex justify-center text-xl font-bold mx-10 my-10">
            No Data Found!!!
          </div>
          <div
            className="ui secondary button"
            onClick={() => navigate("/product")}
          >
            Go to Products
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-2  sm:grid-cols-2 xs:grid-cols-2 gap-6 my-5 content-center">
          <div className="flex justify-end">
            <img src={image} alt={title} className="h-52" />
          </div>
          <div>
            <p className="  text-justify font-extrabold text-2xl pt-2 pb-2 ">
              {product.title}
            </p>
            <p className="font-semibold my-2">
              <i
                className="dollar sign icon"
                style={{ fontWeight: "bold" }}
              ></i>
              {product.price}
            </p>
            <p className=" text-center font-semibold text-lg pt-1 pb-2">
              {category}
            </p>
            <p className="font-bold">
              <i className="star icon"></i>
              {rating.rate}
            </p>
            <div className="mt-5">
              {" "}
              <button
                className="ui secondary basic button"
                style={{ marginBottom: "2px" }}
                onClick={() => navigate("/product")}
              >
                Back
              </button>
              <button className="ui secondary button">Add to Cart</button>
            </div>
          </div>
          <div className="col-span-2 my-2 text-justify text-xl font-semibold   lg:pr-20 xs:pr-20 md:px-10 sm:px-10 xs:px-10 ">
            <p>{description}</p>
          </div>
          {/* <div>04</div> */}

          {/* <!-- ... --> */}
        </div>
      )}
    </>
  );
}

export default ProductDetails;
