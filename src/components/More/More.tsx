import React from 'react';
import { FC } from 'react';
import './More.css';

interface IMoreProps {
  onLoadMoreMovies: () => void;
}

const More: FC<IMoreProps> = ({ onLoadMoreMovies }) => {
  return (
    <div className="more">
      <button className="more__button" onClick={onLoadMoreMovies}>
        Ещё
      </button>
    </div>
  );
};

export default More;
