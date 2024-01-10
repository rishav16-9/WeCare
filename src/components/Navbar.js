import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import { Logout } from "@mui/icons-material";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
const Navbar = () => {
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
            <div>
              <Link className="navbar-brand text-white" to="/CoachProfile">
                <AccountBoxOutlinedIcon fontSize="small" />
                View Profile
              </Link>
            </div>
            <Link className="navbar-brand text-white" to="/myschedule">
              <div>
                <TodayOutlinedIcon fontSize="small" />
                My Schedule
              </div>
            </Link>
            <div>
              <PhoneIcon fontSize="small" />
              Call Us: 080 2233447
            </div>
            <div>
              <Logout fontSize="small" />
              Logout
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
