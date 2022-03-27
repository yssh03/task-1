import React from "react";
import Headers from "../../header/Header";
import { Grid, Image, Card, Icon } from "semantic-ui-react";
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

  useEffect(() => {
    setData(products);
  }, [products]);
  const fetchProduct = async () => {
    const response = await axiosInstance
      .get("https://fakestoreapi.com/products")
      .catch((error) => console.log("Error: ", error));

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
              marginRight:"10px",
              letterSpacing: "2px",
            }}
          >
            <button
              className="ui secondary button"
              onClick={() => handleSort(data)}
            >
              Sort
            </button>
          </div>
          {/* <Grid columns={4} divided>
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
                    </Grid.Column>
                  ))}
              </Grid.Row>
            </Grid> */}
          <div className="container mx-auto ">
            {" "}
            {/* <div className="grid grid-rows-1 grid-flow-col"> */}
            <div class="grid  xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-6 ">
              {data &&
                data.length &&
                data.map((product) => (
                  <div className="justify-center items-center border-2 border-gray-300 rounded-xl p-6 bg-black-100">
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
                          class="dollar sign icon"
                          style={{ fontWeight: "bold" }}
                        ></i>
                        {product.price}
                      </p>
                      <button
                        class="ui secondary button"
                        style={{ marginTop: "10px", letterSpacing: "2px" }}
                        onClick={() =>
                          navigate(`/product/product-details`, {
                            state: product.id,
                          })
                        }
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            {/* </div> */}
          </div>{" "}
        </div>
      )}
    </>
  );
}

export default Product;
