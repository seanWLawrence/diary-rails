import React, { FC } from 'react';

import './index.sass';

let Loader: FC = () => {
  return (
    <div className="loader__wrapper">
      <div className="loader__animation-wrapper">
        <div className="loader__animation"></div>
      </div>
      <p className="loader__text">Loading...</p>
    </div>
  );
};

export default Loader;
