import React, { useRef } from "react";
import { InputGroup } from "react-bootstrap";
import styled from "styled-components";

interface SignupNicknameProps {
    setNickname: React.Dispatch<React.SetStateAction<string>>;
}

const SignupNickname = React.forwardRef<HTMLDivElement, SignupNicknameProps>(({ setNickname }, ref) => {

    const nicknameInputRef = useRef<HTMLInputElement | null>(null);

    // useEffect(() => {
    //     if (nicknameInputRef.current) {
    //         nicknameInputRef.current.focus();
    //     }
    // }, []);

    return (
        <NicknameContainer ref={ref}>
            <span>당신의 닉네임은?</span>
            <Nickname>
                <NicknameInputGroup>
                    <input
                        ref={nicknameInputRef}
                        type="text"
                        className="form-control"
                        onChange={(e) => setNickname(e.target.value)}>
                    </input>
                </NicknameInputGroup>
            </Nickname>
        </NicknameContainer>
    )
});

export default SignupNickname;
SignupNickname.displayName = 'SignupNickname';

const NicknameContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1% 0 5% 0;    
`
const Nickname = styled.div`
    padding: 20px;
    width: 80%;
    background-color: var(--bs-dark);
    border-radius: 10px;
`

const NicknameInputGroup = styled(InputGroup)`
    .form-control {
        border: 1px solid white;        
        background-color: transparent;
        text-align: center;
        color: #FFFFFF;
        border-right: 0;
        font-size: 1.3rem;
    }

    .form-control:focus {
        border: none;
        background-color: transparent;
        text-align: center;
        color: #FFFFFF;
        border-right: 0;
    }

`