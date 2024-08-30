import './index.css';        // CSS 파일을 import하여 애플리케이션의 스타일을 적용합니다.
import ReactDOM from 'react-dom/client';  // React 18에서 제공하는 새로운 렌더링 API를 import합니다.
import React from 'react';  // React 라이브러리를 import합니다.
import App from './App';    // 애플리케이션의 루트 컴포넌트인 App을 import합니다.

const container = document.getElementById('root');  // HTML 문서에서 id가 'root'인 요소를 선택합니다.
if (container) {  // 'root' 요소가 존재하는지 확인합니다.
    const root = ReactDOM.createRoot(container);  // 선택한 요소에 대해 React 18의 새로운 root API를 생성합니다.
    root.render(<App />);  // ReactDOM의 createRoot를 사용하여 App 컴포넌트를 렌더링합니다.
} else {
    console.error("Element 'root' not found");  // 'root' 요소가 없으면 콘솔에 에러를 출력합니다.
}
