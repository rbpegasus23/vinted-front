import vintedLogo from "../assets/images/logo/vinted-logo.png";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
const Header = (props) => {
  const userToken = Cookies.get("token");
  const handleDisconnect = () => {
    Cookies.remove("token");
    props.setToken(null);
  };
  const displaySeConnecter = () => {
    return (
      <header>
        <Link to={"/"}>
          <img src={vintedLogo} alt="Vinted Logo" />
        </Link>
        <div className="searchBar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Rechercher des articles" />
        </div>
        <div className="divButtonsOfHeader">
          <Link to={"/signup"}>
            <button>S'inscrire</button>
          </Link>
          <Link to={"/login"}>
            <button>Se connecter</button>
          </Link>

          <Link to={userToken ? "/publish" : "/login"}>
            <button>Vends tes articles</button>
          </Link>
        </div>
      </header>
    );
  };
  const displaySeDeconnecter = () => {
    return (
      <header>
        <Link to={"/"}>
          <img src={vintedLogo} alt="Vinted Logo" />
        </Link>
        <div className="searchBar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Rechercher des articles" />
        </div>
        <div className="divButtonsOfHeader">
          <Link to={"/"}>
            <button onClick={handleDisconnect}>Se déconnecter</button>
          </Link>
          <Link to={"/publish"}>
            <button>Vends tes articles</button>
          </Link>
        </div>
      </header>
    );
  };
  return userToken ? displaySeDeconnecter() : displaySeConnecter();
};

export default Header;
