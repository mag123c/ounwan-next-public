import { Overlay } from "@/components/common/overlay/overlay";
import Upload from "@/components/upload/upload";
import { IUserInfo } from "@/interfaces/user.interface";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { IWorkOutSlideProps } from "../../today";

interface IAddWorkOutSlideProps extends IWorkOutSlideProps {
    user: IUserInfo;
    targetName: string[];
}

export default function AdminAddWorkOutSlide({ user, targetName, isVisible, setIsVisible }: IAddWorkOutSlideProps) {
    const [slideIn, setSlideIn] = useState<boolean>(isVisible);

    useEffect(() => {
        if (isVisible) {
            setSlideIn(true);
        } else {
            setTimeout(() => setSlideIn(false), 10);
        }
    }, [isVisible]);

    const onClose = () => {
        setSlideIn(false);
        setTimeout(() => setIsVisible(false), 300);
    };

    return (
        <>
            <Overlay onClick={onClose} />
            <SlideContainer $slideIn={slideIn}>
                <SlideTitleContainer>
                    <PrevBtn onClick={onClose}>
                        {'<'}
                    </PrevBtn>
                </SlideTitleContainer>
                <Upload user={user} targetName={targetName}/>
            </SlideContainer>
        </>
    );
}
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

const slideUp = keyframes`
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
`;

const slideDown = keyframes`
    from { transform: translateY(0); }
    to { transform: translateY(100%); }
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
    cursor: pointer;
    @media (max-width: 576px) {
        font-size: 20px;
    }
    @media (max-width: 375px) {
        font-size: 15px;
        margin-top: 10px;
    }
`;