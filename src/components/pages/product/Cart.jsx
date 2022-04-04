import React from "react";
import Breadcrumb from "../../header/Breadcrumb";
import Header from "../../header/Header";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addCart, deleteCart } from "../../../redux/actions/productAction";
import { useNavigate } from "react-router-dom";

function Cart() {
  const product = useSelector((state) => state.handleCart);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(product);

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const deleteProduct = (product) => {
    dispatch(deleteCart(product));
  };

  const handleAddButton = (products) => {
    addProduct(products);
  };

  const handleDeleteButton = (products) => {
    deleteProduct(products);
  };
  return (
    <>
      <Header />
      <Breadcrumb />
      {Object.keys(product).length === 0 ? (
        <div>
          {" "}
          <div className="flex justify-center text-xl font-bold mx-10 my-10 tracking-widest">
            Nothing Left :({" "}
          </div>
          <div
            className="ui secondary button"
            onClick={() => navigate("/product")}
          >
            Go to Products
          </div>
        </div>
      ) : (
        <div className="flex justify-center mx-5">
          <div className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2  sm:grid-cols-2 xs:grid-cols-2 gap-6 my-5 content-center">
            {product &&
              product.length &&
              product.map((item) => (
                <div className="justify-center bg-gray-200 xs:px-2 lg:mx-0 items-center border-2 border-gray-400 rounded-xl">
                  <div className="flex justify-center py-5">
                    <img src={item.image} alt={item.title} className="h-52" />
                  </div>
                  <div>
                    <p className="  text-justify font-extrabold text-2xl pt-2 pb-2 px-2 ">
                      {item.title}
                    </p>
                    <p className="font-semibold my-2">
                      <i
                        className="dollar sign icon"
                        style={{ fontWeight: "bold" }}
                      ></i>
                      {item.price * item.qty}
                    </p>
                    <p className="font-semibold flex justify-center text-xl pt-2 pb-2 px-2 ">
                      {item.qty}
                    </p>
                    <div className="flex justify-center">
                      <button
                        class="ui secondary button "
                        style={{ paddingLeft: "25px" }}
                        onClick={() => handleAddButton(item)}
                      >
                        <i class="plus icon"></i>
                      </button>
                      <button
                        class="ui secondary basic button"
                        style={{ paddingLeft: "25px" }}
                        onClick={() => handleDeleteButton(item)}
                      >
                        <i class="minus icon"></i>
                      </button>
                    </div>
                    <div className="my-5">
                      {" "}
                      <button
                        className="ui secondary basic button"
                        style={{ marginBottom: "2px" }}
                        onClick={() => navigate("/product")}
                      >
                        Back
                      </button>
                      <button
                        className="ui secondary button"
                        onClick={() => alert("Product Dispatched!!")}
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
