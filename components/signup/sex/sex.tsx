import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

interface SignupSexProps {
    setSex: React.Dispatch<React.SetStateAction<string>>;
}

const SignupSex = React.forwardRef<HTMLDivElement, SignupSexProps>(({ setSex }, ref) => {
    const [selectedSex, setSelectedSex] = useState('');

    const handleMaleClick = () => {
        setSex('남');
        setSelectedSex('남성');
    }

    const handleFemaleClick = () => {
        setSex('여');
        setSelectedSex('여성');
    }

    return (
        <SexContainer ref={ref}>
            <p>당신의 성별은?</p>
            <ButtonContainer>
                <Button
                    variant={selectedSex === '남성' ? "primary" : "outline-primary"}
                    size="lg"
                    onClick={handleMaleClick}
                    style={{ margin: '10px' }}
                >
                    남성
                </Button>
                <Button
                    variant={selectedSex === '여성' ? "danger" : "outline-danger"}
                    size="lg"
                    onClick={handleFemaleClick}
                    style={{ margin: '10px' }}
                >
                    여성
                </Button>
            </ButtonContainer>
        </SexContainer>
    )
});

export default SignupSex;
SignupSex.displayName = 'SignupSex';

const SexContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1% 0 5% 0;    
`
const ButtonContainer = styled.div`
    padding: 20px;
    width: 80%;
    background-color: var(--bs-dark);
    border-radius: 10px;
`