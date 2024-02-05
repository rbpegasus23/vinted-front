import Product from "../../components/Product";
import { useState, useEffect } from "react";
import banner from "../images/banner/banner.jpg";
import axios from "axios";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mydata, setMyData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        const newData = [...response.data.offers];

        setMyData(newData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const displayProducts = () => {
    return mydata.map((element) => (
      <Product
        id={element._id}
        key={element._id}
        avatarUrl={element.owner?.account?.avatar?.secure_url ?? ""}
        username={element.owner.account.username}
        imageUrl={element.product_pictures[0].secure_url}
        price={element.product_price}
        size={element.product_details[1]?.TAILLE ?? ""}
        marque={element.product_details[0].MARQUE}
      />
    ));
  };
  return isLoading ? (
    <p className="downloading">Downloading</p>
  ) : (
    <>
      <img className="banner" src={banner} alt="banner" />
      <h2>Explorez les articles</h2>
      <div className="container-products">{displayProducts()}</div>
    </>
  );
};

export default Home;
