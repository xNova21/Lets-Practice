import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import Navba from "./Navba";
const PrivateRoute = () => {
  let [info, setInfo] = useState({ message: "null" });
  let x;
  let [loading, setLoading] = useState({ loading: true });
  let verify = async () => {
    try {
      x = await axios.get(`${process.env.URL}/api/router/validateUser`, {
        headers: { token: window.localStorage.token },
      });
      setInfo(x.data);
      setLoading({ loading: false });
    } catch (error) {
      setInfo({ message: "Authentication error." });
      return setLoading({ loading: false });
    }
  };

  useEffect(() => {
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return loading.loading === true ? (
    <div>
      <Navba />
      <Loading />
    </div>
  ) : info.message !== "Authentication error." ? (
    <Outlet />
  ) : (
    <Navigate to={`/login/${info.message}`} />
  );
};
export default PrivateRoute;
