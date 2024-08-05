import { Overlay } from "@/components/common/overlay/overlay";
import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { IWorkOutSlideProps } from "../today";

export default function RoutineLoadSlide({ isVisible, setIsVisible }: IWorkOutSlideProps) {

    const [slideIn, setSlideIn] = useState<boolean>(isVisible);
    const [overlayVisible, setOverlayVisible] = useState<boolean>(isVisible);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isVisible) {
            setSlideIn(true);
            inputRef?.current?.focus();
        } else {
            setTimeout(() => setSlideIn(false), 10);
        }
    }, [isVisible]);

    const onClose = () => {
        setSlideIn(false);
        setOverlayVisible(false);
        setTimeout(() => setIsVisible(false), 300);
    }

    return (
        <>
            {overlayVisible && <Overlay onClick={onClose} />}
            <SlideContainer $slideIn={slideIn}>
                <SlideTitleContainer>
                    <PrevBtn onClick={onClose}>
                        {'<'}
                    </PrevBtn>                   
                </SlideTitleContainer>
            </SlideContainer>
        </>
    )
}


const slideUp = keyframes`
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
`;

const slideDown = keyframes`
    from { transform: translateY(0); }
    to { transform: translateY(100%); }
`;

const SlideContainer = styled.div<{ $slideIn: boolean }>`
    position: fixed;    
    transform: translate(-50%, -50%);    
    width: 100%;
    height: 100%;
    background-color: var(--bs-dark);
    z-index: 10;
    opacity: ${({ $slideIn }) => $slideIn ? 1 : 0};
    transition: opacity 0.5s;
    animation: ${({ $slideIn }) => $slideIn ? slideUp : slideDown} 0.5s ease forwards;
`;

const SlideTitleContainer = styled.div`
    width: 100%;
    height: 100px;
    display: flex;    
    align-items: center;
    padding: 20px;
    @media (max-width: 768px) {
        height: 85px;
    }
    @media (max-width: 375px) {
        height: 70px;
    }
`;

const PrevBtn = styled.h2`    
    margin-top: auto;
    cursor: pointer;
    @media (max-width: 576px) {
        font-size: 20px;
    }
    @media (max-width: 375px) {
        font-size: 15px;
        margin-top: 10px;
    }
`;
