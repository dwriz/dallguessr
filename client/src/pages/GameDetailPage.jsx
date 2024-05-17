import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function DashboardPage() {
  const navigate = useNavigate();
  const [room, setRoom] = useState({});

  const { RoomId } = useParams();

  async function fetchData() {
    try {
      const { data } = await axios({
        method: "get",
        url: `http://localhost:3000/room/${RoomId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRoom(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Detail</h1>
      <div className="container">
        <img src={room.imgUrl} style={{height: "300px"}} />
        <p>Skynet's interpretation:</p>
        <h3>{room.finalPrompt}</h3>
        <p className="mt-5">Your answer:</p>
        <h3>{room.answer}</h3>
        <p className="mt-5">Skynet's judgment:</p>
        <h3>{room.accuracyRate}% accurate</h3>
        <Link to="/dashboard" className="mt-5 btn btn-primary">Back</Link>
      </div>
    </>
  );
}

export default DashboardPage;
