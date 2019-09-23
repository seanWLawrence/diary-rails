import React, { FC } from 'react';

import './index.sass';

interface ErrorProps {
  error: { message: string };
}

let Error: FC<ErrorProps> = ({ error: { message } }) => {
  return (
    <div className="error__wrapper">
      <h1 className="error__title">
        Error
        <button
          onClick={() => window.location.reload(true)}
          className="error__refresh-button"
        >
          Refresh page
        </button>
      </h1>
      <p className="error__text">{message}</p>
    </div>
  );
};

export default Error;
