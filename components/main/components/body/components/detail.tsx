import { IIconItems } from "@/interfaces/image.interface";
import Image from 'next/image';
import styled from "styled-components";
import { IBodyInfoProps } from "../bodyInfo";

const imageItems: IIconItems[] = [
    {
        src: '/icon/main/height.png',
        alt: 'height'
    },
    {
        src: '/icon/main/weight.png',
        alt: 'weight'
    }
];

export default function BodyInfoDetailSection({ height, weight }: IBodyInfoProps) {

    return (
        <ImageContainer>
            {imageItems.map((item, index) => (
                <BodyInfoDetailContainer key={index}>
                    <CustomImage
                        className="mb-1 mt-1"
                        style={{ cursor: "pointer", borderRadius: "10px" }}
                        src={item.src}
                        width={30}
                        height={30}
                        alt={item.alt}
                        key={index}
                    />
                    <BodyInfoSpan>{item.alt === 'height' ? `키 : ${height}` : `체중 : ${weight}`}</BodyInfoSpan>
                </BodyInfoDetailContainer>
            ))}
        </ImageContainer>
    );
};



const ImageContainer = styled.div`
    margin-top: 20px;
    margin-bottom: 10px;
    width: 70%;
    display: flex;    
    justify-content: space-between;
    align-items: center;

    @media (max-width: 480px) {
        width: 80%;
    }
    @media (max-width: 375px) {
        width: 90%;
    }
    @media (max-width: 375px) {
        flex-direction: column;
    }
`
const BodyInfoDetailContainer = styled.div`
@media (max-width: 375px) {
    margin: 5px;
}
`

const CustomImage = styled(Image)`
    @media (max-width: 480px) {
        width: 25px;
        height: 25px;
    }
    @media (max-width: 375px) {
        width: 20px;
        height: 20px;
    }
`

const BodyInfoSpan = styled.span`
    font-size: 1.5rem;   

    @media (max-width: 480px) {
        font-size: 1.2rem;
    }
    @media (max-width: 375px) {
        font-size: 1rem;
    }
`