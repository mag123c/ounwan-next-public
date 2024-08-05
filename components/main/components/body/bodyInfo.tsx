import { useState } from "react";
import styled from "styled-components";
import BodyInfoDetailSection from "./components/detail";
import BodyInfoTitleSection from "./components/title";

export interface IBodyInfoProps {
    height: number;
    weight: number;
    sex?: number;
}

export function BodyInfoSection({ height, weight, sex }: IBodyInfoProps) {

    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
        <>
            <BodyInfoContainer>
                <BodyInfoTitleSection onClick={() => setIsVisible(!isVisible)} isVisible={isVisible} />
                {isVisible && <BodyInfoDetailSection height={height} weight={weight} />}
            </BodyInfoContainer>
        </>
    )
}
const BodyInfoContainer = styled.section`
    position: relative;
    height: auto;
    display: flex;
    flex-direction: column;    
    align-items: center;
    margin: 10px;
    padding: 20px;
    width: 100%;
    background-color: var(--bs-dark);
    border-radius: 10px;
`