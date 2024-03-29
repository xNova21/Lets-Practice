import Navba from "./Navba";
import React, { useEffect, useState } from "react";
import axios from "axios";
import begginer from "../images/begginer-level.png";
import low from "../images/low-level.png";
import intermediate from "../images/intermediate-level.png";
import hight from "../images/hight-level.png";
import native from "../images/native-level.png";
import star from "../images/star.png";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const SelfProfile = () => {
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
  let image;
  let [loading, setLoading] = useState({ loading: true });
  let [data, setData] = useState({});
  async function getProfile() {
    let getdata;
    try {
      getdata = await axios.get(`${process.env.URL}/api/router/home/profile`, {
        headers: { token: window.localStorage.token },
      });
      setData(getdata.data);
      console.log(getdata);
      setLoading({ loading: false });
    } catch (error) {
      setMessage({ message: "Server error." });
      return setLoading({ loading: false });
    }
  }
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      <Navba />
      {loading.loading === true ? (
        <div>
          <Loading />
        </div>
      ) : message.message.includes(" error") === true ? (
        <div className="margin">{message.message}</div>
      ) : (
        <div className={`d-flex-column ${data.profileImage}`}>
          <div>
            <span className="bold">
              {data.username}
              {data.valoration.valoratedBy.length !== 0
                ? starImage[
                    Math.round(
                      data.valoration.value / data.valoration.valoratedBy.length
                    )
                  ]
                : ""}
            </span>
          </div>
          <div>
            <label className="bold">Country: </label>
            <span>{data.country}</span>
          </div>
          <div>
            <label className="bold">Native language: </label>
            <span>{data.languageSpoken}</span>
          </div>
          <div>
            <label className="bold">Practiced language: </label>
            <table className="table">
              <tbody>
                {data.practice ? (
                  Object.keys(data.practice).map((x) => {
                    if (data.practice[x] === "begginer") {
                      image = (
                        <img
                          className="levelIcon white"
                          alt="begginer"
                          src={begginer}
                        />
                      );
                    } else if (data.practice[x] === "low") {
                      image = (
                        <img className="levelIcon white" alt="low" src={low} />
                      );
                    } else if (data.practice[x] === "intermediate") {
                      image = (
                        <img
                          className="levelIcon white"
                          alt="intermediate"
                          src={intermediate}
                        />
                      );
                    } else if (data.practice[x] === "hight") {
                      image = (
                        <img
                          className="levelIcon white"
                          alt="hight"
                          src={hight}
                        />
                      );
                    } else if (data.practice[x] === "native") {
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
                          {x}
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
            <p>{data.profileText}</p>
          </div>
          <Link to="/update">
            <button>Update</button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default SelfProfile;
