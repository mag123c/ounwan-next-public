import React from "react";
import styled from "styled-components";
import SelectYearPicker from "../../common/picker/selectYearPicker";

interface SignupYearProps {
    setYear: React.Dispatch<React.SetStateAction<string>>;
}

const SignupYear = React.forwardRef<HTMLDivElement, SignupYearProps>(({ setYear }, ref) => {
    return (
        <YearContainer ref={ref}>
            <p>당신의 출생년도는?</p>
            <SelectYearPicker setYear={(year) => setYear(year)} />
        </YearContainer>
    );
});

export default SignupYear;
SignupYear.displayName = 'SignupYear';

const YearContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1% 0 5% 0;
`;

