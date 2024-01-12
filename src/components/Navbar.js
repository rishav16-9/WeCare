import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import { Logout } from "@mui/icons-material";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(false);
  const [coach, setCoach] = useState(false);
  const [data, setData] = useState("");
  useEffect(() => {
    setData(localStorage.getItem("id"));
    if (data === null) {
      setCoach(false);
      setUser(false);
    } else if (data.match(/^([a-zA-Z]+)-/)?.[1] === "CI") {
      setCoach(true);
      setUser(false);
      console.log(coach);
    } else if (data.match(/^([a-zA-Z]+)-/)?.[1] === "UI") {
      setCoach(false);
      setUser(true);
    } else {
      setCoach(false);
      setUser(false);
    }
  }, [data]);

  return (
    <>
      {/* <nav className="navbar navbar-expand-lg bg-black text-white">
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="#">WeCare</a>
                <span><PhoneIcon fontSize='small'/> Call Us: 080 2233447</span>
            </div>
        </nav> */}
      <nav>
        <div className="d-flex justify-content-between bg-black text-white p-2">
          <div>
            <Link className="navbar-brand text-white" to="/">
              WeCare
            </Link>
          </div>
          <div className="d-flex" style={{ gap: "15px" }}>
            {coach === true ? (
              <div>
                <Link className="navbar-brand text-white" to="/CoachProfile">
                  <AccountBoxOutlinedIcon fontSize="small" />
                  View Profile
                </Link>
              </div>
            ) : user === true ? (
              <Link className="navbar-brand text-white" to="/CoachProfile">
                <AccountBoxOutlinedIcon fontSize="small" />
                View Profile
              </Link>
            ) : null}
            {coach === true ? (
              <Link className="navbar-brand text-white" to="/myschedule">
                <div>
                  <TodayOutlinedIcon fontSize="small" />
                  My Schedule
                </div>
              </Link>
            ) : user === true ? (
              <Link className="navbar-brand text-white" to="/myappointment">
                <div>
                  <AccountBoxOutlinedIcon fontSize="small" />
                  My Appointments
                </div>
              </Link>
            ) : null}
            <div>
              <PhoneIcon fontSize="small" />
              Call Us: 080 2233447
            </div>
            {user === true || coach === true ? (
              <div>
                <Logout fontSize="small" />
                Logout
              </div>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
