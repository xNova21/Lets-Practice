import Navba from "./Navba";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Loading from "./Loading";
import backArrow from "../images/back-arrow.png";

const Conversation = () => {
  let [message, setMessage] = useState({ message: "" });
  let [loading, setLoading] = useState({ loading: true });
  let [results, setresults] = useState({
    data: [],
  });
  async function getConversation() {
    let url = `http://localhost:5000/api/router/user/${window.localStorage.user2}`;
    let info;
    try {
      info = await axios.get(url, {
        headers: { token: window.localStorage.token },
      });
    } catch (error) {
      setLoading({ loading: false });
      return setMessage({ message: "Server error." });
    }
    if (info.data.message !== "Can´t connect with database.") {
      setresults({ data: info.data.messages });
      setLoading({ loading: false });
      window.localStorage.converId = info.data.id;
    } else {
      setLoading({ loading: false });
      return setMessage({ message: "Can´t connect with database." });
    }
  }
  useEffect(() => {
    getConversation();
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
                <th>
                  <Link to="/profile">
                    <button>See profile</button>
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {message.message === "" ? (
                results.data.map((result) => {
                  return (
                    <tr
                      key={result._id}
                      className={
                        result.sentBy === window.localStorage.user2
                          ? "otherColor"
                          : "meColor"
                      }
                    >
                      <td>
                        <p>
                          {result.sentBy === window.localStorage.user2
                            ? window.localStorage.username2
                            : "Me"}
                        </p>
                        <p>{result.body}</p>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>{message.message}</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="d-flex-column2">
            <Link to="/newMessage">
              <button className="inputmargin buttonWith">New</button>
            </Link>
            <Link to="/deleteConver">
              <button className="inputmargin buttonWith">
                Delete
              </button>
            </Link>
            <Link to="/home">
              <button className="inputmargin buttonWith"><img className="arrow" alt="return" src={backArrow}/></button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default Conversation;
