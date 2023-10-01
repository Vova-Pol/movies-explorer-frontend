import React from 'react';
import { FC } from 'react';
import './More.css';

const More: FC = (props) => {
  return (
    <div className="more">
      <button className="more__button" onClick={props.onLoadMoreMovies}>
        Ещё
      </button>
    </div>
  );
};

export default More;
