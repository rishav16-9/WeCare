import React, { useEffect, useState } from "react";
import usericon from "../../images/user_icon.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UserProfile = () => {
  const [userDetail, setUserDetail] = useState({});
  let navigate = useNavigate();
  let param = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${param.id}`)
      .then((res) => {
        setUserDetail(res.data.message);
        console.log(userDetail);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param]);

  return (
    <div>
      <>
        <div className="container mt-5 text-white " style={{ width: "25rem" }}>
          <div className="card bg-black">
            <div
              className="card-body d-flex justify-content-between"
              style={{ gap: "2.25rem" }}
            >
              <div>
                <img
                  src={usericon}
                  className="bg-danger rounded-circle mt-2"
                  alt="coach"
                  style={{ height: "100px", width: "100px" }}
                />
              </div>
              <div>
                <h4>{userDetail.name}</h4>
                <h6>Date of Birth: {userDetail.dateOfBirth}</h6>
                <h6>Email id: {userDetail.email}</h6>
                <h6>Mobile Number: {userDetail.mobileNumber}</h6>
                <h6>
                  Address:{" "}
                  {`${userDetail.city}, ${userDetail.state}, ${userDetail.country}`}
                </h6>
                <h6>Pincode: {userDetail.pinCode}</h6>
                <button
                  onClick={() => navigate(-1)}
                  className="btn btn-success"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default UserProfile;
