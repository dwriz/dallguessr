import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewGamePage() {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState(0);
  const [roomData, setRoomData] = useState({});

  useEffect(() => {
    initiateRoom();
  }, []);

  useEffect(() => {
    fetchRoomData();
  }, [roomId]);

  async function initiateRoom() {
    try {
      console.log("🤖 Skynet is generating image...");

      const { data } = await axios({
        method: "post",
        url: `http://localhost:3000/room/add`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("🤖 Skynet has generated the image.");

      setRoomId(parseInt(data));
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchRoomData() {
    try {
      if (roomId !== 0) {
        const { data } = await axios({
          method: "get",
          url: `http://localhost:3000/room/${roomId}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("🤖 Skynet has showed the image.");

        setRoomData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [input, setInput] = useState({
    answer: "",
  });

  function handleChangeInput(event) {
    const { name, value } = event.target;

    setInput({ ...input, [name]: value });
  }

  async function handleAnswer(input) {
    try {
      await axios({
        method: "put",
        url: `http://localhost:3000/room/${roomId}`,
        data: input,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate(`/dashboard`);
    } catch (error) {
      console.log(error);
    }
  }

  async function submitLogin(event) {
    event.preventDefault();
    handleAnswer(input);
  }

  return (
    <>
      <h1>NEW GAME PAGE</h1>
      <img src={roomData.imgUrl} style={{ height: "300px" }} />
      <form autoComplete="off" onSubmit={submitLogin}>
        <label htmlFor="answer">Answer here:</label>
        <input
          type="text"
          id="answer"
          name="answer"
          onChange={handleChangeInput}
        />
        <button type="submit" className="btn btn-primary">
          Submit Answer
        </button>
      </form>
    </>
  );
}

export default NewGamePage;
