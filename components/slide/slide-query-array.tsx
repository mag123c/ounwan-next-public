import { animated } from 'react-spring';
import styled from 'styled-components';

interface ISlideQueryProps {
    items: string[];
    selectedItems: string[];
    onSelectItem: (item: string) => void;
    x: any;
    bind: any;
}

const SlideQueryArrays = ({ items, selectedItems, onSelectItem, x, bind }: ISlideQueryProps) => {

    return (
        <SlideQueryContainer {...bind()} style={{ transform: x.to((x: any) => `translateX(${x}px)`) }}>
            {items.map((item, index) => (
                <SlideQuery key={index} $isActive={selectedItems.includes(item)} onClick={() => onSelectItem(item)}>
                    {item}
                </SlideQuery>
            ))}
        </SlideQueryContainer>
    );
};

export default SlideQueryArrays;

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

const SlideQuery = styled.span<{ $isActive: boolean }>`
    margin: 0 10px;
    padding: 0 5px;
    white-space: nowrap;
    cursor: pointer;
    color: ${props => props.$isActive ? 'red' : 'white'};
    @media (max-width: 375px) {
        font-size: 0.6rem;
    }
`;