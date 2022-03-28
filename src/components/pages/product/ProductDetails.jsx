import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, Grid, Image, Icon, Loader } from "semantic-ui-react";
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
  const { state } = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [navigate, token]);
  useEffect(() => {
    state && fetchProduct();
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productID]);

  const fetchProduct = async () => {
    const response = await axiosInstance
      .get(`http://localhost:3001/products/${state}`)
      .catch((error) => console.log("Error : ", error));

    dispatch(selectedProduct(response.data));
  };
  return (
    <>
      <Headers />
      <Breadcrumb />
      {Object.keys(product).length === 0 ? (
        <Loader active inline="centered" />
      ) : (
        //  ( <div style={{ paddingLeft: "10  px", margin: "20px" }}>
        //     <div className="ui grid">
        //       <div className="three wide column">
        //         {/* // <Image src={image} /> */}
        //         <img src={image} className="ui image"/>
        //       </div>
        //       <Grid.Column width={3}>
        //         <Card>
        //           <Card.Content header={title} />
        //           <Card.Content description={category} />
        //           <Card.Content extra>
        //             <Icon name="dollar sign" />
        //             {price}
        //           </Card.Content>
        //           <div>
        //             <button
        //               className="ui secondary basic button"
        //               style={{ marginBottom: "2px" }}
        //               onClick={() => navigate("/product")}
        //             >
        //               Back
        //             </button>
        //             <button className="ui secondary button">Add to Cart</button>
        //           </div>
        //         </Card>
        //       </Grid.Column>
        //       <Grid.Column width={8}>
        //         <Card>
        //           <Card.Content description={description} />
        //         </Card>
        //       </Grid.Column>
        //     </div>
        //   </div>
        // )
        <div className="grid lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-2  sm:grid-cols-2 xs:grid-cols-2 gap-6 my-5 content-center">
          <div className="flex justify-end">
            <img src={image} alt={title} className="h-52" />
          </div>
          <div>
            <p className="  text-justify font-extrabold text-2xl pt-2 pb-2 ">
              {product.title}
            </p>
            <p className="font-semibold my-2">
              <i className="dollar sign icon" style={{ fontWeight: "bold" }}></i>
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
