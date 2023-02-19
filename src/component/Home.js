import axios from "axios";
import React, { useEffect, useState } from "react";
import Navba from "./Navba";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Home = () => {
  let navigate = useNavigate();
  window.localStorage.user2 = "";
  window.localStorage.username2 = "";
  window.localStorage.converId = "";
  let [message, setMessage] = useState({ message: "" });
  let [loading, setLoading] = useState({ loading: true });
  let [results, setresults] = useState({
    data: [],
  });
  async function getHome() {
    let url = "${process.env.URL}/api/router/home";
    let info;
    try {
      info = await axios.get(url, {
        headers: { token: window.localStorage.token },
      });
      if (info.data.message === "Authentication error.") {
        setLoading({ loading: false });
        setMessage({ message: info.data.message });
        setTimeout(() => {
          navigate("/logIn");
        }, 1000);
      }
    } catch (error) {
      setLoading({ loading: false });
      return setMessage({ message: "Server error" });
    }
    if (info.data.message !== "Can´t connect with database.") {
      setresults({ data: info.data });
      setLoading({ loading: false });
    } else {
      setLoading({ loading: false });
      return setMessage({ message: "Can´t connect with database." });
    }
  }
  useEffect(() => {
    getHome();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Navba loged={true} />
      {loading.loading === true ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="margin">
          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {message.message === "" ? (
                results.data.length === 0 ? (
                  <tr>
                    <td>You don´t have more conversations</td>
                  </tr>
                ) : (
                  results.data.map((result) => {
                    const getId = () => {
                      window.localStorage.user2 = result._id;
                      window.localStorage.username2 = result.username;
                    };
                    return (
                      <tr key={result._id}>
                        <td>
                          <Link onClick={getId} to="/conversation">
                            {result.username}
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )
              ) : (
                <tr>
                  <td>{message.message}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default Home;
