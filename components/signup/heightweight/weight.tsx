import React from "react";
import { InputGroup } from "react-bootstrap";
import styled from "styled-components";

interface SignupWeightPrpos {
    setWeight: React.Dispatch<React.SetStateAction<string>>;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Weight = React.forwardRef<HTMLInputElement, SignupWeightPrpos>(({ setWeight, onKeyDown }, ref) => {

    return (
        <WeightContainer>
            <WeightInputGroup>
                <input
                    ref={ref}
                    type="number"
                    className="form-control"
                    onChange={(e) => setWeight(e.target.value)}
                    onKeyDown={onKeyDown}>
                </input>
                <span
                    className="input-group-text"
                    id="basic-addon2">
                    kg
                </span>
            </WeightInputGroup>
        </WeightContainer>
    )
});

export default Weight;
Weight.displayName = 'Weight';

const WeightContainer = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
    background-color: var(--bs-dark-text-emphasis);
`

const WeightInputGroup = styled(InputGroup)`
    background-color: var(--bs-dark);

    .form-control {
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