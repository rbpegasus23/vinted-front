import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const Login = ({ setToken, setIsConnected }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState(false);

  const handleChangeEmail = (e) => {
    setAlertMessage(false);
    const newEmail = e.target.value;
    console.log(newEmail);
    setEmail(newEmail);
  };

  const handleChangePassword = (e) => {
    setAlertMessage(false);
    const newPassword = e.target.value;
    console.log(newPassword);
    setPassword(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const information = {
        email,
        password,
      };

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        information
      );
      console.log("voici la réponse au login: ", response.data);
      const numberOfMinut = 20;
      const delayInMinutes = new Date(
        new Date().getTime() + numberOfMinut * 60 * 1000
      );
      Cookies.set("token", response.data.token, {
        secure: true,
        expires: delayInMinutes,
      });

      setToken(response.data.token);
      navigate("/");
    } catch (error) {
      setAlertMessage(true);
      console.log("Erreur login: ", error);
    }
  };

  return (
    <form className="formConnexion" onSubmit={handleSubmit}>
      <label>Connexion</label>
      <label>Email</label>
      <input type="email" value={email} onChange={handleChangeEmail} />

      <label>Password</label>
      <input type="password" value={password} onChange={handleChangePassword} />
      {alertMessage ? (
        <p className="alertMessage">
          Identifiants incorrects. Veuillez réessayer.
        </p>
      ) : (
        <p></p>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
