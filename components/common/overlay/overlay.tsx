import styled from "styled-components";

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%); 
    width: 100%;
    max-width: 768px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
`;