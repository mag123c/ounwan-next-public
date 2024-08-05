import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { RecordSection } from "./record";

interface ModifyInfoSlideProps {
    isModify: boolean;
    setIsModify: (value: boolean) => void;
}

interface SlideContainerProps {
    slideIn: boolean;
}

export const ModifyInfoSlide = ({ isModify, setIsModify }: ModifyInfoSlideProps) => {

    const [slideIn, setSlideIn] = useState<boolean>(isModify);


    const handleSlide = () => {
        setSlideIn(!slideIn);
        setTimeout(() => {
            setIsModify(!isModify);
        }, 500);
    }

    return (
        <ModifySlideContainer slideIn={slideIn}>
            <ModifySlideTitleContainer>
                <PrevBtn onClick={handleSlide}>
                    {'<'}
                </PrevBtn>
                <Title>체중 기록</Title>
            </ModifySlideTitleContainer>
            <RecordWholeContainer>
                <RecordSection setSlideIn={setSlideIn}/>
            </RecordWholeContainer>
        </ModifySlideContainer>
    )
}

const slideUp = keyframes`
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0);
    }
`;

const slideDown = keyframes`
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(100%);
    }
`;


const ModifySlideContainer = styled.div<SlideContainerProps>`
    animation: ${({ slideIn }) => slideIn ? slideUp : slideDown} 0.5s ease forwards;
    position: fixed;    
    transform: translate(-50%, -50%);    
    width: 100%;
    height: 100%;
    background-color: var(--bs-dark);
    z-index: 10;
    opacity: ${({ slideIn }) => slideIn ? 1 : 0};
    transition: opacity 0.5s;
`;




const ModifySlideTitleContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;    
`;

const RecordWholeContainer = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const PrevBtn = styled.h2`
    margin-top: 20px;
    margin-left: 3%;
    margin-right: 10px;
    cursor: pointer;
`;

const Title = styled.h2`
    margin-top: 20px;
    margin-left: 2%;
`;
