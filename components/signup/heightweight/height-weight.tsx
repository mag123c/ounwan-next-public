import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Height from "./height";
import Weight from "./weight";

interface SignupHeightWeightProps {
    setHeight: React.Dispatch<React.SetStateAction<string>>;
    setWeight: React.Dispatch<React.SetStateAction<string>>;
}

const SignupHeightWeight = React.forwardRef<HTMLDivElement, SignupHeightWeightProps>(({ setHeight, setWeight }, ref) => {

    const heightInputRef = useRef<HTMLInputElement | null>(null);
    const weightInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (heightInputRef.current) {
            heightInputRef.current.focus();
        }
    }, []);

    const handleHeightChange = (value: string) => {
        setHeight(value);
        if (value.length === 3) {
            weightInputRef.current?.focus();
        }
    };

    const handleWeighhtChange = (value: string) => {
        setWeight(value);
    };

    const handleKeyPressHeight = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.currentTarget.blur();
        }
    }

    const handleKeyPressWeight = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.currentTarget.blur();      
        }
    }

    return (
        <HeightWeightMainContainer ref={ref}>
            <p>당신의 체형 정보는?</p>
            <HeightWeightSubContainer>
                <Height ref={heightInputRef} setHeight={handleHeightChange} onKeyDown={handleKeyPressHeight} />
                <Weight ref={weightInputRef} setWeight={setWeight} onKeyDown={handleKeyPressWeight} />
            </HeightWeightSubContainer>
        </HeightWeightMainContainer>
    )
});

export default SignupHeightWeight;
SignupHeightWeight.displayName = 'SignupHeightWeight';

const HeightWeightMainContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1% 0 5% 0;
`

const HeightWeightSubContainer = styled.div`
    width: 80%;
    padding: 30px;
    background-color: var(--bs-dark);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`