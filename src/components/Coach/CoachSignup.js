import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import coachicon from "../../images/coach_icon.png";

const CoachSignup = () => {
  let navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    password: "",
    mobileNumber: "",
    dateOfBirth: "",
    speciality: "",
  });
  const [id, setId] = useState("");

  const [state, setState] = useState({
    nameFlag: false,
    passFlag: false,
    mobileFlag: false,
    specFlag: false,
    ageFlag: false,
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // const handleChangeSpec = (e) => {
  //     const value = e.target.value
  // }

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

  let handleRegister = (e) => {
    e.preventDefault();
    setState(false);
    var age = getAge(inputs.dateOfBirth);
    if (inputs.name.length < 3 || inputs.name.length > 50) {
      setState((val) => ({ ...val, nameFlag: true }));
    } else if (inputs.password.length < 5 || inputs.password.length > 10) {
      setState((val) => ({ ...val, passFlag: true }));
    } else if (inputs.mobileNumber.length !== 10) {
      setState((val) => ({ ...val, mobileFlag: true }));
    } else if (inputs.speciality.length < 10 || inputs.speciality.length > 50) {
      setState((val) => ({ ...val, specFlag: true }));
    } else if (age < 20 || age > 100) {
      setState((val) => ({ ...val, ageFlag: true }));
    } else {
      const newCoach = inputs;
      axios
        .post("http://localhost:5000/coaches", newCoach, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setSuccess(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <>
      {/* <h1>Coach Signup</h1> */}
      {success ? (
        <div className="text-center my-5">
          <img src={coachicon} alt="coach" />
          <h2>You are a coach now</h2>
          <h4>Your Coach ID is {id}</h4>
          <button onClick={() => navigate("/coachlogin")}>Login Now</button>
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
            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={inputs.name}
                    onChange={handleChange}
                  />
                  {state.nameFlag ? (
                    <span>Name should be have 3 to 50 character</span>
                  ) : null}
                </div>

                <div className="col-md-6">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                  />
                  {state.passFlag ? (
                    <span>Password should be have 5 to 10 character</span>
                  ) : null}
                </div>

                <div className="col-md-6">
                  <label htmlFor="date" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="Date"
                    className="form-control"
                    name="dateOfBirth"
                    value={inputs.dateOfBirth}
                    onChange={handleChange}
                  />
                  {state.ageFlag ? (
                    <span>Age should be have 20 to 100 character</span>
                  ) : null}
                </div>

                <div className="col-md-6">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <div onChange={handleChange}>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="gender"
                        id="male"
                        value="M"
                        required
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
                        required
                      />
                      <label htmlFor="female" className="form-label">
                        Female
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="mobilenumber" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="mobileNumber"
                    value={inputs.mobileNumber}
                    onChange={handleChange}
                  />

                  {state.mobileFlag ? (
                    <span>Mobile Number should have 10 digit</span>
                  ) : null}
                </div>

                <div className="col-md-6">
                  <label htmlFor="speciality" className="form-label">
                    Speaciality
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="speciality"
                    value={inputs.speciality}
                    onChange={handleChange}
                  />

                  {state.specFlag ? (
                    <span>speciality should be have 10 to 50 character</span>
                  ) : null}
                </div>

                <div className="text-center d-grid col-6 mx-auto py-3">
                  <button onClick={handleRegister} className="btn btn-primary">
                    Register
                  </button>
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
