function Card({ room, handleDelete }) {
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" src={room.imgUrl} />
        <div className="card-body">
          <h5 className="card-title"></h5>
          <p className="card-text"></p>
          <a href="#" className="btn btn-primary">
            Details
          </a>
          <button className="btn btn-primary" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
