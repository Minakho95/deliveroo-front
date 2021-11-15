import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import Header from "./components/Header";
import Cart from "./components/Cart";
import Menu from "./components/Menu";

function App() {
  const [data, setData] = useState({});
  const [cart, setCart] = useState([]);
  // on créer un state isLoading pour afficher l'état de chargement du composant
  const [isLoading, setIsLoading] = useState(true);
  const empty = cart.length === 0;

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3200/");
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addMeal = (title, id, price) => {
    const exist = cart.find((element) => element.id === id);
    console.log(cart);
    if (exist) {
      // index de l'élément selectionné
      const index = cart.indexOf(exist);

      // mise à jour du state cart (incrémentation du prix)
      const newCart = [...cart];
      newCart[index] = {
        ...newCart[index],
        quantity: newCart[index].quantity + 1,
      };
      setCart(newCart);
    } else {
      const newCart = [...cart];

      newCart.push({
        title: title,
        id: id,
        price: price,
        quantity: 1,
      });
      setCart(newCart);
    }
  };
  const removeMeal = (title, id, price) => {
    const exist = cart.find((element) => element.id === id);
    // index de l'élément selectionné
    const index = cart.indexOf(exist);

    if (exist) {
      if (cart[index].quantity > 1) {
        // mise à jour du state cart (décrémentation du prix)
        const newCart = [...cart];
        newCart[index] = {
          ...newCart[index],
          quantity: newCart[index].quantity - 1,
        };
        setCart(newCart);
      } else {
        const newCart = [...cart];
        newCart.splice(index, 1);

        setCart(newCart);
      }
    }
  };

  return isLoading ? (
    <span>Chargement du site...</span>
  ) : (
    <div>
      <Header />
      <div className="content-title">
        <div className="content-title-text">
          <h2>{data.restaurant.name}</h2>
          <p>{data.restaurant.description}</p>
        </div>
        <div className="content-title-img">
          <img src={data.restaurant.picture} alt="restaurant-picture" />
        </div>
      </div>
      <div className="background-category">
        <div className="main">
          <Menu data={data} addMeal={addMeal} />
          <Cart cart={cart} addMeal={addMeal} removeMeal={removeMeal} />
        </div>
      </div>
    </div>
  );
}

export default App;
