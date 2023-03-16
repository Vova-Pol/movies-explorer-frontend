import './More.css';

function More(props) {
  return (
    <div className="more">
      {props.moviesList.length > 7 ? (
        <button className="more__button" onClick={props.onLoadMoreMovies}>
          Ещё
        </button>
      ) : null}
    </div>
  );
}

export default More;
