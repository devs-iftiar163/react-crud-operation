import axios from "axios";
import { useEffect, useState } from "react";

const Team = () => {
  const [team, setTeam] = useState([]);

  const getAllTeam = async () => {
    const teams = await axios.get("http://localhost:7070/students");

    setTeam(teams.data);
  };

  useEffect(() => {
    getAllTeam();
  }, []);

  return (
    <>
      <div className="container my-5">
        <div className="row">
          {team.map((item, index) => {
            return (
              <div className="col-md-3" key={index}>
                <div className="card">
                  <img src={item.photo} alt="" />
                  <div className="card-body">
                    <h2>{item.name}</h2>
                    <h5>Class : {item.class}</h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Team;
