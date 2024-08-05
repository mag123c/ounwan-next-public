import styled from "styled-components";
import { IBodyInfoProps } from "../../../main/components/body/bodyInfo";
import BmiChart from "./bmichart";


export default function BmiSection({ height, weight, sex }: IBodyInfoProps) {

    const bmi = (weight / Math.pow((height / 100), 2)).toFixed(1);
    const avgWeight = sex == 1 ? (Math.pow((height / 100), 2) * 22).toFixed(1) : (Math.pow((height / 100), 2) * 21).toFixed(1);

    return (
        <BmiContainer>
            <BmiTitleContainer>
                <BmiTitle>BMI</BmiTitle>
            </BmiTitleContainer>
            <BmiChartContainer>
                <BmiChart bmi={Number(bmi)} />
                <BmiExplain>
                    <Explain>*회원님의 BMI 지수는 {bmi}입니다*</Explain>
                </BmiExplain>
                <BmiExplain>
                    <Explain>*회원님의 신장의 평균 체중은 {avgWeight}kg입니다*</Explain>
                </BmiExplain>
            </BmiChartContainer>
        </BmiContainer>
    );
};

const BmiContainer = styled.div`    
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;    
    align-items: center;
`;

const BmiTitleContainer = styled.div`
    width: 100%;    
`;

const BmiTitle = styled.h2`    
    margin-top: 20px;
    margin-left: 2%;
`;

const BmiChartContainer = styled.div`
    width: 95%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 20px;
    background-color: var(--bs-dark);
    border-radius: 10px;
    display: flex;
    flex-direction: column;    
    align-items: center;
`


const BmiExplain = styled.div`
`

const Explain = styled.span`
    font-size: 1rem;
    color: var(--bs-gray-600);
    @media (max-width: 480px) {
        font-size: 0.8rem;
    }
    @media (max-width: 280px) {
        font-size: 0.7rem;
    }
`