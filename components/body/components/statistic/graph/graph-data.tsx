import styled from "styled-components";
import { IExtractData } from "./graph";
import NivoBumpGraph from './nivo-bump';

interface IGraphSectionProps {
    weightData: IExtractData[];
    muscleMassData: IExtractData[];
    fatData: IExtractData[];
    title: string[]
}

export interface INivoData {
    id: string;
    data: { x: string, y: number }[]
}

export default function GraphSection({ weightData, muscleMassData, fatData, title }: IGraphSectionProps) {

    const wegitNivo: INivoData[] = [
        {
            id: title[0],
            data: weightData.map((item) => ({ x: item.createdAt, y: item.data })).reverse()
        }
    ];
    const muscleMassNivo: INivoData[] = [
        {
            id: title[1],
            data: muscleMassData.map((item) => ({ x: item.createdAt, y: item.data })).reverse()
        }
    ];
    const fatNivo: INivoData[] = [
        {
            id: title[2],
            data: fatData.map((item) => ({ x: item.createdAt, y: item.data })).reverse()
        }
    ]

    return (
        <GraphContainer>
            <GraphDetailContainer>
                <Title>{title[0]}</Title>
                <NivoBumpGraph data={wegitNivo} />
            </GraphDetailContainer>
            <GraphDetailContainer>
                <Title>{title[1]}</Title>
                <NivoBumpGraph data={muscleMassNivo} />
            </GraphDetailContainer>
            <GraphDetailContainer>
                <Title>{title[2]}</Title>
                <NivoBumpGraph data={fatNivo} />
            </GraphDetailContainer>
        </GraphContainer>
    )
}

const GraphContainer = styled.div`
    width: 100%;
    background-color: transparent;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`

const GraphDetailContainer = styled.div`
    width: 100%;
    background-color: transparent;    
`

const Title = styled.div`
    width: 100%;        
    font-size: 1.5rem;
    color: white;
    margin-left: 2rem;
    margin-top: 2rem;

    @media screen and (max-width: 768px) {
        font-size: 1.2rem;
        margin-left: 1rem;
    }
    @media screen and (max-width: 576px) {
        font-size: 1rem;        
    }
    @media screen and (max-width: 360px) {
        margin-left: 0.5rem;
    }
`