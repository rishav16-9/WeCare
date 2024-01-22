import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import usericon from "../../images/user_icon.png";
import validate from "./validateuser";

const UserSignup = () => {
  let navigate = useNavigate();
  const initialValue = {
    name: "",
    password: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    gender: "",
    pinCode: "",
    city: "",
    state: "",
    country: "",
  };
  const [formData, setFormData] = useState(initialValue);
  const [formError, setFormError] = useState(initialValue);
  const [id, setId] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    var fieldValue;
    if (type === "radio") {
      fieldValue = value;
    } else {
      fieldValue = value;
    }
    setFormData({ ...formData, [name]: fieldValue });
    const error = validate(name, fieldValue);
    setFormError({ ...formError, [name]: error });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newFormError = {};
    Object.keys(formData).forEach((fieldName) => {
      newFormError[fieldName] = validate(fieldName, formData[fieldName]);
    });
    setFormError(newFormError);
    if (Object.values(newFormError).some((error) => error)) {
      setIsSubmit(false);
      return;
    } else {
      const newUser = formData;
      axios
        .post("http://localhost:5000/users", newUser, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setId(res.data.message);
          setIsSubmit(true);
          setFormData(initialValue);
          setFormError({});
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
          <div className="text-center my-5 bg-dark text-white p-4">
            <img src={usericon} alt="user" />
            <h2>Account created successfully</h2>
            <h4>Your User ID is {id.userId}</h4>
            <button
              className="btn btn-success"
              onClick={() => navigate("/userlogin")}
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
              <img src={usericon} alt="User" className="mx-3" />
              <span style={{ fontSize: "25px" }}>User Profile</span>
            </div>
            <form onSubmit={handleRegister}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                  />
                  {formError?.name && (
                    <span className="text-danger">{formError.name}</span>
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
                  {formError?.password && (
                    <span className="text-danger">{formError.password}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="mobilenumber" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                  {formError?.mobileNumber && (
                    <span className="text-danger">
                      {formError.mobileNumber}
                    </span>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {formError?.email && (
                    <span className="text-danger">{formError.email}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="date" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="Date"
                    className="form-control"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                  {formError?.dateOfBirth && (
                    <span className="text-danger">{formError.dateOfBirth}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <p className="form-label">Gender</p>
                  <div>
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
                  </div>
                  {formError?.gender && (
                    <span className="text-danger">{formError.gender}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="pincode" className="form-label">
                    Pincode
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                  />
                  {formError?.pinCode && (
                    <span className="text-danger">{formError.pinCode}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {formError?.city && (
                    <span className="text-danger">{formError.city}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                  {formError?.state && (
                    <span className="text-danger">{formError.state}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                  {formError?.country && (
                    <span className="text-danger">{formError.country}</span>
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

export default UserSignup;
