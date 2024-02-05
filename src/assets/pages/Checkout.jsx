import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51OgEAjB23e6CXssuoMjmQ6xdHp14YnaxtQYwLw0vzklH9otcRYphlgeeYUK4hS00cl8NcjIYIIbaC1M6LwDgzcf400ZjdGaWy0"
);

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
