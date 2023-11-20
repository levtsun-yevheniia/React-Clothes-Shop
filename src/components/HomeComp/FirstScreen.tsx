import mainimage from '../../assets/img/main.jpg';
import maintitle from '../../assets/img/H1.svg';
import arrow from '../../assets/img/arrow.svg';

import React from 'react';

function FirstScreen() {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div className="first">
      <div className="first__block">
        <img
          className={loading === true ? 'block_img active' : 'block_img'}
          src={mainimage}
          alt="Main"
        />
        <div className={loading === true ? 'title active' : 'title'}>
          <img src={maintitle} alt="Main title" />
        </div>
        <div className={loading === true ? 'text active' : 'text'}>
          Step Back in Time with Vintage Clothes: Find your own vintage style with our collection.
        </div>
      </div>
      <div className={loading === true ? 'first__arrow active' : 'first__arrow'}>
        <img src={arrow} alt="" />
      </div>
    </div>
  );
}

export default FirstScreen;
