import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import StatisticsSlide from "./slide";

interface IStatisticsTitleProps {
    dataView: string;
    setDataView: (value: string) => void;
    title: string;
    setTitle: (value: string) => void;
}

export default function StatisticsTitle( { dataView, setDataView, title, setTitle }: IStatisticsTitleProps ) {

    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
        <StatisticsTitleContainer>
            <TitleContainer>
                <Title>
                    {title === '전체기간' ? (
                        <span style={{ color: 'var(--bs-warning)' }}>{title}</span>
                    ) : (
                        <>
                            <span style={{ color: 'white' }}>최근 </span>
                            <span style={{ color: 'var(--bs-warning)' }}>{title}</span>
                        </>
                    )}
                </Title>
                <SpanButton
                    src={"/icon/btn/arrow-down.svg"}
                    alt="arrow"
                    width={30}
                    height={30}
                    onClick={() => setIsVisible(!isVisible)}
                />
            </TitleContainer>
            <DataBtnContainer>
                <DataViewBtn
                    src={dataView == 'graph' ? "/icon/btn/graph-selected.svg" : "/icon/btn/graph.svg"}
                    alt="graph"
                    width={30}
                    height={30}
                    onClick={() => setDataView('graph')}
                />
                <DataViewBtn
                    src={dataView == 'list' ? "/icon/btn/list-selected.svg" : "/icon/btn/list.svg"}
                    alt="list"
                    width={30}
                    height={30}
                    onClick={() => setDataView('list')}
                />
            </DataBtnContainer>
            {isVisible && <StatisticsSlide visible={isVisible} setIsVisible={setIsVisible} title={title} setTitle={setTitle} />}
        </StatisticsTitleContainer>
    )
}

const StatisticsTitleContainer = styled.div`
    width: 100%;    
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    width: 60%;
`

const DataBtnContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 2%;
    width: 40%;
`

const Title = styled.h2`
    margin-top: 20px;
    margin-left: 2%;
    @media (max-width: 768px) {
        font-size: 1.5rem;    
    }
    @media (max-width: 576px) {
        font-size: 1.2rem;    
    }
`;

const SpanButton = styled(Image)`
    cursor: pointer;
    margin-top: 2%;
    margin-left: 1%;
    @media (max-width: 768px) {
        width: 25px;
        height: 25px;
    }
    @media (max-width: 576px) {
        width: 20px;
        height: 20px;
    }    
    @media (max-width: 375px) {
        margin-top: 5%;
    }
`;

const DataViewBtn = styled(Image)`
    cursor: pointer;
    margin-top: 2%;
    margin-left: 1%;
    margin-right: 1%;
    @media (max-width: 966px) {
        margin-left: 2%;
        margin-right: 2%;
    }
    @media (max-width: 768px) {
        width: 25px;
        height: 25px;
    }
    @media (max-width: 576px) {
        width: 20px;
        height: 20px;
    }
    @media (max-width: 375px) {
        margin-top: 5%;
        margin-left: 3%;
        margin-right: 3%;
    }
`;
