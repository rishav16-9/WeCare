import React, { useEffect, useState } from "react";
import axios from "axios";
import AllCoach from "./AllCoach";

export default function UserHome() {
  const [allCoach, setAllCoach] = useState([]);
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

  return (
    <>
      <div className="container mt-5 text-white">
        <AllCoach coach={allCoach} />
      </div>
    </>
  );
}
