import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import usericon from "../../images/user_icon.png";

const UserLogin = () => {
  let navigate = useNavigate();
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [message, setMessage] = useState("");
  const [idflag, setIdFlag] = useState(false);
  const [passflag, setPassFlag] = useState(false);
  const [state, setState] = useState(false);

  const hadleIdChange = (e) => {
    setId(e.target.value);
  };
  const hadlePassChange = (e) => {
    setPwd(e.target.value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setState(false);
    if (id.length === 0) {
      setIdFlag(true);
    } else if (pwd.length < 5 || pwd.length > 10) {
      setPassFlag(true);
    } else {
      axios
        .get("http://localhost:4000/users?id=" + id + "&password" + pwd)
        .then((res) => {
          if (res.data.length === 0) {
            setState(true);
          } else {
            navigate("/userhome");
          }
        });
    }
  };
  return (
    <>
      <div className="container mt-3">
        <div className="h-100 d-flex align-items-center justify-content-center">
          <div className="bg-black text-white p-4" style={{ width: "30rem" }}>
            <img src={usericon} alt="User" className="px-3" />
            <span style={{ fontSize: "25px" }}>Login As User</span>
            <form onSubmit={handleLogin} className="pt-2">
              <input
                style={{ width: "100%" }}
                type="text"
                className="form-control"
                onChange={hadleIdChange}
                placeholder="User Id"
              />
              <br />
              <input
                style={{ width: "100%" }}
                type="password"
                className="form-control"
                onChange={hadlePassChange}
                placeholder="Password"
              />
              <br />
              <span className="text-danger">{message}</span>
            </form>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
