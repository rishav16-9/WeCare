import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import coachicon from "../../images/coach_icon.png";
import validate from "./Validate";

const CoachSignup = () => {
  let navigate = useNavigate();

  const initialValue = {
    name: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    mobileNumber: "",
    speciality: "",
  };
  const [formData, setFormData] = useState(initialValue);
  const [formErrors, setFormErrors] = useState(initialValue);
  const [isSubmit, setIsSubmit] = useState(false);

  const [cId, setCId] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    var fieldValue;
    if (type === "radio") {
      fieldValue = value;
    } else {
      fieldValue = value;
    }
    setFormData({ ...formData, [name]: fieldValue });
    const error = validate(name, fieldValue);
    setFormErrors({ ...formErrors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormError = {};
    Object.keys(formData).forEach((fieldName) => {
      newFormError[fieldName] = validate(fieldName, formData[fieldName]);
    });
    setFormErrors(newFormError);
    if (Object.values(newFormError).some((error) => error)) {
      setIsSubmit(false);
      return;
    } else {
      const newCoach = formData;
      axios
        .post("http://localhost:5000/coaches", newCoach, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setIsSubmit(true);
          setCId(res.data.message);
          setFormData(initialValue);
          setFormErrors({});
        })
        .catch((e) => {
          setIsSubmit(false);
        });
    }
  };

  return (
    <>
      {isSubmit ? (
        <div className="d-flex justify-content-center">
          <div className="text-center bg-dark text-white w-50 my-5 p-4">
            <img src={coachicon} alt="coach" />
            <h2>You are a coach now </h2>
            <h4>Your Coach ID is {cId.coachId}</h4>
            <button
              className="btn btn-success"
              onClick={() => navigate("/coachlogin")}
            >
              Login Now
            </button>
          </div>
        </div>
      ) : (
        <div
          className="card bg-black text-white mx-auto my-4"
          style={{ width: "45rem" }}
        >
          <div className="card-body my-3">
            <div className="card-title text-center">
              <img src={coachicon} alt="Coach" className="mx-3" />
              <span style={{ fontSize: "25px" }}>Life Coach Profile</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {formErrors.name && (
                    <span className="text-danger">{formErrors.name}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {formErrors.password && (
                    <span className="text-danger">{formErrors.password}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="dateOfBirth" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="Date"
                    className="form-control"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                  {formErrors.dateOfBirth && (
                    <span className="text-danger">
                      {formErrors.dateOfBirth}
                    </span>
                  )}
                </div>
                <div className="col-md-6">
                  <p className="form-label">Gender</p>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="gender"
                      id="male"
                      value="M"
                      checked={formData.gender === "M"}
                      onChange={handleChange}
                    />
                    <label htmlFor="male" className="form-label">
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="gender"
                      id="female"
                      value="F"
                      checked={formData.gender === "F"}
                      onChange={handleChange}
                    />
                    <label htmlFor="female" className="form-label">
                      Female
                    </label>
                  </div>
                  {formErrors.gender && (
                    <span className="text-danger">{formErrors.gender}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="mobileNumber" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                  {formErrors.mobileNumber && (
                    <span className="text-danger">
                      {formErrors.mobileNumber}
                    </span>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="speciality" className="form-label">
                    Speaciality
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="speciality"
                    value={formData.speciality}
                    onChange={handleChange}
                  />
                  {formErrors.speciality && (
                    <span className="text-danger">{formErrors.speciality}</span>
                  )}
                </div>
                <div className="text-center d-grid col-6 mx-auto py-3">
                  <button className="btn btn-primary">Register</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CoachSignup;
