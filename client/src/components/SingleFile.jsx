import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";

import Files from "./Files";
import Navbar, { checkAdmin } from "./Navbar";

import { AuthContext, CartContext } from "../App";
import EditFile from "./EditFile";
import { api } from "../api/api";
import Cookies from "js-cookie";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled("h2")({
  fontFamily: "sans-serif",
  margin: "20px 20px",
});

const Image = styled("img")({
  width: "800px",
  Height: "auto",
  margin: "20px 20px",
  boxShadow:
    "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
});

const Details = styled(Typography)`
  // border: 1px solid black;
  width: 500px;
  height: auto;
  margin: 8px 8px;
  font-weight: 400;

  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
`;

const ParaContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px;
`;

const ButtonContainer = styled(Box)`
  display: flex;

  justify-content: space-around;
`;
const AddToCart = styled(Button)`
  margin: 20px 20px;
  text-transform: none;
  background: gray;
  :hover {
    background: #eed512;
    color: black;
  }
`;
const SingleFile = () => {
  const params = useParams();
  const { addTocart } = useContext(CartContext);

  const [file, setFile] = useState({});
  const [order, setOrder] = useState({});
  var isAdmin = checkAdmin();
  useEffect(() => {
    api
      .get(`/files/${params.id}`)
      .then((response) => {
        console.log(response.data.data);
        setFile(response.data.data);
        localStorage.setItem("file", JSON.stringify(response.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.id]);

  let navigate = useNavigate();

  function createOrder() {
    let token = Cookies.get("authorization");
    if (!token) {
      navigate("/login");
    }

    api
      .post(`/order/file/${params.id}`, null, { withCredentials: true })
      .then((response) => {
        setOrder(response.data.data);
        let orderId = response.data.data._id;
        console.log(response.data.data);
        navigate(`/order/file/${orderId}`);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.data.message);
        if (error) {
          navigate("/login");
        }
      });
  }

  const DeleteFile = () => {
    let ok = window.confirm("Do you want to delete this item");
    if (ok) {
      api
        .delete(`/files/${params.id}`, {
          withCredentials: true,
        })
        .then((responce) => {
          console.log(responce.data.message);
          if (responce.data.message == "file deleted successfully") {
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
  };

  console.log(isAdmin);
  return (
    <Container>
      <Title>{file.title}</Title>

      <br />
      <Image src={file.imgPath} />
      <br />

      <Title>{file.title} 3D Model Free Download high quality design.</Title>

      <ParaContainer>
        <h3>Key - Features</h3>
        <Details> {file.description}</Details>
      </ParaContainer>

      <br />

      <Title>File Size :- {file.fileSize}mb</Title>
      <br />

      <Title>Cost :- ₹{file.prize}/-</Title>
      <br />

      <ButtonContainer>
        <AddToCart onClick={createOrder} variant="contained">
          BuyNow
        </AddToCart>
        {isAdmin ? (
          <>
            <Link style={{ textDecoration: "none" }} to={`/edit/${params.id}`}>
              <AddToCart variant="contained">Edit</AddToCart>
            </Link>
            <AddToCart onClick={DeleteFile} variant="contained">
              Delete
            </AddToCart>
          </>
        ) : null}
      </ButtonContainer>
      <br />

      <Title>More Files</Title>
      <br />
      <button>
        <Files />
      </button>

      <br />
    </Container>
  );
};

export default SingleFile;
