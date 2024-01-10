import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CoachSignup from "./components/Coach/CoachSignup";
import CoachLogin from "./components/Coach/CoachLogin";
import UserLogin from "./components/User/UserLogin";
import UserSignup from "./components/User/UserSignup";
import CoachHome from "./components/Coach/CoachHome";
import UserHome from "./components/User/UserHome";
import Footer from "./components/Footer";
import CoachProfile from "./components/Coach/CoachProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        {/* <Home /> */}
        <Routes>
          {/* <Route path = '/' element = {<Navbar />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="coachsignup" element={<CoachSignup />} />
          <Route path="coachlogin" element={<CoachLogin />} />
          <Route path="coachhome" element={<CoachHome />} />
          <Route path="coachprofile" element={<CoachProfile />} />
          <Route path="usersignup" element={<UserSignup />} />
          <Route path="userlogin" element={<UserLogin />} />
          <Route path="userhome" element={<UserHome />} />
          <Route />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};
export default App;
