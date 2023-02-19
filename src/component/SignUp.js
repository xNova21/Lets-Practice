import React, { useState } from "react";
import Navba from "./Navba";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
const SignUp = () => {
  let navigate = useNavigate();
  let [message, setMessage] = useState({ message: "" });
  let [info, setInfo] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    languageSpoken: "",
  });
  let [loading, setLoading] = useState({ loading: false });
  let handleChange = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };
  let handleSubmit = async (event) => {
    event.preventDefault();
    setMessage({ message: "" });
    let sign;
    setLoading({ loading: true });
    if (info.password === info.repeatPassword && info.languageSpoken !== "") {
      try {
        sign = await axios.post(`${process.env.URL}/api/auth/signUp`, info);
      } catch (error) {
        setLoading({ loading: false });
        return setMessage({ message: "Server error." });
      }
      setLoading({ loading: false });
      setMessage({ message: sign.data.message });
      if (sign.data.message.includes("User created") === true) {
        setTimeout(() => {
          navigate("logIn");
        }, 1000);
      }
    } else if (info.password !== info.repeatPassword) {
      setMessage({ message: "Passwords doesn´t match." });
    } else if (info.languageSpoken === "") {
      setMessage({ message: "Select your native language." });
    }
  };
  return (
    <div className="background">
      <Navba loged={false} />
      {message.message === "" ? (
        loading.loading === false ? (
          <div className="margin">
            {" "}
            <h1>Sign up</h1>
            <form className="login" onSubmit={handleSubmit}>
              <input
                className="inputmargin"
                value={info.username}
                placeholder="Username"
                name="username"
                onChange={handleChange}
              />
              <input
                className="inputmargin"
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              <input
                className="inputmargin"
                type="password"
                placeholder="Repeat password"
                name="repeatPassword"
                onChange={handleChange}
              />
              <select
                value={info.languageSpoken}
                className="inputmargin"
                name="languageSpoken"
                onChange={handleChange}
              >
                <option value="" selected={true} disabled={true}>
                  Your language
                </option>
                <option value="english">english</option>
                <option value="spanish">spanish</option>
                <option value="french">french</option>
                <option value="italian">italian</option>
                <option value="japanese">japanese</option>
                <option value="chinese">chinese</option>
                <option value="korean">korean</option>
                <option value="russian">russian</option>
              </select>
              <input className="inputmargin" type="submit" value="Sign up" />
              <label className="inputmargin">Already have an account?</label>
              <Link to="/logIn">
                <span className="inputmargin">Log in</span>
              </Link>
            </form>
          </div>
        ) : (
          <div>
            <Loading />
          </div>
        )
      ) : message.message.includes("Wellcome") === true ? (
        <div>{message.message}</div>
      ) : (
        <div className="margin">
          <h1>Sign up</h1>
          <form className="login" onSubmit={handleSubmit}>
            <input
              className="inputmargin"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              className="inputmargin"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              className="inputmargin"
              type="password"
              placeholder="Repeat password"
              name="repeatPassword"
              onChange={handleChange}
            />
            <select
              className="inputmargin"
              name="languageSpoken"
              onChange={handleChange}
            >
              <option selected={true} disabled={true}>
                Your language
              </option>
              <option value="english">english</option>
              <option value="spanish">spanish</option>
              <option value="french">french</option>
              <option value="italian">italian</option>
              <option value="japanese">japanese</option>
              <option value="chinese">chinese</option>
              <option value="korean">korean</option>
              <option value="russian">russian</option>
            </select>

            <input className="inputmargin" type="submit" value="Sign up" />
          </form>
          <div className="margin">{message.message}</div>
        </div>
      )}
    </div>
  );
};
export default SignUp;
