import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { addItem } from '../redux/slices/cartSlice';

type TAboutItem = {
  id: string;
  title: string;
  size: number;
  type: string;
  price: number;
  count: number;
  imageUrl: string;
};

const AboutItem: React.FC = () => {
  const params = useParams();
  const [itemData, setItemData] = React.useState<{
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    secondimageUrl: string;
    sizes: number[];
    types: string[];
    guide: string;
    desc: string;
    material: string;
  }>({
    id: '0',
    title: '',
    price: 0,
    imageUrl: '',
    secondimageUrl: '',
    sizes: [],
    types: [],
    guide: '',
    desc: '',
    material: '',
  });

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const typeNames = ['white', 'black', 'blue'];

  const dispatch = useDispatch();

  const onClickAdd = () => {
    const id = itemData.id;
    const title = itemData.title;
    const price = itemData.price;
    const imageUrl = itemData.imageUrl;
    // const secondimageUrl = itemData.secondimageUrl;
    const item: TAboutItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: itemData.sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  const [sections, setSections] = useState([
    { id: 1, isOpen: false },
    { id: 2, isOpen: false },
    { id: 3, isOpen: false },
  ]);

  const toggleSection = (sectionId: number) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId ? { ...section, isOpen: !section.isOpen } : section,
      ),
    );
  };

  React.useEffect(() => {
    async function fetchItems() {
      try {
        const { data } = await axios.get(
          `https://63b609d958084a7af3a8043f.mockapi.io/items/` + params.id,
        );
        setItemData(data);
      } catch (error) {
        console.log('error:', error);
      }
    }
    fetchItems();
  }, []);

  if (!itemData) {
    return 'Loading...';
  }

  return (
    <div className="aboutitem">
      <div className="aboutitem__images">
        <img className="img" src={itemData.imageUrl} alt="item" />
        <img className="img" src={itemData.secondimageUrl} alt="item" />
      </div>
      <div className="aboutitem__info">
        <h3 className="title">{itemData.title}</h3>
        <p className="price">{itemData.price}$</p>
        <div className="selectors">
          <div className="selectors__clr">
            <p className="color_title">Color: {typeNames[activeType]}</p>
            <ul className="colors">
              {itemData.types.map((typeId, i) => (
                <li
                  key={i}
                  onClick={() => setActiveType(i)}
                  className={activeType === i ? 'active' : ''}
                >
                  {' '}
                  <div className="color_block">
                    <div className={typeNames[i]}></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="selectors__szs">
            <p className="size_title">Sizes:</p>
            <ul className="list list--second">
              {itemData.sizes.map((size, i) => (
                <li
                  key={i}
                  onClick={() => setActiveSize(i)}
                  className={activeSize === i ? 'active' : ''}
                >
                  {' '}
                  {size}
                </li>
              ))}
            </ul>
          </div>
          <div className="selectors__btn">
            <div onClick={onClickAdd} className="button">
              <span>Add</span>
            </div>
          </div>
        </div>
        <div className="info_items">
          <div className="item">
            <div
              className={`${
                sections[0].isOpen ? 'item__header item__header--open' : 'item__header'
              }`}
              onClick={() => toggleSection(1)}
            >
              <svg
                className="svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.31023 13.6259C2.26367 13.6724 2.22672 13.7276 2.20152 13.7883C2.17631 13.8491 2.16334 13.9142 2.16334 13.9799C2.16334 14.0457 2.17631 14.1108 2.20152 14.1716C2.22672 14.2323 2.26367 14.2875 2.31023 14.3339L5.84623 17.8689C5.93999 17.9627 6.06715 18.0153 6.19973 18.0153C6.33231 18.0153 6.45947 17.9627 6.55323 17.8689L17.8672 6.55494C17.961 6.46118 18.0136 6.33402 18.0136 6.20144C18.0136 6.06886 17.961 5.9417 17.8672 5.84794L14.3312 2.31294C14.2375 2.2192 14.1103 2.16655 13.9777 2.16655C13.8451 2.16655 13.718 2.2192 13.6242 2.31294L12.5642 3.37294L14.2732 5.08294C14.3209 5.12913 14.3589 5.18436 14.385 5.2454C14.4112 5.30643 14.4249 5.37206 14.4253 5.43845C14.4258 5.50484 14.4131 5.57066 14.3878 5.63207C14.3626 5.69348 14.3254 5.74925 14.2784 5.79612C14.2314 5.843 14.1755 5.88005 14.114 5.9051C14.0525 5.93016 13.9867 5.94272 13.9203 5.94205C13.8539 5.94138 13.7883 5.92749 13.7274 5.90121C13.6664 5.87492 13.6113 5.83676 13.5652 5.78894L11.8572 4.07994L10.4422 5.49494L11.3262 6.37894C11.4173 6.47324 11.4677 6.59954 11.4666 6.73064C11.4654 6.86174 11.4128 6.98714 11.3201 7.07985C11.2274 7.17255 11.102 7.22514 10.9709 7.22628C10.8398 7.22742 10.7135 7.17702 10.6192 7.08594L9.73523 6.20194L8.32123 7.61594L10.0302 9.32494C10.078 9.37106 10.1161 9.42624 10.1423 9.48724C10.1685 9.54824 10.1823 9.61385 10.1829 9.68024C10.1834 9.74663 10.1708 9.81247 10.1456 9.87392C10.1205 9.93536 10.0834 9.99119 10.0364 10.0381C9.98948 10.0851 9.93366 10.1222 9.87221 10.1474C9.81076 10.1725 9.74492 10.1851 9.67853 10.1846C9.61214 10.184 9.54653 10.1702 9.48553 10.144C9.42453 10.1178 9.36935 10.0797 9.32323 10.0319L7.61423 8.32294L6.20023 9.73694L7.08423 10.6209C7.13199 10.6671 7.17008 10.7222 7.19628 10.7832C7.22249 10.8442 7.23628 10.9098 7.23686 10.9762C7.23743 11.0426 7.22478 11.1085 7.19964 11.1699C7.1745 11.2314 7.13737 11.2872 7.09043 11.3341C7.04348 11.3811 6.98766 11.4182 6.92621 11.4434C6.86476 11.4685 6.79892 11.4811 6.73253 11.4806C6.66614 11.48 6.60053 11.4662 6.53953 11.44C6.47853 11.4138 6.42335 11.3757 6.37723 11.3279L5.49323 10.4439L4.07823 11.8589L5.78823 13.5679C5.83465 13.6144 5.87146 13.6696 5.89656 13.7303C5.92166 13.791 5.93455 13.8561 5.93451 13.9218C5.93446 13.9875 5.92148 14.0525 5.89629 14.1132C5.87111 14.1739 5.83422 14.229 5.78773 14.2754C5.74124 14.3219 5.68607 14.3587 5.62535 14.3838C5.56464 14.4089 5.49957 14.4218 5.43388 14.4217C5.36818 14.4217 5.30313 14.4087 5.24246 14.3835C5.18178 14.3583 5.12665 14.3214 5.08023 14.2749L3.37123 12.5649L2.31123 13.6259H2.31023ZM1.60423 15.0409C1.46484 14.9016 1.35427 14.7362 1.27882 14.5542C1.20338 14.3721 1.16455 14.177 1.16455 13.9799C1.16455 13.7829 1.20338 13.5877 1.27882 13.4057C1.35427 13.2236 1.46484 13.0582 1.60423 12.9189L12.9172 1.60594C13.0565 1.46655 13.2219 1.35597 13.404 1.28053C13.586 1.20509 13.7812 1.16626 13.9782 1.16626C14.1753 1.16626 14.3704 1.20509 14.5525 1.28053C14.7345 1.35597 14.8999 1.46655 15.0392 1.60594L18.5742 5.14094C18.8554 5.42223 19.0134 5.80369 19.0134 6.20144C19.0134 6.59919 18.8554 6.98065 18.5742 7.26194L7.26023 18.5759C6.97898 18.8568 6.59773 19.0146 6.20023 19.0146C5.80273 19.0146 5.42148 18.8568 5.14023 18.5759L1.60423 15.0409Z"
                />
              </svg>
              <p>Size guide</p>
              <svg
                className={` ${sections[0].isOpen ? 'arrow arrow--open' : 'arrow'}`}
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6665 16.6666L19.9998 25L28.3332 16.6666"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {sections[0].isOpen && (
              <div className="item__content">
                <p>{itemData.guide}</p>
              </div>
            )}
          </div>
          <div className="item">
            <div
              className={`${
                sections[1].isOpen ? 'item__header item__header--open' : 'item__header'
              }`}
              onClick={() => toggleSection(2)}
            >
              <svg
                className={` ${sections[1].isOpen ? 'svg svg--open' : 'svg'}`}
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.25 6C11.25 6.19891 11.171 6.38968 11.0303 6.53033C10.8897 6.67098 10.6989 6.75 10.5 6.75C10.3011 6.75 10.1103 6.67098 9.96967 6.53033C9.82902 6.38968 9.75 6.19891 9.75 6C9.75 5.80109 9.82902 5.61032 9.96967 5.46967C10.1103 5.32902 10.3011 5.25 10.5 5.25C10.6989 5.25 10.8897 5.32902 11.0303 5.46967C11.171 5.61032 11.25 5.80109 11.25 6ZM9.9375 8.8125V14.4375C9.9375 14.5867 9.99676 14.7298 10.1023 14.8352C10.2077 14.9407 10.3508 15 10.5 15C10.6492 15 10.7923 14.9407 10.8977 14.8352C11.0032 14.7298 11.0625 14.5867 11.0625 14.4375V8.8125C11.0625 8.66332 11.0032 8.52024 10.8977 8.41475C10.7923 8.30926 10.6492 8.25 10.5 8.25C10.3508 8.25 10.2077 8.30926 10.1023 8.41475C9.99676 8.52024 9.9375 8.66332 9.9375 8.8125ZM1.5 10.5C1.5 5.52975 5.52975 1.5 10.5 1.5C15.4702 1.5 19.5 5.52975 19.5 10.5C19.5 15.4702 15.4702 19.5 10.5 19.5C5.52975 19.5 1.5 15.4702 1.5 10.5ZM10.5 2.625C6.15075 2.625 2.625 6.15075 2.625 10.5C2.625 14.8492 6.15075 18.375 10.5 18.375C14.8492 18.375 18.375 14.8492 18.375 10.5C18.375 6.15075 14.8492 2.625 10.5 2.625Z"
                  fill="black"
                />
              </svg>
              <p>Description</p>
              <svg
                className={` ${sections[1].isOpen ? 'arrow arrow--open' : 'arrow'}`}
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6665 16.6666L19.9998 25L28.3332 16.6666"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {sections[1].isOpen && (
              <div className="item__content">
                <p>{itemData.desc}</p>
              </div>
            )}
          </div>
          <div className="item">
            <div
              className={`${
                sections[2].isOpen ? 'item__header item__header--open' : 'item__header'
              }`}
              onClick={() => toggleSection(3)}
            >
              <svg
                className="svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 8.75C13.655 8.74983 14.7745 9.14954 15.6682 9.88123C16.5619 10.6129 17.1747 11.6314 17.4025 12.7638L17.4338 12.78L17.4138 12.8188C17.6054 13.8295 17.4805 14.8748 17.0562 15.812C16.632 16.7492 15.9289 17.5328 15.043 18.0558C14.1571 18.5787 13.1314 18.8157 12.1058 18.7343C11.0803 18.653 10.1048 18.2573 9.31238 17.6011C8.51999 16.945 7.94928 16.0604 7.67809 15.068C7.40689 14.0756 7.44842 13.0238 7.79701 12.0558C8.14559 11.0879 8.78426 10.2511 9.62591 9.65946C10.4676 9.06785 11.4712 8.75026 12.5 8.75ZM9.355 13.335C10.19 12.9638 11.2713 12.7975 12.6513 13.1438C14.48 13.6 15.5663 13.0638 16.0588 12.565C15.7788 11.7282 15.2128 11.0169 14.4602 10.5561C13.7077 10.0953 12.8168 9.91459 11.9442 10.0456C11.0716 10.1767 10.2731 10.6112 9.68915 11.2727C9.10517 11.9342 8.77308 12.7804 8.75125 13.6625C8.94384 13.5381 9.14568 13.4286 9.355 13.335ZM9.375 6.875C9.375 7.12364 9.27623 7.3621 9.10041 7.53791C8.9246 7.71373 8.68614 7.8125 8.4375 7.8125C8.18886 7.8125 7.9504 7.71373 7.77459 7.53791C7.59877 7.3621 7.5 7.12364 7.5 6.875C7.5 6.62636 7.59877 6.3879 7.77459 6.21209C7.9504 6.03627 8.18886 5.9375 8.4375 5.9375C8.68614 5.9375 8.9246 6.03627 9.10041 6.21209C9.27623 6.3879 9.375 6.62636 9.375 6.875ZM13.125 6.25C12.9592 6.25 12.8003 6.31585 12.6831 6.43306C12.5658 6.55027 12.5 6.70924 12.5 6.875C12.5 7.04076 12.5658 7.19973 12.6831 7.31694C12.8003 7.43415 12.9592 7.5 13.125 7.5H16.875C17.0408 7.5 17.1997 7.43415 17.3169 7.31694C17.4342 7.19973 17.5 7.04076 17.5 6.875C17.5 6.70924 17.4342 6.55027 17.3169 6.43306C17.1997 6.31585 17.0408 6.25 16.875 6.25H13.125ZM7.5 3.75C6.50544 3.75 5.55161 4.14509 4.84835 4.84835C4.14509 5.55161 3.75 6.50544 3.75 7.5V17.5C3.75 18.4946 4.14509 19.4484 4.84835 20.1517C5.55161 20.8549 6.50544 21.25 7.5 21.25H17.5C18.4946 21.25 19.4484 20.8549 20.1517 20.1517C20.8549 19.4484 21.25 18.4946 21.25 17.5V7.5C21.25 6.50544 20.8549 5.55161 20.1517 4.84835C19.4484 4.14509 18.4946 3.75 17.5 3.75H7.5ZM5 7.5C5 6.83696 5.26339 6.20107 5.73223 5.73223C6.20107 5.26339 6.83696 5 7.5 5H17.5C18.163 5 18.7989 5.26339 19.2678 5.73223C19.7366 6.20107 20 6.83696 20 7.5V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H7.5C6.83696 20 6.20107 19.7366 5.73223 19.2678C5.26339 18.7989 5 18.163 5 17.5V7.5Z"
                  fill="black"
                />
              </svg>
              <p>Material and care instruction</p>
              <svg
                className={` ${sections[2].isOpen ? 'arrow arrow--open' : 'arrow'}`}
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6665 16.6666L19.9998 25L28.3332 16.6666"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {sections[2].isOpen && (
              <div className="item__content">
                <p>{itemData.material}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutItem;
