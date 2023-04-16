import { Typography, styled } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import { Link } from "react-router-dom";
import { CartContext } from "../App";
import { api } from "../api/api";

const Image = styled("img")({
  width: 650,
  height: 370,
  margin: "10px 10px",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  filter: "contrast()",

  transition: "transform 0.2s ease-in-out",

  ":hover": {
    transition: "transform 0.2s ease-in-out",
    marginTop: "2px",
  },
});

const Files = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const { title } = useContext(CartContext);
  let url = `/files`;

  if (title) {
    url = `/files?title=${title}`;
  }

  useEffect(() => {
    api
      .get(url)
      .then((response) => {
        console.log(response.data.data);
        setImages(response.data.data);
      })
      .catch((error) => {
        setImages([]);
        console.log(error);
        setError(error.response.data.message);
      });
  }, [url]);

  if (images.length === 0) {
    return (
      <div>{error && <h1 className="alert alert-primary">{error}</h1>}</div>
    );
  } else
    return (
      <ImageList sx={{ justifyContent: "flex-start" }}>
        {images.map((item, index) => (
          <ImageListItem
            key={index}
            style={{ position: "relative", textAlign: "center" }}
          >
            <Link to={`/files/${item._id}`}>
              <Image
                src={`${item.imgPath}`}
                srcSet={`${item.imgPath}`}
                alt={item.title}
                loading="lazy"
              />
            </Link>
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "30px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {item.title}
            </div>
          </ImageListItem>
        ))}
      </ImageList>
    );
};

export default Files;
