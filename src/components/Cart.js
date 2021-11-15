import React from "react";
import PlusIcon from "./PlusIcon";
import MinusIcon from "./MinusIcon";

const Cart = (props) => {
  const { cart, addMeal, removeMeal } = props;
  const empty = cart.length === 0;

  const deliveryFees = 2.5;
  let subTotal = 0;
  cart.forEach((cartItem) => {
    subTotal += cartItem.price * cartItem.quantity;
  });

  const total = subTotal + deliveryFees;

  return (
    <div className="cart">
      <div className="cart-card">
        <button className={"cart-validate" + (empty ? " cart-disabled" : "")}>
          Valider mon panier
        </button>
        {empty ? (
          <div className="cart-empty">Votre panier est vide</div>
        ) : (
          <div>
            <div className="cart-items">
              {cart.map((elem, i) => {
                const price = elem.price;
                return (
                  <div key={elem.id} className="cart-line">
                    <div className="cart-counter">
                      <span
                        onClick={() =>
                          removeMeal(elem.title, elem.id, elem.price)
                        }
                      >
                        <MinusIcon
                          style={{ cursor: "pointer", color: "#00CEBD" }}
                        />
                      </span>
                      <span>{elem.quantity}</span>
                      <span
                        onClick={() => addMeal(elem.title, elem.id, elem.price)}
                      >
                        <PlusIcon
                          style={{ cursor: "pointer", color: "#00CEBD" }}
                        />
                      </span>
                    </div>
                    <span className="cart-item-name">{elem.title}</span>

                    <span className="cart-amount">
                      {Number(elem.price).toFixed(2).replace(".", ",") + " €"}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="cart-results">
              <div className="cart-result-line">
                <span className="cart-result-name">Sous-total</span>
                <span className="cart-amount">
                  {subTotal.toFixed(2).replace(".", ",")} €
                </span>
              </div>
              <div className="cart-result-line">
                <span className="cart-result-name">Frais de livraison</span>
                <span>{deliveryFees.toFixed(2).replace(".", ",")} €</span>
              </div>
            </div>
            <div className="cart-total">
              <span className="cart-result-name">Total</span>
              <span className="cart-amount">
                {total.toFixed(2).replace(".", ",")} €
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
