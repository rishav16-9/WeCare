import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import coachicon from "../../images/coach_icon.png";
import { useNavigate } from "react-router-dom";
const CoachLogin = () => {
  let navigate = useNavigate();
  const credential = { id: "", password: "" };
  const [formValues, setFormValues] = useState(credential);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formValues]);

  const validate = (values) => {
    const errors = {};
    if (!values.id || !values.password) {
      errors.common = "Invalid Credential";
    }
    return errors;
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));

    axios
      .post(
        `http://localhost:5000/coaches/login?coachId=${formValues.id}&password=${formValues.password}`
      )
      .then((res) => {
        localStorage.setItem("id", formValues.id);
        setIsSubmit(true);
        navigate("/coachhome/" + formValues.id);
      })
      .catch((e) => {
        console.log(e);
      });
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
                value={formValues.id}
              />
              <br />
              <input
                style={{ width: "100%" }}
                type="password"
                className="form-control"
                onChange={handleChange}
                placeholder="Password"
                name="password"
                value={formValues.password}
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
