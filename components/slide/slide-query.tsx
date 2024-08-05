import { ITargetInfo } from '@/interfaces/exercise.interface';
import { animated } from 'react-spring';
import styled from 'styled-components';

interface ISlideQueryProps {
    isTarget: boolean;
    items: ITargetInfo['name'];
    selectedItem: string;
    onSelectItem: (item: string) => void;
    x: any;
    bind: any;
}

const SlideQueryList = ({ isTarget, items, selectedItem, onSelectItem, x, bind }: ISlideQueryProps) => {

    return (
        <SlideQueryContainer {...bind()} style={{ transform: x.to((x: any) => `translateX(${x}px)`) }}>
            {items.map((item, index) => (
                <SlideQuery
                    key={index}
                    $isActive={selectedItem === item}
                    $isTarget={isTarget}
                    onClick={() => onSelectItem(item)}
                    $isLast={index === items.length - 1}>
                    {item}
                </SlideQuery>
            ))}
        </SlideQueryContainer>
    );
};

export default SlideQueryList;

const SlideQueryContainer = styled(animated.div)`
    max-width: none;
    width: 100%;
    margin-left: 10px;
    display: flex;
    justify-content: flex-start;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    padding: 10px 0;
    cursor: grab;

    /* firefox, IE, (Chrome + Safari, Opera) 스크롤 숨기기 */
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar { 
        display: none;
    }
`

const SlideQuery = styled.span<{ $isActive: boolean, $isTarget: boolean, $isLast: boolean }>`
    font-size: 1rem;
    margin: 0 15px;
    padding: 0 5px;
    white-space: nowrap;
    cursor: pointer;    
    color: ${props => props.$isTarget && props.$isActive ? 'var(--bs-danger)' :
        props.$isActive ? 'var(--bs-warning)' : 'white'};
    margin-right: ${props => props.$isLast ? '10%' : '15px'};

    @media (max-width: 576px) {
        font-size: 1rem;
    }
    @media (max-width: 375px) {
        font-size: 0.7rem;
    }    
`;