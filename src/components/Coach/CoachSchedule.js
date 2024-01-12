import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const CoachSchedule = () => {
  let params = useParams();
  let success;
  useEffect(() => {
    axios
      .get(`http://localhost:5000/coaches/booking/${params.id}`)
      .then((res) => {
        if (res.status == 200) {
          success = true;
        } else {
          success = false;
        }
      });
  }, []);
  return (
    <>
      {success ? (
        <div
          className="container mt-5 text-white text-center"
          style={{ width: "22rem" }}
        >
          <div className="card bg-black">
            <div className="card-body">
              <h5>Appointment Date: 2020-9-24</h5>
              <h6>Slot: 10 AM - 11 AM</h6>
              <h6 className="pt-3">Booking Id: 1</h6>
              <h6>User Id: 1</h6>
            </div>
          </div>
        </div>
      ) : (
        <div className=" mt-5 text-center">No Appointment are Schedule</div>
      )}
    </>
  );
};

export default CoachSchedule;
