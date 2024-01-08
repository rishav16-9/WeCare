import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../App.css/";
import { useNavigate } from "react-router-dom";
const CoachLogin = () => {
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
        .get(
          "http://localhost:5000/coaches/login?id=" + id + "&password=" + pwd
        )
        .then((res) => {
          if (res.data.length === 0) {
            setState(true);
          } else {
            navigate("/coachhome");
          }
        });
    }
  };
  return (
    <>
      <form onSubmit={handleLogin} className="formsk">
        <br />
        <h2>Login</h2>
        <br />
        <div className="form-group">
          <label>Coach Id:</label>
          <input
            type="text"
            style={{ width: "40%" }}
            className="form-control"
            onChange={hadleIdChange}
            placeholder="UserName"
          />
          <br />
          <br />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            style={{ width: "40%" }}
            onChange={hadlePassChange}
            className="form-control"
            placeholder="Password"
          />
          <br />
          <br />
        </div>
        <div className="text-danger">{message}</div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </>
  );
};
export default CoachLogin;
