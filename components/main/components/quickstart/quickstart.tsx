import styled from "styled-components";
import QuickStartButtonSection from "./components/btn";

export default function QuickStartSection() {

    return (
        <>
            <QuickStartContainer>
                <QuickStartButtonSection />
            </QuickStartContainer>
        </>
    )
}

const QuickStartContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
`