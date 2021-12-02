import Navba from "./Navba";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const DeleteConver = () => {
  let navigate = useNavigate();
  let [loading, setLoading] = useState({ loading: false });
  let [message, setMessage] = useState({ message: "" });
  let x;
  async function deleteC() {
    setLoading({ loading: true });
    try {
      x = await axios.delete(
        `http://localhost:5000/api/router/delete/${window.localStorage.converId}`,
        { headers: { token: window.localStorage.token } }
      );
      setMessage({ message: x.data.message });
      setLoading({ loading: false });
      if (x.data.message === "Conversation deleted.") {
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
      console.log(x.data.message);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Navba />
      {loading.loading === true ? (
        <Loading />
      ) : message.message === "Conversation deleted." ? (
        <div className="margin ">{message.message}</div>
      ) : (
        <div className="margin ">
          <p>
            Are you sure? You won´t be able to send or recieve more messages
            from this user.
          </p>
          <button className="margin buttonWith" onClick={deleteC}>
            Yes
          </button>
          <Link to="/conversation">
            <button className="margin buttonWith">No</button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default DeleteConver;
