import styled from "@emotion/styled";
import { Height } from "@mui/icons-material";
import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { api } from "../api/api";

function Pay() {
  const navigate = useNavigate();
  const params = useParams();
  // const { user } = useContext(AuthContext);

  // const userId = user._id;
  // console.log(userId);
  console.log(params.id);
  const [order, setOrder] = useState({});
  const [file, setFile] = useState({});
  // const [token, setToken] = useState("");
  let count = 0;

  // let orderUrl = `http://localhost:5000/order/user/${params.id}`;
  // let data = {
  //   fileId: params.id,
  // };
  let user = localStorage.getItem("user");

  if (!user) {
    navigate("/login");
  }
  useEffect(() => {
    api
      .get(`/order/user/${params.id}`, { withCredentials: true })
      .then((responce) => {
        console.log(responce.data.data);
        setOrder(responce.data.data);
        setFile(responce.data.data.fileId);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.message == "You are not loggedIn") {
          navigate("/login");
        }
      });
  }, [params.id]);

  // `https://intelligent-bedecked-switch.glitch.me/order/payment/${params.id}`;
  const status = "completed";
  let token;
  async function makePayement() {
    // try {
    //   let responce = await axios.post(
    //     `http://localhost:5000/order/payment/${params.id}`,
    //     { status }
    //   );
    api
      .post(
        `/order/payment/${params.id}`,
        { status },
        { withCredentials: true }
      )
      .then((responce) => {
        console.log(responce.data);
        setOrder(responce.data.data);
        setFile(responce.data.data.fileId);
        localStorage.setItem("token", responce.data.token);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.message == "You are not loggedIn") {
          navigate("/login");
        }
      });
  }

  async function downloadFile() {
    let token = localStorage.getItem("token");
    let orderId = params.id;
    console.log(token);
    api
      .post(`/file/download`, { orderId, token }, { withCredentials: true })
      .then((responce) => {
        console.log(responce.data.url);
        window.open(responce.data.url);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        console.log(error);
        if (error.response.data.message == "You are not loggedIn") {
          navigate("/login");
        }
      });
  }

  const Container = styled.div`
    /* border: 1px solid gray; */
    width: auto;
    height: 55vh;
    align-items: center;
    display: flex;
    /* margin: auto; */
    text-align: center;
  `;
  const ImageContainer = styled.div`
    /* border: 1px solid gray; */
    margin: 0px 30px;
    padding: 30px;
  `;
  const Image = styled("img")({
    width: "400px",
    Height: "auto",
    marginLeft: "40px",
  });

  const RightContainer = styled.div`
    /* border: 1px solid gray; */
    width: 600px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  `;

  return (
    <div style={{ alignItems: "center", textAlign: "center" }}>
      <h2>Order Details</h2>
      <hr />
      <div>
        <h4>Order status :</h4>
        {order.status == "pending" ? (
          <div>
            {" "}
            <button className="btn btn-warning">{order.status}</button>{" "}
          </div>
        ) : (
          <div>
            <button className="btn btn-success">{order.status}</button>{" "}
          </div>
        )}
        <hr />
      </div>
      <Container>
        <ImageContainer>
          <Image src={file.imgPath} alt="" srcset="" />
        </ImageContainer>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <RightContainer>
            <div>
              <h1>{file.title}</h1>
            </div>
            <hr />

            {order.status == "pending" ? (
              <div>
                {" "}
                <button
                  type="submit"
                  onClick={makePayement}
                  className="btn btn-warning"
                >
                  Pay ₹{order.amount}/-
                </button>{" "}
              </div>
            ) : (
              <div>
                {" "}
                <button className="btn btn-success disabled">
                  Pay ₹{order.amount}/-
                </button>{" "}
              </div>
            )}
          </RightContainer>
          <hr />
          {order.status == "completed" ? (
            <Fragment>
              <h3>Your File is ready to download....</h3>
              <div style={{ width: "100px" }}>
                <button
                  type="submit"
                  onClick={downloadFile}
                  className="btn btn-primary btn-sm"
                >
                  Click Here
                </button>{" "}
              </div>
            </Fragment>
          ) : null}
        </div>
      </Container>
    </div>
  );
}

export default Pay;
