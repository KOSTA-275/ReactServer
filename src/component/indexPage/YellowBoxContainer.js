import React from 'react';
import { useNavigate } from 'react-router-dom';
import YellowBox from './YellowBox';
import styles from './YellowBoxContainer.module.scss';

// 이미지 파일을 import 하거나 경로를 지정해야 합니다.
import image1 from '../image/BannerList/1.png';
import image2 from '../image/BannerList/2.png';
import image3 from '../image/BannerList/3.png';

const YellowBoxContainer = () => {
  const navigate = useNavigate();

  const handleBoxClick = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <div onClick={() => handleBoxClick('/errand-insert')}>
        <YellowBox title="도와주세요!" imageSrc={image1} />
      </div>
      <div onClick={() => handleBoxClick('/errand-list')}>
        <YellowBox title="도와줄게요!" imageSrc={image2} />
      </div>
      <YellowBox title="해드릴게요!" imageSrc={image3} />
    </div>
  );
};

export default YellowBoxContainer;