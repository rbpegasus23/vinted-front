import { useState } from "react";
import { useParams } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = () => {
  const { price, description } = useParams();
  const priceTotal = (
    parseFloat(price) +
    parseFloat(price) * 0.05 +
    0.8
  ).toFixed(2);
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);
    try {
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "Jean",
      });
      const stripeToken = stripeResponse.token.id;
      const infoPurchase = {
        priceTotal: priceTotal,
        description: description,
      };
      const response = await axios.post("http://localhost:3100/pay", {
        stripeToken,
        infoPurchase,
      });
      if (response.data.status === "succeeded") {
        console.log("succeeded");
        setCompleted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!completed ? (
        <form id="formCheckout" onSubmit={handleSubmit}>
          <div className="detailsCheckout">
            <div>
              <p>Commande</p>
              <p>{parseFloat(price).toFixed(2)} €</p>
            </div>
            <div>
              <p>Frais protection acheteurs</p>
              <p>{(parseFloat(price).toFixed(2) * 0.05).toFixed(2)} €</p>
            </div>
            <div>
              <p>Frais de port</p>
              <p>0.80 €</p>
            </div>
          </div>
          <div>
            <p>TOTAL</p>
            <p>{priceTotal} €</p>
          </div>
          <div>
            <p>
              Il ne vous reste plus qu'un étage pour vous offrir{" "}
              <span>H&M Top</span>. Vous allez payer <span>{priceTotal} €</span>{" "}
              (frais de protextion et frais de port inclus).
            </p>
          </div>

          <CardElement />
          <button type="submit">Pay</button>
        </form>
      ) : (
        <span>Paiement effectué ! </span>
      )}
    </>
  );
};

export default CheckoutForm;
