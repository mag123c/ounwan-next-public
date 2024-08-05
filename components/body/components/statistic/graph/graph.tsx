import { IBodyInfo, IBodyInfoProps } from "@/interfaces/user.interface";
import { useEffect, useState } from "react";
import styled from "styled-components";
import GraphSection from "./graph-data";

export interface IExtractData {
    createdAt: string;
    data: number;
}

export default function StatisticsGraph({ body }: IBodyInfoProps) {

    const [weightData, setWeightData] = useState<IExtractData[]>([]);
    const [muscleMassData, setMuscleMassData] = useState<IExtractData[]>([]);
    const [fatData, setFatData] = useState<IExtractData[]>([]);

    useEffect(() => {
        extractData(body);
    }, [body]);

    const extractData = (body: IBodyInfo[]): void => {
        let weightData = []; // Initialize weightData as an empty array
        let muscleMassData = [];
        let fatData = [];

        if (body) {
            for (let data of body) {
                if (data.weight) {
                    weightData.push({ createdAt: data.createdAt.toString().split("T")[0], data: data.weight });
                }
                if (data.muscleMass) {
                    muscleMassData.push({ createdAt: data.createdAt.toString().split("T")[0], data: data.muscleMass });
                }
                if (data.fat) {
                    fatData.push({ createdAt: data.createdAt.toString().split("T")[0], data: data.fat });
                }
            }
            setWeightData(weightData);
            setMuscleMassData(muscleMassData);
            setFatData(fatData);
        }
    }

    return (
        <GraphContainer>
            <>
                <GraphSection weightData={weightData} muscleMassData={muscleMassData} fatData={fatData} title={["체중", "근육량", "체지방"]} />
            </>
        </GraphContainer>
    )
}

const GraphContainer = styled.div`
    width: 100%;
    background-color: transparent;
    display: flex;
    flex-wrap: wrap;
`