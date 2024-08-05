import styled from "styled-components";

interface IBmiProps {
    bmi: number;
}

interface ILabelProps {
    position: string;
}

interface IMarkerProps {
    left: string;
}

export default function BodyInfoBmiSection({ bmi }: IBmiProps) {
    const calculateBmiPercentage = (bmi: number): number => {
        const totalRange = 40;
        const percentage = (bmi / totalRange) * 100;
        return percentage;
    };

    const bmiPercentage = calculateBmiPercentage(bmi);

    return (
        <BmiChartContainer>
            <BmiScaleContainer>
                <Marker left={`${bmiPercentage}%`} />
            </BmiScaleContainer>
            <BmiLabels>
                <Label position="0%" data-label="0">0</Label>
                <Label position={`${(18.5 / 40) * 100}%`} data-label="18.5">18.5</Label>
                <Label position={`${(23 / 40) * 100}%`} data-label="23">23</Label>
                <Label position={`${(25 / 40) * 100}%`} data-label="25">25</Label>
                <Label position={`${(30 / 40) * 100}%`} data-label="30">30</Label>
                <Label position="100%" data-label="40">40</Label>
            </BmiLabels>
        </BmiChartContainer>
    );
}

const BmiChartContainer = styled.div`
    width: 90%;
    margin-top: 20px;
    margin-bottom: 30px;
    @media (max-width: 576px) {
        margin-bottom: 20px;
    }
    @media (max-width: 375px) {
        margin-bottom: 10px;
    }
`

const BmiScaleContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 20px;
  background: linear-gradient(
    to right,
    #81d4fa 0%, #81d4fa ${(18.5 / 40) * 100}%,
    #4caf50 ${(18.5 / 40) * 100}%, #4caf50 ${(23 / 40) * 100}%,
    #ffeb3b ${(23 / 40) * 100}%, #ffeb3b ${(25 / 40) * 100}%,
    #ff9800 ${(25 / 40) * 100}%, #ff9800 ${(30 / 40) * 100}%,
    #f44336 ${(30 / 40) * 100}%, #f44336 100%
  );
`;

const Marker = styled.div<IMarkerProps>`
    position: absolute;    
    top: -10px;
    height: 40px;
    width: 2px;
    background-color: white;
    left: ${props => props.left};
`;

const BmiLabels = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  padding-top: 5px;
`;

const Label = styled.div<ILabelProps>`
  position: absolute;
  font-size: 1rem;
  left: ${(props) => props.position};
  transform: translateX(-50%);

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
  @media (max-width: 375px) {
    &:not([data-label="0"]):not([data-label="40"]) {
        display: none;
      }
  }
  @media (max-width: 375px) {
    font-size: 0.7rem;
  }
  @media (max-width: 280px) {
    font-size: 0.6rem;
  }

`;