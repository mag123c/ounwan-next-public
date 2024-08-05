import styled from "styled-components"

export function WorkingOutSection() {
    return (
        <>
            <WorkingOutContainer>
                <h1>Workingout Section</h1>
                <h1>222{process.env.NEXT_PUBLIC_STAGING}</h1>
            </WorkingOutContainer>
        </>
    )
}

const WorkingOutContainer = styled.section`
`