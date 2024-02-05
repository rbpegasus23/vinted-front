import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";

const Offer = (props) => {
  const { id } = useParams();
  const userToken = Cookies.get("token");

  const indexWhereIsCurrentId = props.mydata.findIndex((obj) => obj._id === id);
  let description = "";
  indexWhereIsCurrentId == 1
    ? (description = "vestido")
    : (description = props.mydata[indexWhereIsCurrentId].product_description); //j'ai mis ce bout de code car je ne sais pas pourquoi le fait de passer la description d'origine en param, cela engendre une erreur.

  //Obligé de faire ce genre de vérification ci-dessous car suivant l'article, il manque des infos du coup, l'index des objets correspondants ne sont pas toujours les mêmes.
  const indexWhereIsMarque = props.mydata[
    indexWhereIsCurrentId
  ].product_details.findIndex((detail) => "MARQUE" in detail);
  const indexWhereIsTaille = props.mydata[
    indexWhereIsCurrentId
  ].product_details.findIndex((detail) => "TAILLE" in detail);

  const indexWhereIsEtat = props.mydata[
    indexWhereIsCurrentId
  ].product_details.findIndex((detail) => "ÉTAT" in detail);

  const indexWhereIsCouleur = props.mydata[
    indexWhereIsCurrentId
  ].product_details.findIndex((detail) => "COULEUR" in detail);

  const indexWhereIsEmplacement = props.mydata[
    indexWhereIsCurrentId
  ].product_details.findIndex((detail) => "EMPLACEMENT" in detail);

  return (
    <div className="container-offer">
      <img
        src={props.mydata[indexWhereIsCurrentId].product_pictures[0].secure_url}
        alt={description}
      />
      <div className="recapitulatif">
        <div className="tarif">
          <p>
            {props.mydata[indexWhereIsCurrentId].product_price.toFixed(2)} €
          </p>
        </div>
        <div className="container-info">
          <div>
            <p>MARQUE</p>
            <p>TAILLE</p>
            <p>ÉTAT</p>
            <p>COULEUR</p>
            <p>EMPLACEMENT</p>
          </div>
          <div>
            {indexWhereIsEtat !== -1 ? (
              <p>
                {
                  props.mydata[indexWhereIsCurrentId].product_details[
                    indexWhereIsMarque
                  ].MARQUE
                }
              </p>
            ) : null}
            {indexWhereIsTaille !== -1 ? (
              <p>
                {
                  props.mydata[indexWhereIsCurrentId].product_details[
                    indexWhereIsTaille
                  ].TAILLE
                }
              </p>
            ) : null}
            {indexWhereIsEtat !== -1 ? (
              <p>
                {
                  props.mydata[indexWhereIsCurrentId].product_details[
                    indexWhereIsEtat
                  ].ÉTAT
                }
              </p>
            ) : null}
            {indexWhereIsCouleur !== -1 ? (
              <p>
                {
                  props.mydata[indexWhereIsCurrentId].product_details[
                    indexWhereIsCouleur
                  ].COULEUR
                }
              </p>
            ) : null}
            {indexWhereIsEmplacement !== -1 ? (
              <p>
                {
                  props.mydata[indexWhereIsCurrentId].product_details[
                    indexWhereIsEmplacement
                  ].EMPLACEMENT
                }
              </p>
            ) : null}
          </div>
        </div>
        <div className="descriptif">
          <p>{props.mydata[indexWhereIsCurrentId].product_name}</p>
          <p>{description}</p>
        </div>
        <div className="buttons-recapitulatif">
          <Link
            to={
              userToken
                ? `/checkout/${props.mydata[indexWhereIsCurrentId].product_price}/${description}`
                : "/login"
            }
          >
            <button>Acheter</button>
          </Link>

          <button>Faire une offre</button>
          <button>Message</button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
