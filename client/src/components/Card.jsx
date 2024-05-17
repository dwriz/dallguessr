import { Link } from "react-router-dom";

function Card({ room, handleDelete }) {
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" src={room.imgUrl} />
        <div className="card-body">
          <h5 className="card-title"></h5>
          <p className="card-text"></p>
          <Link to={`/gameDetail/${room.id}`} className="btn btn-primary">Detail</Link>
          <button className="btn btn-primary" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
