import styled from 'styled-components';

interface IGrassProps {
    exerciseDates: string[];
}

export default function Grass({ exerciseDates }: IGrassProps) {
    const year = 2024;
    const startDay = new Date(year, 0, 0).getDay();
    const daysInYear = isLeapYear(year) ? 366 : 365;

    // 2024년의 모든 날짜 생성 및 날짜 정보 처리
    const daysArray: (string | null)[] = new Array(startDay).fill(null);
    for (let i = 0; i < daysInYear; i++) {
        const date = new Date(year, 0, i + 1);
        daysArray.push(date.toISOString().split('T')[0]);
    }

    // 윤년 검사 함수
    function isLeapYear(year: number): boolean {
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    }

    // 주별 데이터 배열 생성
    const weeks: (string | null)[][] = [];
    while (daysArray.length > 0) {
        weeks.push(daysArray.splice(0, 7));
    }

    return (
        <GrassContainer>
            {weeks.map((week, weekIndex) => (
                <WeekColumn
                    key={weekIndex}
                    data-key={`week-${weekIndex + 1}`}
                >
                    {week.map((day, dayIndex) => (
                        <Day
                            key={dayIndex}
                            data-key={day}
                            isExercised={day ? exerciseDates.includes(day) : false}
                            isVisible={day ? new Date(day).getFullYear() === year : false}
                        />
                    ))}
                </WeekColumn>
            ))}
        </GrassContainer>
    );
};

const GrassContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const WeekColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Day = styled.div<{ isExercised: boolean | null, isVisible: boolean }>`
  width: 10px;
  height: 10px;
  margin: 2px;
  background-color: ${props => props.isExercised ? '#4caf50' : '#eee'};
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
`;