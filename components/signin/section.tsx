import { ImageItems } from "@/interfaces/image.interface";
import styled from "styled-components";
import { SignInIcon } from "./components/icon";

export interface ISigninData {
    userId: string;
    nickname: string
}

const imageItems: ImageItems[] = [
    { href: '/kakao', src: '/icon/portal/kakao.png', alt: 'kakao' },
    { href: '/naver', src: '/icon/portal/naver.png', alt: 'naver' },
    { href: '/google', src: '/icon/portal/google.svg', alt: 'google' },
];

function SigninSection() {

    return (
        <SigninContainer>
            <TextMessage>로그인</TextMessage>
            <SignInIcon imageItems={imageItems} />
        </SigninContainer>
    );
}

export default SigninSection;

export const SigninContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    height: 100vh;
`
export const TextMessage = styled.h1`
    margin: 20px;
`