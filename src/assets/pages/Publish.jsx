import { useState } from "react";

import axios from "axios";

const Publish = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [picture, setPicture] = useState({});
  const [preview, setPreview] = useState(null);

  const userToken = props.token;

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const arrElementsOfForm = [
      { key: "title", value: title },
      { key: "description", value: description },
      { key: "price", value: price },
      { key: "condition", value: condition },
      { key: "city", value: city },
      { key: "brand", value: brand },
      { key: "size", value: size },
      { key: "color", value: color },
      { key: "picture", value: picture },
    ];

    for (const { key, value } of arrElementsOfForm) {
      formData.append(key, value);
    }

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(JSON.stringify(response.data));
    } catch (err) {
      if (err.response.status === 500) {
        console.error("An error occurred");
      } else {
        console.error(err.response.data.msg);
      }
    }
  };

  const handleChangeTitle = (event) => {
    console.log(event.target.value);
    setTitle(event.target.value);
  };
  const handleChangeDescription = (event) => {
    console.log(event.target.value);
    setDescription(event.target.value);
  };

  const handleChangePrice = (event) => {
    console.log(event.target.value);
    setPrice(event.target.value);
  };
  const handleChangeCondition = (event) => {
    console.log(event.target.value);
    setCondition(event.target.value);
  };

  const handleChangeCity = (event) => {
    console.log(event.target.value);
    setCity(event.target.value);
  };

  const handleChangeBrand = (event) => {
    console.log(event.target.value);
    setBrand(event.target.value);
  };

  const handleChangeSize = (event) => {
    console.log(event.target.value);
    setSize(event.target.value);
  };
  const handleChangeColor = (event) => {
    console.log(event.target.value);
    setColor(event.target.value);
  };

  const handleChangeFileInInput = (event) => {
    const FileImage = event.target.files[0];
    const objectUrl = URL.createObjectURL(FileImage);
    setPreview(objectUrl);
    setPicture(FileImage);
  };
  return (
    <section>
      <div className="container-formPublish">
        <form onSubmit={handleSubmitForm}>
          <label>Title</label>
          <input type="text" value={title} onChange={handleChangeTitle} />
          <label>Description</label>
          <input
            type="description"
            value={description}
            onChange={handleChangeDescription}
          />
          <label>Price</label>
          <input type="text" value={price} onChange={handleChangePrice} />
          <label>Condition</label>
          <input
            type="text"
            value={condition}
            onChange={handleChangeCondition}
          />
          <label>City</label>
          <input type="text" value={city} onChange={handleChangeCity} />
          <label>Brand</label>
          <input type="text" value={brand} onChange={handleChangeBrand} />
          <label>Size</label>
          <input type="text" value={size} onChange={handleChangeSize} />
          <label>Color</label>
          <input type="text" value={color} onChange={handleChangeColor} />
          <label>File</label>
          <div id="pickAFile">
            <button>Choisir une photo</button>
            <input type="file" onChange={handleChangeFileInInput} />
          </div>
          {preview && (
            <img className="previewImageInForm" src={preview} alt="" />
          )}

          <button type="submit">Envoyer</button>
        </form>
      </div>
    </section>
  );
};

export default Publish;
