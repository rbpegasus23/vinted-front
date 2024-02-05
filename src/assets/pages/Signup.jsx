import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = ({ setToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsLetter] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    console.log(newEmail);
    setEmail(newEmail);
  };

  const handleChangeUsername = (e) => {
    const newUsername = e.target.value;
    console.log(newUsername);
    setUsername(newUsername);
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    console.log(newPassword);
    setPassword(newPassword);
  };

  const handleChangeNewsLetter = () => {
    setNewsLetter(!newsletter);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("voici les infos:", { email, username, password });
    const information = {
      email,
      username,
      password,
      newsletter,
    };
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        information
      );
      console.log("voici la réponse :", response.data);

      setIsSignedUp(true);
    } catch (error) {
      console.log("Voici l'erreur: ", error.message);
    }
  };

  const redirectToLoginPage = () => {
    return (
      <div>
        <p>Compte créé avec succès!</p>
        <p>
          Vous allez être automatiquement redirigé vers le formulaire de
          connexion dans quelques secondes...
        </p>
        {setTimeout(() => {
          navigate("/login");
        }, 5000)}
      </div>
    );
  };

  const displaySignUpForm = () => {
    return (
      <form className="formSignup" onSubmit={handleSubmit}>
        <label>Inscription</label>
        <label>Email</label>
        <input type="email" value={email} onChange={handleChangeEmail} />
        <label>Username</label>
        <input type="text" value={username} onChange={handleChangeUsername} />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={handleChangePassword}
        />
        <input
          type="checkbox"
          name="newsletter"
          id="newsletter"
          checked={newsletter}
          onChange={handleChangeNewsLetter}
        />

        <button type="submit">Submit</button>
      </form>
    );
  };
  return isSignedUp ? redirectToLoginPage() : displaySignUpForm();
};

export default Signup;
