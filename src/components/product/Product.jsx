import React from "react";
import Headers from "../header/Header";
import { Grid, Image, Card, Icon } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../AxiosUtils";
import { useDispatch } from "react-redux";
import { setProduct } from "../../redux/actions/productAction";
import Breadcrumb from "../header/Breadcrumb";

function Product() {
  // console.log(data);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.allProducts.filteredProducts);
  const filteredProducts = useSelector((state) => state.allProducts.filteredProducts);
  console.log("type", products);
  // const [products, setProducts] = useState(null)
  //  useSelector((state) => state.allProducts.products);

  const [data, setData] = useState([]);
  console.log("type data", data);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setData(products);
  }, [products]);
  const fetchProduct = async () => {
    const response = await axiosInstance
      .get("https://fakestoreapi.com/products")
      .catch((error) => console.log("Error: ", error));

    // setData(response.data);/
    await dispatch(setProduct(response.data));
    await setData(response.data);
    await setFlag(!flag);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleSort = (param) => {
    console.log("clicked");
    const sortedData = param.sort((a, b) => {
      var titleA = a.title.toUpperCase();
      var titleB = b.title.toUpperCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });

    dispatch(setProduct(sortedData));
    setData(sortedData);
    setFlag(!flag);
  };
  // console.log(data.filter(data.category.toLowerCase().includes("je")))

  return (
    <>
      <Headers />
      <Breadcrumb />
      {data && Object.keys(data).length === 0 ? (
        <div
          class="ui active centered inline loader"
          style={{ marginTop: "20px" }}
        ></div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
              marginBottom: "10px",
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
            <Grid columns={4} divided>
              <Grid.Row>
                {data &&
                  data.length &&
                  data.map((product) => (
                    <Grid.Column
                      style={{
                        marginTop: "10px",
                        marginLeft: "20px",
                        marginRight: "-20px",
                      }}
                      key={product.id}
                    >
                      {/* <Link to={`/product/product-details`}> */}
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
                          <button
                            class="ui secondary button"
                            style={{ marginTop: "5px" }}
                            onClick={() =>
                              navigate(`/product/product-details`, {
                                state: product.id,
                              })
                            }
                          >
                            Buy
                          </button>
                        </Card.Content>
                      </Card>
                      {/* </Link> */}
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
