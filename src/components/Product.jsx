import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
const Product = (props) => {
  return (
    <div className="produit">
      <div>
        {props.avatarUrl && <img src={props.avatarUrl} alt={props.id} />}
        <p>{props.username}</p>
      </div>
      <Link to={`/offer/${props.id}`}>
        <img src={props.imageUrl} alt={props.id} />

        <div>
          <p>{props.price.toFixed(2)} €</p>
          <p>{props.size}</p>
          <p>{props.marque}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
