import inscr from '../../assets/img/inscr.svg';
import creators from '../../assets/img/creatorsimg.jpg';

import { Link } from 'react-router-dom';

function SecondScreen() {
  return (
    <div className="second">
      <div className="block">
        <div className="block__inscr">
          <img src={inscr} alt="" />
        </div>
        <div className="block__img">
          <img src={creators} alt="" />
        </div>
        <div className="block__text">
          <h3 className="title">Lawrence sisters</h3>
          <div className="text">
            <p>
              We are sisters named Sarah, Emma, <br></br>and Lily we are owners of this small place
              for really comfortable and enjoyable buying clothes. We are all passionate about
              fashion and had always dreamed of opening own clothing store. <br></br> <br></br>We
              were spending weeks scouring thrift stores and garage sales for unique clothing items
              that we could sell at our store. And create place for similar to us people. This
              business is a testament to our hard work, determination, and passion for fashion.
            </p>
          </div>
          <div className="btn">
            <Link to="/" className="simple_button">
              More...
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondScreen;
