import HeadMeta from "@/components/common/meta/head";
import GlobalStyle from "@/styles/globalStyle";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Navb from "../common/footer/footer";

function Error403Page({ code, message }: any) {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const authCookie = document.cookie.split(';').some((item) => item.trim().startsWith('auth='));

    const checkAuthCookie = () => {
      const insertCode = prompt('인증 코드를 입력하세요.');
      if (process.env.NEXT_PUBLIC_AUTH_CODE == insertCode) {
        document.cookie = 'auth=true; path=/; max-age=3600000; samesite=strict';
        router.push(`${process.env.NEXT_PUBLIC_NEXT_URL}/main`);router.push('/main');
        setAuth(true);
      }

      else {
        router.push(`${process.env.NEXT_PUBLIC_NEXT_URL}/403`);
        setAuth(false);
      }
    };

    if (authCookie) {
      router.push(`${process.env.NEXT_PUBLIC_NEXT_URL}/main`);
    }
    else checkAuthCookie();    
  }, [router.pathname]);


  return (
    <>
      <HeadMeta title="" description="" image="" url="" />
      <Navb />
      <ErrorContainer>
        <ErrorWrapper>
          <ErrorTitle>{code}</ErrorTitle>
          <ErrorMessage>{message}</ErrorMessage>
        </ErrorWrapper>
        <GlobalStyle />
      </ErrorContainer>
    </>

  );
}

export default Error403Page;

const ErrorContainer = styled.div`
  position: relative;
  height: 60vh;
}
`;

const ErrorWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 710px;
  width: 100%;
  text-align: center;
  padding: 0px 15px;
  line-height: 1.4;
`;

const ErrorTitle = styled.h1`
  font-size: 10rem;
  margin: 0px;
  color: red;
  text-transform: uppercase;

  @media (max-width: 560px) {
    font-size: 7rem;
  }
  @media (max-width: 400px) {
    font-size: 5rem;  
  }
  @media (max-width: 375px) {
    font-size: 4rem;    
  }
  @media (max-width: 200px) {
    font-size: 3rem;    
  }
`;

const ErrorMessage = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  text-transform: uppercase;
  color: #222;
  margin: 0;

  @media (max-width: 560px) {
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    font-size: 1.2rem;  
  }
  @media (max-width: 375px) {
    font-size: 1rem;  
  }
  @media (max-width: 200px) {
    font-size: 0.7rem;  
  }
`;