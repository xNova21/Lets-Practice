import Navba from "./Navba";
import React, { useState } from "react";
import axios from "axios";
import begginer from "../images/begginer-level.png";
import low from "../images/low-level.png";
import intermediate from "../images/intermediate-level.png";
import hight from "../images/hight-level.png";
import native from "../images/native-level.png";
import star from "../images/star.png";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Search = () => {
  let navigate = useNavigate();
  let image;
  let [starImage] = useState({
    1: (
      <div>
        <img className="starIcon" alt="1" src={star} />
      </div>
    ),
    2: (
      <div>
        <img className="starIcon" alt="2" src={star} />
        <img className="starIcon" alt="" src={star} />
      </div>
    ),
    3: (
      <div>
        <img className="starIcon" alt="3" src={star} />
        <img className="starIcon" alt="" src={star} />
        <img className="starIcon" alt="" src={star} />
      </div>
    ),
    4: (
      <div>
        <img className="starIcon" alt="4" src={star} />
        <img className="starIcon" alt="" src={star} />
        <img className="starIcon" alt="" src={star} />
        <img className="starIcon" alt="" src={star} />
      </div>
    ),
    5: (
      <div>
        <img className="starIcon" alt="5" src={star} />
        <img className="starIcon" alt="" src={star} />
        <img className="starIcon" alt="" src={star} />
        <img className="starIcon" alt="" src={star} />
        <img className="starIcon" alt="" src={star} />
      </div>
    ),
  });
  let [message, setMessage] = useState({ message: "" });
  let [results, setResult] = useState({ exist: false });
  let [loading, setLoading] = useState({ loading: false });
  let [data, setData] = useState({
    languageSpoken: "",
    country: "",
    practice: "",
  });
  let user2 = (event) => {
    event.preventDefault();
    window.localStorage.user2 = event.target.name;
    navigate("/profile");
    console.log(event.target.name);
  };
  let again = (event) => {
    event.preventDefault();
    window.location.reload(false);
  };
  let handleChange = (event) => {
    event.preventDefault();
    setData({ ...data, [event.target.name]: event.target.value });
  };
  let search = async (event) => {
    event.preventDefault();
    setLoading({ loading: true });
    let result;
    try {
      result = await axios.post(
        "https://letspracticelanguage.herokuapp.com/api/router/user/form",
        data,
        { headers: { token: window.localStorage.token } }
      );
      setResult(result.data);
      setLoading({ loading: false });
    } catch (error) {
      setMessage({ message: "Server error." });
      setLoading({ loading: false });
    }
  };
  return (
    <div>
      <Navba />
      {loading.loading === true ? (
        <Loading />
      ) : message.message === "Server error." ? (
        <div className="margin"> {message.message}</div>
      ) : results.exist === false ? (
        <div className="margin">
          <h1>Search penpals</h1>
          <form onSubmit={search}>
            <table className="table">
              <tbody>
                <tr>
                  <th>Country</th>
                  <td>
                    <input name="country" onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <th>Language</th>
                  <td>
                    <select name="languageSpoken" onChange={handleChange}>
                      <option selected={true} value="">
                        Language
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
                  </td>
                </tr>
                <tr>
                  <th>Practicing language</th>
                  <td>
                    <select name="practice" onChange={handleChange}>
                      <option selected={true} value="">
                        Language
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
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <input type="submit" value="Search" />
            </div>
          </form>
        </div>
      ) : (
        <div>
          {results.length === 0 ? (
            <div className="d-flex-column2 ">
              {" "}
              No user match with this search{" "}
              <button onClick={again}>New search</button>
            </div>
          ) : (
            results.map((x) => {
              if (x._id !== window.localStorage.id) {
                return (
                  <div className={`d-flex-column ${x.profileImage}`}>
                    <div>
                      {" "}
                      <output name={x._id} onClick={user2} className="bold">
                        {x.username}
                        {x.valoration.valoratedBy.length !== 0
                          ? starImage[
                              Math.round(
                                x.valoration.value /
                                  x.valoration.valoratedBy.length
                              )
                            ]
                          : ""}
                      </output>
                    </div>
                    <div>
                      <label className="bold">Country: </label>
                      <span>{x.country}</span>
                    </div>
                    <div>
                      <label className="bold">Native language: </label>
                      <span>{x.languageSpoken}</span>
                    </div>

                    <div>
                      <label className="bold">Practiced language: </label>
                      <table className="table">
                        <tbody>
                          {x.practice ? (
                            Object.keys(x.practice).map((y) => {
                              if (x.practice[y] === "begginer") {
                                image = (
                                  <img
                                    className="levelIcon white"
                                    alt="begginer"
                                    src={begginer}
                                  />
                                );
                              } else if (x.practice[y] === "low") {
                                image = (
                                  <img
                                    className="levelIcon white"
                                    alt="low"
                                    src={low}
                                  />
                                );
                              } else if (x.practice[y] === "intermediate") {
                                image = (
                                  <img
                                    className="levelIcon white"
                                    alt="intermediate"
                                    src={intermediate}
                                  />
                                );
                              } else if (x.practice[y] === "hight") {
                                image = (
                                  <img
                                    className="levelIcon white"
                                    alt="hight"
                                    src={hight}
                                  />
                                );
                              } else if (x.practice[y] === "native") {
                                image = (
                                  <img
                                    className="levelIcon white"
                                    alt="native"
                                    src={native}
                                  />
                                );
                              }
                              return (
                                <tr>
                                  <td>
                                    {y}
                                    {image}
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <div></div>
                          )}
                        </tbody>{" "}
                      </table>
                    </div>
                    <div>
                      <label className="bold">About me: </label>
                      <p>{x.profileText}</p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="d-flex-column2 ">
                    <button onClick={again}>New search</button>
                  </div>
                );
              }
            })
          )}
        </div>
      )}
    </div>
  );
};
export default Search;
