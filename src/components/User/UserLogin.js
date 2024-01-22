import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import usericon from "../../images/user_icon.png";
import validate from "./validateuser";

const UserLogin = () => {
  let navigate = useNavigate();
  const credential = { id: "", password: "" };
  const [formData, setFormData] = useState(credential);
  const [formError, setFormError] = useState(credential);
  const [isSubmit, setIsSubmit] = useState(false);
  const hadleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const error = validate(name, value);
    setFormError({ ...formError, [name]: error });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    var newFormError = {};
    Object.keys(formData).forEach((fieldName) => {
      newFormError[fieldName] = validate(fieldName, formData[fieldName]);
    });
    setFormError(newFormError);
    if (Object.values(formData).some((error) => error)) {
      setIsSubmit(false);
      return;
    } else {
      axios
        .post(
          `http://localhost:5000/users/login?userId=${formData.id}&password=${formData.password}`
        )
        .then((res) => {
          localStorage.setItem("id", formData.id);
          setIsSubmit(true);
          if (isSubmit && res.status === 200) {
            navigate("/userhome/" + formData.id);
            setFormData(credential);
            setFormError({});
          }
        })
        .catch((error) => {
          setIsSubmit(false);
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
                name="id"
                onChange={hadleChange}
                placeholder="User Id"
                value={formData.id}
              />
              {formError.id && (
                <span className="text-danger">{formError.id}</span>
              )}
              <br />
              <input
                style={{ width: "100%" }}
                type="password"
                className="form-control"
                onChange={hadleChange}
                name="password"
                placeholder="Password"
                value={formData.password}
              />
              {formError.password && (
                <span className="text-danger">{formError.password}</span>
              )}
              <br />
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
