import React from "react";
import coachicon from "../../images/coach_icon.png";

export default function UserHome() {
  return (
    <>
      <div className="container mt-5 text-white" style={{ width: "25rem" }}>
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
            <div className="text-left">
              <h4>Rose</h4>
              <h5>Coach Id:1</h5>
              <h6>Mobile Number:1234567890</h6>
              <h6>Speciality:Lorem ipsum</h6>
              <button className="btn btn-success">Book an Appointment</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
