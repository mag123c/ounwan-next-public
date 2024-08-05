import { IBodyRecent } from "@/interfaces/user.interface"
import styled from "styled-components"

export default function BodyInfoModifySection({ height, weight, fat, muscleMass }: IBodyRecent) {
    return (
        <BodyInfoModifyContainer>
            <DetailContainer>
                <Text>체중</Text>
                <SubText>{weight && weight > 0 ? weight : '-'} kg</SubText>
            </DetailContainer>
            <DetailContainer>
                <Text>근육량</Text>
                <SubText>{muscleMass && muscleMass > 0 ? muscleMass + 'kg' : '- kg'}</SubText>
            </DetailContainer>
            <DetailContainer>
                <Text>체지방</Text>
                <SubText>{fat && fat > 0 ? fat + '%' : '- %'}</SubText>
            </DetailContainer>
        </BodyInfoModifyContainer>
    )
}

const BodyInfoModifyContainer = styled.div`
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;    
    display: flex;
    align-items: center;
    justify-content: center;
`
const DetailContainer = styled.div`
    width: 30%;
    hegiht: 100%;
    min-height: 100px;
    background-color: var(--bs-dark);
    border-radius: 10px;
    margin: 2%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (max-width: 280px) {
        min-height: 80px;
    }
`

const Text = styled.span`
    font-size: 1.5rem;
    @media (max-width: 768px) {
        font-size: 1.3rem;
    }
    @media (max-width: 550px) {
        font-size: 1.1rem;
    }
    @media (max-width: 480px) {
        font-size: 1.0rem;
    }
    @media (max-width: 280px) {
        font-size: 0.8rem;
    }
`

const SubText = styled.span`
    font-size: 1.2rem;
    @media (max-width: 768px) {
        font-size: 1.0rem;
    }
    @media (max-width: 550px) {
        font-size: 0.9rem;
    }
    @media (max-width: 480px) {
        font-size: 0.8rem;
    }
    @media (max-width: 280px) {

        font-size: 0.7rem;
    }
`
