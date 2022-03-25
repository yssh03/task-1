import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Grid,
  Image,
  Icon,
  Dimmer,
  Loader,
  Segment,
} from "semantic-ui-react";
import {
  removeSelectedProduct,
  selectedProduct,
} from "../../redux/actions/productAction";
import axiosInstance from "../AxiosUtils";
import Breadcrumb from "../header/Breadcrumb";
import Headers from "../header/Header";



function ProductDetails() {
    const { productID } = useParams();
    const product = useSelector((state) => state.product);
    const { title, description, price, category, image } = product;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {state} = useLocation();
    console.log("state :", state);
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
        .get(`https://fakestoreapi.com/products/${state}`)
        .catch((error) => console.log("Error : ", error));
  
      dispatch(selectedProduct(response.data));
    };
  return (
    <> 
    <Headers />
    <Breadcrumb />
      {Object.keys(product).length === 0 ? (
            <Loader active inline='centered' />

      ) : (
        <div style={{ paddingLeft: "100px", margin:"20px" }}>
          <Grid>
            <Grid.Column width={4}>
              <Image src={image} />
            </Grid.Column>
            <Grid.Column width={3}>
              <Card>
                <Card.Content header={title} />
                <Card.Content description={category} />
                <Card.Content extra>
                  <Icon name="dollar sign" />
                  {price}
                </Card.Content>
                <div>
                  <button
                    className="ui secondary basic button"
                    style={{ marginBottom: "2px" }}
                    onClick={() => navigate("/product")}
                  >
                    Back
                  </button>
                  <button
                    className="ui secondary button"
                  >
                    Add to Cart
                  </button>
                </div>
              </Card>
            </Grid.Column>
            <Grid.Column width={8}>
              <Card>
                <Card.Content description={description} />
              </Card>
            </Grid.Column>
          </Grid>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
