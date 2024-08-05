import { Overlay } from "@/components/common/overlay/overlay";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

interface IStatisticsSlideProps {
    visible: boolean;
    setIsVisible: (value: boolean) => void;
    title: string;
    setTitle: (value: string) => void;
}

interface SlideContainerProps {
    slideIn: boolean;
}

export default function StatisticsSlide({ visible, setIsVisible, title, setTitle }: IStatisticsSlideProps) {

    const [slideIn, setSlideIn] = useState<boolean>(visible);
    const [overlayVisible, setOverlayVisible] = useState<boolean>(visible);

    const handleTitleClick = (newTitle: string) => {
        setTitle(newTitle);
        onClose();
    };

    useEffect(() => {
        if (visible) {
            setSlideIn(true);
        } else {
            setTimeout(() => setSlideIn(false), 10);
        }
    }, [visible]);

    const onClose = () => {
        setSlideIn(false);
        setOverlayVisible(false);        
        setTimeout(() => setIsVisible(false), 300);
    }

    return (
        <>
            {overlayVisible && <Overlay onClick={onClose} />}
            <SlideContainer $slideIn={slideIn}>
                {["30일", "90일", "1년", "전체기간"].map((period) => (
                    <Title key={period} onClick={() => handleTitleClick(period)} selected={period === title}>
                        {period}
                    </Title>
                ))}
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
    bottom: 0;    
    left: 20%;
    transform: translateX(-50%);
    width: 60%;    
    background-color: var(--bs-dark);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    z-index: 20;
    animation: ${({ $slideIn }) => $slideIn ? slideUp : slideDown} 0.5s ease forwards;
`;

const Title = styled.div<{ selected: boolean }>`
    padding: 20px;
    cursor: pointer;
    color: ${({ selected }) => selected ? "white" : "gray"};
    background-color: ${({ selected }) => selected ? "#555" : "transparent"};
    &:hover {
        background-color: #666;
    }
`;