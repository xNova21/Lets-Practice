import React, { useState } from "react";
import Navba from "./Navba";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import backArrow from "../images/back-arrow.png";

const NewMessage = () => {
  let navigate = useNavigate();
  let [info, setInfo] = useState({ text: "" });
  let [loading, setLoading] = useState({ loading: false });
  let [message, setMessage] = useState({ message: "" });
  let handleSubmit = async (event) => {
    event.preventDefault();
    let newMess;
    setLoading({ loading: true });
    if (info.text !== "") {
      try {
        newMess = await axios.post(
          `https://letspracticelanguage.herokuapp.com/api/router/newMessage/${window.localStorage.user2}`,
          info,
          { headers: { token: window.localStorage.token } }
        );
        if (newMess.data.message === "Authentication error.") {
          setLoading({ loading: false });
          navigate("/logIn");
        } else {
          setMessage({ message: newMess.data.message });
          setLoading({ loading: false });
        }
      } catch (error) {
        setLoading({ loading: false });
        return setMessage({ message: "Server error." });
      }
    } else {
      setLoading({ loading: false });
      return setMessage({ message: "Write something." });
    }
  };
  if (message.message === "Message sent.") {
    setTimeout(() => {
      navigate("/conversation");
    }, 1000);
  }
  let handleChange = (event) => {
    setInfo({ [event.target.name]: event.target.value });
  };
  return (
    <div>
      <Navba loged={true} />{" "}
      {loading.loading === false ? (
        message.message !== "Message sent." ? (
          <div className="margin">
            <form className="login" onSubmit={handleSubmit}>
              <textarea
                placeholder="Write your message"
                cols="30"
                rows="10"
                name="text"
                onChange={handleChange}
              />
              <div>
                <input className="inputmargin" type="submit" value="Send" />
                <Link to="/home">
                  <button className="inputmargin">
                    <img className="arrow" alt="Return" src={backArrow} />
                  </button>
                </Link>
              </div>
            </form>
          </div>
        ) : (
          <div className="margin">{message.message}</div>
        )
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
};
export default NewMessage;
