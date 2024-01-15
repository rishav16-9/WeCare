import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import coachicon from "../../images/coach_icon.png";

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
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [cId, setCId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    const newCoach = formValues;
    axios
      .post("http://localhost:5000/coaches", newCoach, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setCId(res.data.message);
        setIsSubmit(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formValues]);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    }
    if (getAge(values.dateOfBirth) < 18 || getAge(values.dateOfBirth) > 100) {
      errors.dateOfBirth = "To register must be greater than 18";
    }
    if (!values.gender) {
      errors.gender = "Gender is required";
    }
    if (!values.mobileNumber) {
      errors.mobileNumber = "Mobile number is required";
    }
    if (!values.speciality) {
      errors.speciality = "Speciality is required";
    }
    return errors;
  };

  let getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  return (
    <>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="text-center bg-dark text-white my-5 p-4">
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
      ) : (
        <div
          className="card bg-black text-white mx-auto my-4"
          style={{ width: "45rem" }}
        >
          <div className="card-body my-3">
            <div className="card-title text-center">
              <img src={coachicon} alr="Coach" className="mx-3" />
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
                    value={formValues.name}
                    onChange={handleChange}
                  />
                  <p className="text-danger">{formErrors.name}</p>
                </div>
                <div className="col-md-6">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                  <p className="text-danger">{formErrors.password}</p>
                </div>
                <div className="col-md-6">
                  <label htmlFor="dateOfBirth" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="Date"
                    className="form-control"
                    name="dateOfBirth"
                    value={formValues.dateOfBirth}
                    onChange={handleChange}
                  />
                  <p className="text-danger">{formErrors.dateOfBirth}</p>
                </div>
                <div className="col-md-6">
                  <p htmlFor="gender" className="form-label">
                    Gender
                  </p>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="gender"
                      id="male"
                      value="M"
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
                      onChange={handleChange}
                    />
                    <label htmlFor="female" className="form-label">
                      Female
                    </label>
                  </div>
                  <p className="text-danger">{formErrors.gender}</p>
                </div>
                <div className="col-md-6">
                  <label htmlFor="mobileNumber" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="mobileNumber"
                    value={formValues.mobileNumber}
                    onChange={handleChange}
                  />
                  <p className="text-danger">{formErrors.mobileNumber}</p>
                </div>
                <div className="col-md-6">
                  <label htmlFor="speciality" className="form-label">
                    Speaciality
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="speciality"
                    value={formValues.speciality}
                    onChange={handleChange}
                  />
                  <p className="text-danger">{formErrors.mobileNumber}</p>
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
