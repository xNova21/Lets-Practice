import React, { useState } from "react";
import Navba from "./Navba";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const Login = () => {
  let params = useParams();
  let navigate = useNavigate();
  let [message, setMessage] = useState({ message: "" });
  let [info, setInfo] = useState({ username: "", password: "" });
  let [loading, setLoading] = useState({ loading: false });
  let handleChange = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };
  let handleSubmit = async (event) => {
    event.preventDefault();
    setMessage({ message: "" });
    let getToken;
    setLoading({ loading: true });
    try {
      getToken = await axios.post(`${process.env.URL}/api/auth/logIn`, info);
    } catch (error) {
      setLoading({ loading: false });
      return setMessage({ message: "Server error." });
    }
    setLoading({ loading: false });
    window.localStorage.token = getToken.data.token;
    window.localStorage.id = getToken.data.id;
    setMessage({ message: getToken.data.message });
    if (getToken.data.message.includes("Wellcome") === true) {
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    }
  };
  return (
    <div className="background">
      <Navba loged={false} />

      {message.message === "" ? (
        loading.loading === false ? (
          <div className="margin ">
            <h1>Log in</h1>
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
              <input className="inputmargin" type="submit" value="Log in" />
              <label className="inputmargin">Don´t have an account?</label>
              <Link to="/signUp">
                <span className="inputmargin ">Register now</span>
              </Link>
            </form>
            {params.message}
          </div>
        ) : (
          <div>
            <Loading />
          </div>
        )
      ) : message.message.includes("Wellcome") === true ? (
        <div className="geeks">
          <h1>{message.message}</h1>
        </div>
      ) : (
        <div className="margin">
          <h1> Log in</h1>
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
            <input className="inputmargin" type="submit" value="Log in" />
          </form>
          <div className="margin">{message.message}</div>
        </div>
      )}
    </div>
  );
};
export default Login;
