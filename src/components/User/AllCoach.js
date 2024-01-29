import React from "react";
import coachicon from "../../images/coach_icon.png";

const AllCoach = ({ coach, setAppointment }) => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      {coach.map((item) => (
        <div
          key={item._id}
          className="card bg-black card-body m-2"
          style={{ width: "21rem" }}
        >
          <div className="d-flex" style={{ gap: "2.25rem" }}>
            <div>
              <img
                src={coachicon}
                className="bg-danger rounded-circle mt-2"
                alt="coach"
                style={{ height: "100px", width: "100px" }}
              />
            </div>
            <div className="text-left">
              <h4>{item.name}</h4>
              <h5>Coach Id: {item.coachId}</h5>
              <h6>Mobile Number: {item.mobileNumber}</h6>
              <h6>Speciality: {item.speciality}</h6>
              <button
                className="btn btn-success"
                onClick={() => {
                  setAppointment(item);
                }}
              >
                Book an Appointment
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllCoach;
