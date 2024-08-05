import Image from 'next/image';
import { useRouter } from "next/router";
import styled from "styled-components";

export default function QuickStartButtonSection() {

    const router = useRouter();

    return (
        <>
            <QuickStartButtonContainer>
                <QuickStartDetailContainer onClick={() => router.push('/workout')}>
                    <QuickStartImage
                        src="/icon/main/workout.svg"
                        alt="workout"
                        width={80}
                        height={80}
                    />
                    <Text>운동기록</Text>
                </QuickStartDetailContainer>
                <QuickStartDetailContainer onClick={() => router.push('/body')}>
                    <QuickStartImage
                        src="/icon/main/weight2.svg"
                        alt="weight"
                        width={80}
                        height={80}
                    />
                    <Text>체중기록</Text>
                </QuickStartDetailContainer>
            </QuickStartButtonContainer>
        </>
    )
}

const QuickStartButtonContainer = styled.div`
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;    
    display: flex;
    align-items: center;
    justify-content: center;
`

const QuickStartDetailContainer = styled.div`
    width: 50%;
    background-color: var(--bs-dark);
    border-radius: 10px;
    margin: 2%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Text = styled.p`
    margin-top: 10px;
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
        font-size: 0.9rem;
    }
`


const QuickStartImage = styled(Image)`
    margin-top: 20px;
    border: none;
    @media (max-width: 768px) {
        width: 60px;
        height: 60px;
    }
    @media (max-width: 550px) {
        width: 50px;
        height: 50px;
    }
    @media (max-width: 480px) {
        width: 40px;
        height: 40px;
    }
    @media (max-width: 280px) {
        width: 30px;
        height: 30px;
    }
`