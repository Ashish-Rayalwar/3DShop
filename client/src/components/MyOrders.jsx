import styled from "@emotion/styled";

import React, { useState, useEffect } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import { api } from "../api/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    api
      .get("/order/user", { withCredentials: true })
      .then((responce) => {
        setOrders(responce.data.data);

        setError("");
      })
      .catch((error) => {
        if (error.response.data.message == "You are not loggedIn") {
          navigate("/login");
        }

        setError(error.response.data.message);
        window.alert(error.response.data.message);
      });
  }, []);

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100vw;
  `;
  console.log(orders);
  return (
    <Container>
      {orders.length === 0 ? (
        <h1 className="alert alert-warning">
          You haven't Purchase anything {navigate("/")}
        </h1>
      ) : null}
      {orders.map((x, i) => (
        <Link to={`/order/file/${x._id}`} style={{ textDecoration: "none" }}>
          <div
            key={i}
            style={{
              color: "black",
              textDecoration: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              width: "600px",
              height: "auto",
              margin: "10px",
              textAlign: "start",
              padding: "20px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              backgroundColor: "#F5F5F5",
            }}
          >
            <h3> File Name :- {x.fileId.title}</h3>

            <h3> File Cost :- {x.fileId.prize}/-</h3>

            <h3> File Status :- {x.status}</h3>

            <h3> Purchased At :- {x.createdAt}</h3>

            <img
              src={x.fileId.imgPath}
              style={{ width: 200, height: "auto" }}
            />
          </div>
        </Link>
      ))}
      <hr />
    </Container>
  );
}

export default MyOrders;
