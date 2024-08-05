import { getBodyInfo } from "@/api/body/body";
import { IBodyInfo } from "@/interfaces/user.interface";
import { getAccessToken } from "@/service/token.service";
import { useEffect, useState } from "react";
import styled from "styled-components";
import StatisticsGraph from "./graph/graph";
import StatisticsList from "./list/list";
import StatisticsTitle from "./title";

interface IStatisticsProps {
    body: IBodyInfo[];
}

export interface IStatisticsDataProps {
    body: IBodyInfo[];
    title: string;
}

export default function MyBodyInfoStatisticsSection({ body }: IStatisticsProps) {

    const [bodyData, setBodyData] = useState<IBodyInfo[]>(body);
    const [dataView, setDataView] = useState<string>("graph");
    const [title, setTitle] = useState<string>("전체기간");

    useEffect(() => {
        dataSetByTitle(title);
    }, [title])

    const dataSetByTitle = async (title: string) => {
        const data = await getBodyInfo(getAccessToken(), title);

        if (data) {
            setBodyData(data.bodyInfos);
        }
    }

    return (
        <>
            <StatisticsContainer>
                <StatisticsTitle dataView={dataView} setDataView={setDataView} title={title} setTitle={setTitle} />
                {dataView === 'graph' ? <StatisticsGraph body={bodyData} />
                    : dataView === 'list' ? <StatisticsList body={bodyData} />
                        : null}
            </StatisticsContainer>
        </>
    )
}

const StatisticsContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;    
    align-items: center;
`;