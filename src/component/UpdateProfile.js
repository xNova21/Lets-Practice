import Navba from "./Navba";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const UpdateProfile = () => {
  let navigate = useNavigate();
  let [message, setMessage] = useState({ message: "" });
  let [loading, setLoading] = useState({ loading: true });
  let newLanguage = { language: "", level: "" };
  let [data, setData] = useState({
    country: "",
    practice: {},
    textProfile: "",
    profileImage: "",
  });
  let handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  let handleLevel = (event) => {
    event.preventDefault();
    data.practice[event.target.name] = event.target.value;
  };

  let handleNewLanguage = (event) => {
    newLanguage[event.target.name] = event.target.value;
  };
  let addNewLanguage = (event) => {
    event.preventDefault();
    if (
      newLanguage.language !== "" &&
      newLanguage.level !== "" &&
      data.practice
    ) {
      setLoading({ loading: true });
      data.practice[newLanguage.language] = newLanguage.level;
      setLoading({ loading: false });
    } else if (
      newLanguage.language !== "" &&
      newLanguage.level !== "" &&
      !data.practice
    ) {
      setLoading({ loading: true });
      setData({
        ...data,
        practice: { [newLanguage.language]: newLanguage.level },
      });
      setLoading({ loading: false });
    }
  };
  async function getProfile() {
    let getdata;
    try {
      getdata = await axios.get(
        "https://letspracticelanguage.herokuapp.com/api/router/home/profile",
        { headers: { token: window.localStorage.token } }
      );
      setData(getdata.data);
      setLoading({ loading: false });
    } catch (error) {
      setMessage({ message: "Server error." });
      return setLoading({ loading: false });
    }
  }
  async function deleteLanguage(event) {
    event.preventDefault();
    delete data.practice[event.target.value];
    setLoading({ loading: false });
  }
  async function updateProfile() {
    setLoading({ loading: true });
    try {
      await axios.post(
        "https://letspracticelanguage.herokuapp.com/api/router/updateProfile",
        data,
        {
          headers: { token: window.localStorage.token },
        }
      );
    } catch (error) {
      setMessage({ message: "Server error." });
      setLoading({ loading: false });
    }
    setMessage({ message: "Updated" });
    setLoading({ loading: false });
    navigate("/selfProfile");
  }
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <Navba loged={true} />
      {loading.loading === true ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className={`  d-flex-column ${data.profileImage}`}>
          <form onSubmit={updateProfile}>
            <table className="tabla">
              <tbody>
                <tr>
                  <td>Username</td>
                  <td>{data.username}</td>
                </tr>
                <tr>
                  <td>Country:</td>
                  <td>
                    <input
                      name="country"
                      onChange={handleChange}
                      value={data.country}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Practicing languages</td>
                  {data.practice ? (
                    Object.keys(data.practice).map((x) => {
                      return (
                        <tr>
                          <td>
                            {x}
                            {"  "}
                            {data.practice[x]}
                            {" to "}
                          </td>
                          <td>
                            <select
                              onChange={handleLevel}
                              name={x}
                              value={data.practice.x}
                            >
                              <option selected={true} disabled={true}>
                                Select other level
                              </option>
                              <option value="begginer">Begginer</option>
                              <option value="low">Low</option>
                              <option value="intermediate">Intermediate</option>
                              <option value="hight">Hight</option>
                              <option value="native">Native</option>
                            </select>
                          </td>
                          <td>
                            <button onClick={deleteLanguage} value={x}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div></div>
                  )}
                </tr>
                <tr>
                  <td>
                    <select name="language" onChange={handleNewLanguage}>
                      <option value="" selected={true} disabled={true}>
                        Lang
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

                    <select name="level" onChange={handleNewLanguage}>
                      <option value="" selected={true} disabled={true}>
                        {" "}
                        Level
                      </option>
                      <option value="begginer">Begginer</option>
                      <option value="low">Low</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="hight">Hight</option>
                      <option value="native">Native</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={addNewLanguage}>Add language</button>
                  </td>
                </tr>
                <tr>
                  <td>Background</td>
                  <td>
                    <select
                      name="profileImage"
                      value={data.profileImage}
                      onChange={handleChange}
                    >
                      <option value="">Background</option>
                      <option value="banana">banana</option>
                      <option value="boreal">boreal</option>
                      <option value="car">car</option>
                      <option value="cloudy-forest">cloudy-forest</option>
                      <option value="colourful-waves">colourful-waves</option>
                      <option value="desk">Desk</option>
                      <option value="donuts">Donuts</option>
                      <option value="forest">Forest</option>
                      <option value="inside-car">Inside car</option>
                      <option value="leafs">Leafs</option>
                      <option value="motorbike">Motorbike</option>
                      <option value="night-city">Night city</option>
                      <option value="sand">Sand</option>
                      <option value="sky-building">Sky building</option>
                      <option value="stars">Stars</option>
                      <option value="train">Train</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <label>About me:</label>
            </div>
            <div>
              <textarea
                rows="4"
                cols="40"
                name="profileText"
                onChange={handleChange}
                value={data.profileText}
              ></textarea>
            </div>
            <div>
              <input type="submit" value="Update" />
            </div>
          </form>
        </div>
      )}
      <div className="margin">{message.message}</div>
    </div>
  );
};
export default UpdateProfile;
