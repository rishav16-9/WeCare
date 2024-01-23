import React, { useEffect, useState } from "react";
import coachicon from "../../images/coach_icon.png";
import axios from "axios";
import { useParams } from "react-router-dom";

const CoachProfile = () => {
  const [coachDetail, setCoachDetail] = useState({});
  let param = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/coaches/${param.id}`)
      .then((res) => {
        setCoachDetail(res.data.coach);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [param]);

  return (
    <>
      <div
        className="container mt-5 text-white text-center"
        style={{ width: "25rem" }}
      >
        <div className="card bg-black">
          <div className="card-body d-flex justify-content-between">
            <div
            //   className="bg-danger rounded-circle"
            //   style={{ height: "50px", width: "50px" }}
            >
              <img
                src={coachicon}
                className="bg-danger rounded-circle mt-2"
                alt="coach"
                style={{ height: "100px", width: "100px" }}
              />
            </div>
            <div>
              <h4>Coach Id: {coachDetail.coachId}</h4>
              <h6>Date of birth: {coachDetail.dateOfBirth}</h6>
              <h6>mobile number: {coachDetail.mobileNumber}</h6>
              <h6>Speciality: {coachDetail.speciality}</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachProfile;
