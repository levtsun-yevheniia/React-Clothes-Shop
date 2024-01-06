import React from 'react';

const Loader = () => {
  return (
    <div className="loader">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="loader__column">
          <div className="loader__rectangle loader__rectangle--large"></div>
          <div className="loader__rectangle loader__rectangle--small"></div>
          <div className="loader__rectangle loader__rectangle--medium"></div>
          <div className="loader__rectangle loader__rectangle--last"></div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
