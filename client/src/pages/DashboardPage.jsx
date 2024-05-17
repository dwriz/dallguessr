import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";

function DashboardPage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  async function fetchData() {
    try {
      const { data } = await axios({
        method: "get",
        url: `http://localhost:3000/room/all`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRooms(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  async function handleDelete(id) {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:3000/room/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div
        className="container bg-white text-center p-5"
        style={{ width: "1000px" }}
      >
        <div className="container">
          <button
            onClick={handleLogout}
            className="btn"
            style={{ backgroundColor: "black", color: "green" }}
          >
            Logout
          </button>
          <Link
            to="/newgame"
            className="btn"
            style={{ backgroundColor: "black", color: "green" }}
          >
            Start New Game
          </Link>
          {rooms.map((room, index) => {
            return (
              <Card
                key={index + 1}
                room={room}
                handleDelete={() => handleDelete(room.id)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
