import { geOauthFromKakao, getOauthFromGoogle, getOauthFromNaver } from "@/api/user/user";
import useSocialLogin from "@/hooks/useSocialLogin";
import { ImageItemsProps } from "@/interfaces/image.interface";
import Image from 'next/image';
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import styled from "styled-components";

interface ILoginProps {
    ref: React.RefObject<HTMLDivElement>;
    id: string;
}

interface ILoginIconProps {
    alt: string;
}

export function SignInIcon({ imageItems }: ImageItemsProps) {

    const naverRef = useRef<HTMLDivElement>(null);
    const googleRef = useRef<HTMLDivElement>(null);

    const router = useRouter();

    useEffect(() => {
        naverInit();
    }, [])

    const naverInit = () => {
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
            callbackUrl: `${process.env.NEXT_PUBLIC_SNS_LOGIN_REDIRECT_URL}/sns_type=2`,
            isPopup: false,
            loginButton: { color: "green", type: 3, height: 40 },
        });
        naverLogin.init();
    }

    const handleIconClick = async (href: string) => {
        switch (href.slice(1)) {
            case 'kakao':
                await geOauthFromKakao();
                break;
            case 'naver':
                await getOauthFromNaver();
                break;
            case 'google':
                await getOauthFromGoogle();
                break;
        }
    }


    const handleNaverLogin = () => {
        (naverRef.current as unknown as HTMLElement)?.click();
    }
    const handleGoogleLogin = () => {
        (googleRef.current as unknown as HTMLElement)?.click();
    }

    useSocialLogin(router.query.snsType as string);

    return (
        <>
            {imageItems.map((item, index) => (
                <ImageContainer key={index} onClick={() => handleIconClick(item.href)}>
                    {item.alt === 'naver' ?
                        (
                            <>
                                <CustomLoginContainer ref={naverRef} id="naverIdLogin" />
                                <NaverBtn onClick={handleNaverLogin}>
                                    <NaverIcon alt="navericon" />
                                    <NaverTitle>네이버로 로그인</NaverTitle>
                                </NaverBtn>
                            </>
                        )
                        : item.alt === 'google' ? 
                            (
                                <>
                                    <CustomLoginContainer ref={googleRef} id="googleIdLogin" />
                                    <GoogleBtn onClick={handleGoogleLogin}>
                                        <GoogleIcon alt="googleIcon" />
                                        <GoogleTitle>구글로 로그인</GoogleTitle>
                                    </GoogleBtn>
                                </>
                            )
                            : (
                                <CustomImage
                                    src={item.src}
                                    width={180}
                                    height={50}
                                    alt={item.alt}
                                    style={{ cursor: "pointer", borderRadius: "10px" }}
                                />
                            )}
                </ImageContainer>
            ))}
        </>
    )
}

const ImageContainer = styled.div`
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const CustomLoginContainer = styled.div<ILoginProps>`
    display: none;
`

const NaverBtn = styled.button`
	display: flex;
	align-items: center;
	width: 180px;
	height: 50px;    
	background-color: #03c75a;
    border: none;
	border-radius: 6px;
`

const GoogleBtn = styled.button`
	display: flex;
	align-items: center;
	width: 180px;
	height: 50px;    
	background-color: #F2F2F2;
    border: none;
	border-radius: 6px;
`

const NaverIcon = styled.div<ILoginIconProps>`
	width: 30px;
	height: 30px;
    background: url('/icon/portal/naverIcon.png') no-repeat center;
	background-size: 30px;
`

const GoogleIcon = styled.div<ILoginIconProps>`
	width: 30px;
	height: 30px;
    background: url('/icon/portal/googleIcon.png') no-repeat center;
	background-size: 30px;
    border: none;
`

const NaverTitle = styled.span`
	color: white;
    margin-left: 15px;
	font-weight: 400;
	font-size: 1rem;
	line-height: 24px;
`

const GoogleTitle = styled.span`
	color: black;
    margin-left: 25px;
	font-weight: 400;
	font-size: 1rem;
	line-height: 24px;
`

const CustomImage = styled(Image)`
    @media(max - width: 260px) {
        width: 150px
        height: 35px;
    }
`