import React from "react";
import coachicon from "../../images/coach_icon.png";

const CoachProfile = () => {
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
              <h4>Coach Id:1</h4>
              <h6>Date of birth:1/1/1996</h6>
              <h6>mobile number:1234567890</h6>
              <h6>Speciality:Lorem ipsum</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachProfile;
