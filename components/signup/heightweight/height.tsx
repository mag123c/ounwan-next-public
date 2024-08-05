import React from "react";
import { InputGroup } from "react-bootstrap";
import styled from "styled-components";

interface SignupHeightPrpos {
    setHeight: (value: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Height = React.forwardRef<HTMLInputElement, SignupHeightPrpos>(({ setHeight, onKeyDown }, ref) => {


    return (
        <HeightContainer>
            <HeightInputGroup>
                <input
                    ref={ref}
                    type="number"
                    className="form-control"
                    onChange={(e) => setHeight(e.target.value)}
                    onKeyDown={onKeyDown}
                />
                <span
                    className="input-group-text"
                    id="basic-addon2">
                    cm
                </span>
            </HeightInputGroup>
        </HeightContainer>
    )
});

export default Height;
Height.displayName = 'Height';

const HeightContainer = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
    background-color: var(--bs-dark-text-emphasis);
`

const HeightInputGroup = styled(InputGroup)`
    background-color: var(--bs-dark);

    .form-control {
        border: 1px solid white;
        background-color: transparent;
        text-align: right;
        color: #FFFFFF;
        border-right: 0;
    }

    .form-control:focus {
        background-color: transparent;
        text-align: right;
        color: #FFFFFF;
        border-right: 0;
    }

    .input-group-text {
        width: 50px;
        background-color: transparent;
        color: #FFFFFF;
    }
`