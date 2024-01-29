import React, { useState } from "react";
import validate from "./validateuser";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookAppointment = ({
  innerRef,
  handleCloseModal,
  showModal,
  selectedCoach,
}) => {
  let param = useParams();
  const timingSlotRadio = {
    options: [
      { time: "9AM-10AM" },
      { time: "10AM-11AM" },
      { time: "11AM-12PM" },
      { time: "12PM-1PM" },
      { time: "1PM-2PM" },
      { time: "2PM-3PM" },
    ],
  };
  const initialVal = {
    appointmentDate: "",
    slot: "",
  };
  const [formData, setFormData] = useState(initialVal);
  const [formErrors, setFormErrors] = useState(initialVal);
  const [isValidate, setIsValidate] = useState(false);
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const error = validate(name, value);
    setFormErrors({ ...formErrors, [name]: error });
  };
  const bookAppointment = (e) => {
    e.preventDefault();
    const newFormError = {};
    Object.keys(formData).forEach((fieldName) => {
      newFormError[fieldName] = validate(fieldName, formData[fieldName]);
    });
    setFormErrors(newFormError);
    if (Object.values(newFormError).some((error) => error)) {
      setIsValidate(false);
      return;
    } else {
      const appointmentDetail = formData;
      axios.post(
        `http://localhost:5000/users/booking/${param.id}/${selectedCoach.coachId}`,
        appointmentDetail,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={innerRef}
        onClick={handleCloseModal}
      >
        Launch demo modal
      </button>

      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden={!showModal}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Appointment
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={bookAppointment}>
                <div>
                  <label>Date of Appointment</label>
                  <input
                    className="form-control"
                    type="date"
                    value={formData.appointmentDate}
                    placeholder="Date"
                    onChange={onChange}
                    name="appointmentDate"
                  />
                  {timingSlotRadio.options.map((time) => {
                    return (
                      <div key={time.time}>
                        <input
                          type="radio"
                          value={time.time}
                          name="slot"
                          onChange={onChange}
                          checked={formData.slot === time.time}
                        />
                        <label>{time.time}</label>
                      </div>
                    );
                  })}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
