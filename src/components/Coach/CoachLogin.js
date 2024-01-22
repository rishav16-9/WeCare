import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import coachicon from "../../images/coach_icon.png";
import { useNavigate } from "react-router-dom";
import validate from "./Validate";

const CoachLogin = () => {
  let navigate = useNavigate();
  const credential = { id: "", password: "" };
  const [formData, setFormData] = useState(credential);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    var fieldValue;
    const { name, value } = e.target;
    fieldValue = value;
    setFormData({ ...formData, [name]: fieldValue });
    const error = validate(name, fieldValue);
    setFormErrors({ ...formErrors, [name]: error });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newFormError = {};
    Object.keys(formData).forEach((fieldName) => {
      newFormError[fieldName] = validate(fieldName, formData[fieldName]);
    });
    setFormErrors(newFormError);
    if (Object.values(newFormError).some((error) => error)) {
    } else {
      axios
        .post(
          `http://localhost:5000/coaches/login?coachId=${formData.id}&password=${formData.password}`
        )
        .then((res) => {
          localStorage.setItem("id", formData.id);
          setIsSubmit(true);
          if (isSubmit && res.status === 200) {
            navigate("/coachhome/" + formData.id);
            setFormData(credential);
            setFormErrors({});
          }
        })
        .catch((e) => {
          setIsSubmit(false);
        });
    }
  };
  return (
    <>
      <div className="container mt-3">
        <div className="h-100 d-flex align-items-center justify-content-center">
          <div className="bg-black text-white p-4" style={{ width: "30rem" }}>
            <img src={coachicon} alt="User" className="px-3" />
            <span style={{ fontSize: "25px" }}>Login As Coach</span>
            <form onSubmit={handleLogin} className="pt-2">
              <input
                style={{ width: "100%" }}
                type="text"
                className="form-control"
                onChange={handleChange}
                placeholder="Coach Id"
                name="id"
                value={formData.id}
              />
              <br />
              <input
                style={{ width: "100%" }}
                type="password"
                className="form-control"
                onChange={handleChange}
                placeholder="Password"
                name="password"
                value={formData.password}
              />
              <span className="text-danger">{formErrors.common}</span>
              <div className="d-flex justify-content-center mt-2">
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
export default CoachLogin;
