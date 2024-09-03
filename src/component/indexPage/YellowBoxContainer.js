import React from 'react';
import YellowBox from './YellowBox';
import styles from './YellowBoxContainer.module.scss';

// 이미지 파일을 import 하거나 경로를 지정해야 합니다.
import image1 from '../image/BannerList/1.png';
import image2 from '../image/BannerList/2.png';
import image3 from '../image/BannerList/3.png';

const YellowBoxContainer = () => {
  return (
    <div className={styles.container}>
      <YellowBox title="도와주세요!" imageSrc={image1} />
      <YellowBox title="도와줄게요!" imageSrc={image2} />
      <YellowBox title="해드릴게요!" imageSrc={image3} />
    </div>
  );
};

export default YellowBoxContainer;