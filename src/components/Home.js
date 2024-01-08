import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import usericon from "../images/user_icon.png";
import coachicon from "../images/coach_icon.png";

const Home = () => {
  let navigate = useNavigate();

  let coachsignup = () => {
    navigate("/coachsignup");
  };

  let coachlogin = () => {
    navigate("/coachlogin");
  };

  let usersignup = () => {
    navigate("/usersignup");
  };

  let userlogin = () => {
    navigate("/userlogin");
  };

  return (
    <>
      <div className="text-center">
        <h1 className="mt-3">We Are At The Heart of Appropriate Care</h1>

        <div className="container px-4 mt-3">
          <div className="row gx-5">
            <div className="col">
              <div className="p-3 border bg-light">
                <img src={coachicon} alt="coach" />
                <div>
                  <button className="btn btn-primary" onClick={coachlogin}>
                    Login as a coach
                  </button>
                  <br />
                  <br />
                  <button
                    className="btn btn-primary"
                    onClick={coachsignup}
                    type="submit"
                  >
                    Signup as a coach
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="p-3 border bg-light">
                <img src={usericon} alt="user" />
                <div>
                  <button className="btn btn-primary" onClick={userlogin}>
                    Login as a user
                  </button>
                  <br />
                  <br />
                  <button className="btn btn-primary" onClick={usersignup}>
                    Signup as a user
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
