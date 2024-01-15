import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import { Logout } from "@mui/icons-material";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";

const Navbar = () => {
  let navigate = useNavigate();
  const id = localStorage.getItem("id");
  const handleLogout = () => {
    localStorage.removeItem("id");
    navigate("/coachlogin");
  };
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
            {id?.match(/^([a-zA-Z]+)-/)?.[1] === "CI" ? (
              <div>
                <Link className="navbar-brand text-white" to="/CoachProfile">
                  <AccountBoxOutlinedIcon fontSize="small" />
                  View Profile
                </Link>
              </div>
            ) : id?.match(/^([a-zA-Z]+)-/)?.[1] === "UI" ? (
              <Link className="navbar-brand text-white" to="/CoachProfile">
                <AccountBoxOutlinedIcon fontSize="small" />
                View Profile
              </Link>
            ) : null}
            {id?.match(/^([a-zA-Z]+)-/)?.[1] === "CI" ? (
              <Link className="navbar-brand text-white" to="/myschedule">
                <div>
                  <TodayOutlinedIcon fontSize="small" />
                  My Schedule
                </div>
              </Link>
            ) : id?.match(/^([a-zA-Z]+)-/)?.[1] === "UI" ? (
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
            {id?.match(/^([a-zA-Z]+)-/)?.[1] === "UI" ||
            id?.match(/^([a-zA-Z]+)-/)?.[1] === "CI" ? (
              <div role="button" className="text-white" onClick={handleLogout}>
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
