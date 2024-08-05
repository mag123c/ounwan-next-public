import { createGlobalStyle } from "styled-components";
import { fonts } from "./fonts";

const GlobalStyle = createGlobalStyle<{ isNotPadding?: boolean }>`
    :root {
        --background-color: #343a40;
        --text-color: #ffffff;
    }

    * {
        font-family: 'SUITE-Regular';
        color: #ffffff;
    }
    ${fonts}    

    html, body {
        max-width: 768px;       
        max-height: 100%;
        margin: 0 auto;
        background-clip: content-box;
        background-color: var(--background-color);
        color: var(--text-color);
        padding-bottom: ${({ isNotPadding }) => (isNotPadding ? '0px' : '100px')};
    }

    #__next * {        
        max-width: 768px;        
    }

    section {
        display: flex;
        justify-content: center;
        width: 100%;
        margin: 1% auto;
        border: 1px solid #000000;
        border-radius: 10px;
    }

    table {
        text-align: center;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    input {
        user-select: auto;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type=number] {
        -moz-appearance: textfield;
    }

    input.focusedInput {
        box-shadow: 0 0 0 0.2rem var(--bs-light);
    } 

    input::-ms-clear,
    input::-ms-reveal{
        opacity: 0;
    }
    input::-webkit-search-decoration,
    input::-webkit-search-cancel-button,
    input::-webkit-search-results-button,
    input::-webkit-search-results-decoration{
        opacity: 0;
    }

    .swal2-popup {
        @media (max-width: 768px) {
            font-size: 0.9rem;
        }
        @media (max-width: 550px) {
            font-size: 0.8rem;
        }
        @media (max-width: 480px) {
            font-size: 0.7rem;
        }
        @media (max-width: 280px) {
            font-size: 0.6rem;
        }

    }

    /* 스크롤바 전체 스타일 설정 */
    ::-webkit-scrollbar {
      border-radius: 8px; /* 스크롤바 모서리 둥글게 */
      width: 8px; /* 스크롤바의 너비 */
      background: var(--bs-gray-500); /* 스크롤바 배경색 */
    }
  
    /* 스크롤바 손잡이(Thumb) 스타일 설정 */
    ::-webkit-scrollbar-thumb {
      background: var(--bs-gray-700); /* 스크롤바 손잡이 색상 */
      border-radius: 4px; /* 스크롤바 손잡이 모서리 둥글게 */
    }
  
    /* 스크롤바 손잡이 호버 스타일 */
    ::-webkit-scrollbar-thumb:hover {
      background: black; /* 호버 시 색상 변경 */
    }
  
    /* 양쪽 화살표 제거 */
    ::-webkit-scrollbar-button {
      display: none; /* 스크롤바 화살표 제거 */
    }
`;

export default GlobalStyle;