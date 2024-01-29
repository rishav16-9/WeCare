import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import AllCoach from "./AllCoach";
import BookAppointment from "./BookAppointment";

export default function UserHome() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [allCoach, setAllCoach] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/coaches/all`)
      .then((res) => {
        setAllCoach(res.data.coach);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const setAppointment = (coach) => {
    setSelectedCoach(coach);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <BookAppointment
        innerRef={ref}
        handleCloseModal={handleCloseModal}
        showModal={showModal}
        selectedCoach={selectedCoach}
      />
      <div className="container mt-5 text-white">
        <AllCoach coach={allCoach} setAppointment={setAppointment} />
      </div>
    </>
  );
}
