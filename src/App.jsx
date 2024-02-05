import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import axios from "axios";
import Home from "./assets/pages/Home";
import Offer from "./assets/pages/Offer";
import Signup from "./assets/pages/Signup";
import Login from "./assets/pages/Login";
import Publish from "./assets/pages/Publish";
import Checkout from "./assets/pages/Checkout";
import Header from "./components/Header";

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mydata, setMyData] = useState([]);
  const [token, setToken] = useState(Cookies.get("token") || "");

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

  return (
    <Router>
      <Header setToken={setToken}></Header>

      <main>
        <Routes>
          <Route
            path="/checkout/:price/:description"
            element={<Checkout token={token} mydata={mydata} />}
          />
          <Route path="/publish" element={<Publish token={token} />} />
          <Route path="/signup" element={<Signup setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/" element={<Home />} />
          {!isLoading && (
            <Route path="/offer/:id" element={<Offer mydata={mydata} />} />
          )}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
