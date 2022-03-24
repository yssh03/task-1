import React from "react";
import Headers from "../header/Header";
import {
  Grid,
  Image,
  Card,
  Icon,
  Dimmer,
  Loader,
  Segment,
} from "semantic-ui-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../AxiosUtils";
import { useDispatch } from "react-redux";
import { setProduct } from "../../redux/actions/productAction";

function Product() {
  // console.log(data);
  
  const dispatch = useDispatch();
  
  const products = useSelector((state) => state.allProducts.products);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  

  // const [products, setProducts] = useState(null);
  // useSelector((state) => {
  //   state.allProducts.products &&
  //     state.allProducts.products?.length &&
  //     setProducts(state.allProducts.products);
  //     console.log(state.allProducts.products);
  // });
  const fetchProduct = async () => {
    const response = await axiosInstance
      .get("https://fakestoreapi.com/products")
      .catch((error) => console.log("Error: ", error));

    // setData(response.data);/
    await dispatch(setProduct(response.data));
    await setData(response.data);
    console.log("loaded");
    await setFlag(!flag)
  };

  useEffect(() => {
      fetchProduct();
  },[]);

  // useEffect(() => {
    console.log("out products" ,data);
  // })
  

  const handleSort = (param) => {
    console.log("clicked");
    const sortedData = param.sort((a, b) => {
      var titleA = a.title.toUpperCase(); // ignore upper and lowercase
      var titleB = b.title.toUpperCase(); // ignore upper and lowercase
      if (titleA < titleB) {
        return -1; //nameA comes first
      }
      if (titleA > titleB) {
        return 1; // nameB comes first
      }
      return 0;
    });
    // setProducts(sortedData);
    dispatch(setProduct(sortedData));
    setData(sortedData);
    setFlag(!flag)
    console.log("Product :", data);
    console.log("sorted data : ", sortedData);

  };

  return (
    <>
      <Headers />

      {data && Object.keys(data).length === 0 ? (
        <Segment>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "20px",
            }}
          >
            <button
              className="ui secondary button"
              onClick={() => handleSort(data)}
            >
              Sort by Name
            </button>
          </div>
          <div>
            {console.log('asdsad')}
            <Grid columns={4} divided>
              <Grid.Row>
                {data && data.length &&
                  data.map((product) => (
                    <Grid.Column style={{ marginTop: "10px" }} key={product.id}>
                      <Link to={`/product/${product.id}`}>
                        <Card>
                          <Image
                            src={product.image}
                            fluid={true}
                            size={"small"}
                          />
                          <Card.Content>
                            <Card.Header>{product.title}</Card.Header>
                            <Card.Content
                              style={{
                                color: "grey",
                                fontWeight: "bold",
                              }}
                            >
                              <Icon name="dollar sign" />
                              {product.price}
                            </Card.Content>
                          </Card.Content>
                        </Card>
                      </Link>
                    </Grid.Column>
                  ))}
              </Grid.Row>
            </Grid>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
