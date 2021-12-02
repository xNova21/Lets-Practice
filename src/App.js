// import logo from './logo.svg';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Cover from "./component/Cover";
import SignUp from "./component/SignUp";
import Home from "./component/Home";
import Conversation from "./component/Conversation";
import NewMessage from "./component/NewMessage";
import SelfProfile from "./component/SelfProfile";
import PrivateRoute from "./component/PrivateRoute";
import DeleteConver from "./component/DeleteConver";
import UpdateProfile from "./component/UpdateProfile";
import Search from "./component/Search";
import Profile from "./component/Profile";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Cover />} />
        <Route path="/logIn" element={<Login />}>
          <Route path=":message" element={<Login />} />
          <Route path=":/" element={<Login />} />
        </Route>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/newMessage" element={<NewMessage />} />
          <Route path="/selfProfile" element={<SelfProfile />} />
          <Route path="/deleteConver" element={<DeleteConver />} />
          <Route path="/update" element={<UpdateProfile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
