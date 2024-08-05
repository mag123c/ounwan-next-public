import { useInvertedData } from "@/hooks/useInvert";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ResponsiveBump = dynamic(() => import('@nivo/bump').then(mod => mod.ResponsiveBump), { ssr: false });

export default function NivoBumpGraph({ data }: any) {

    const invertedData = useInvertedData(data);

    const [chartStyle, setChartStyle] = useState({
        lineWidth: 3,
        activeLineWidth: 6,
        pointSize: 10,
        activePointSize: 16,
        top: 40,
        right: 60,
        bottom: 40,
        left: 60,
    });
    const [tooltipStyle, setTooltipStyle] = useState({
        fontSize: '1rem',
    });

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 480) {
                setChartStyle({
                    lineWidth: 1,
                    activeLineWidth: 3,
                    pointSize: 4,
                    activePointSize: 8,
                    top: 10,
                    right: 10,
                    bottom: 20,
                    left: 30,
                });
                setTooltipStyle({
                    fontSize: '0.5rem',
                });
            }
            else if (window.innerWidth < 576) {
                setChartStyle({
                    lineWidth: 1,
                    activeLineWidth: 3,
                    pointSize: 4,
                    activePointSize: 8,
                    top: 40,
                    right: 60,
                    bottom: 40,
                    left: 60,
                });
                setTooltipStyle({
                    fontSize: '0.6rem',
                });
            }
            else if (window.innerWidth < 768) {
                setChartStyle({
                    lineWidth: 2,
                    activeLineWidth: 4,
                    pointSize: 6,
                    activePointSize: 10,
                    top: 20,
                    right: 50,
                    bottom: 20,
                    left: 40,
                });
                setTooltipStyle({
                    fontSize: '0.8rem',
                });
            }
            else {
                setChartStyle({
                    lineWidth: 3,
                    activeLineWidth: 6,
                    pointSize: 10,
                    activePointSize: 16,
                    top: 40,
                    right: 60,
                    bottom: 40,
                    left: 60,
                });
                setTooltipStyle({
                    fontSize: '1rem',
                });
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const color = data[0]?.id === '체중' ? 'set1' : data[0]?.id === '근육량' ? 'nivo' : 'blues';


    const theme = {
        axis: {
            ticks: {
                text: {
                    fill: '#ffffff'
                }
            },
            legend: {
                text: {
                    fill: '#ffffff'
                }
            }
        }
    };

    return (
        <NivoContainer>
            {data[0].data?.length > 0 ? (
                <ResponsiveBump
                    data={invertedData}
                    colors={{ scheme: color }}
                    tooltip={({ serie }) => (
                        <ToolTip style={{
                            color: '#fff',
                            background: '#333',
                            padding: '5px 10px',
                            borderRadius: '10px',
                            boxShadow: '0px 2px 4px rgba(0,0,0,0.5)',
                            fontSize: tooltipStyle.fontSize
                        }}>
                            {serie.points.map((point) => {
                                const split = (point?.data?.x as string).split('-');
                                const dataX = `${split[0]?.slice(2)}.${split[1]}.${split[2]}`;
                                const dataY = (point?.data?.y as number) * -1;
                                return (
                                    <div key={`${dataX}-${dataY}`}>
                                        {dataX} / {dataY}{serie.id === '체지방' ? '%' : 'kg'}
                                    </div>
                                )
                            })}
                        </ToolTip>
                    )}
                    theme={theme}
                    lineWidth={chartStyle.lineWidth}
                    activeLineWidth={chartStyle.activeLineWidth}
                    inactiveLineWidth={0}
                    inactiveOpacity={0.15}
                    pointSize={chartStyle.pointSize}
                    activePointSize={chartStyle.activePointSize}
                    inactivePointSize={0}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={3}
                    activePointBorderWidth={3}
                    pointBorderColor={{ from: 'serie.color' }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '',
                        legendPosition: 'middle',
                        legendOffset: -40,
                        truncateTickAt: 0,
                        format: (value: number) => value * -1
                    }}
                    margin={{ top: chartStyle.top, right: chartStyle.right, bottom: chartStyle.bottom, left: chartStyle.left }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={null}
                />
            ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>데이터가 없습니다</div>
            )}
        </NivoContainer>
    )
}

const NivoContainer = styled.div`
    width: 90%;
    max-width: 768px;
    height: 500px;
    margin: 20px auto;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 1);
    padding: 20px;


    @media (max-width: 768px) {
        width: 100%;
        height: 400px;
    }
    @media (max-width: 480px) {
        height: 300px;
    }
`

const ToolTip = styled.div`
`