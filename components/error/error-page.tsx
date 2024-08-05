import HeadMeta from "@/components/common/meta/head";
import GlobalStyle from "@/styles/globalStyle";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";

function ErrorPage({ code, message }: any) {

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 1000);
  }, [])

  return (
    <>
      <HeadMeta title="" description="" image="" url="" />      
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

export default ErrorPage;

const ErrorContainer = styled.div`
  width: 100%;
  height: 100vh;
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
  font-size: 1.5rem;
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
  font-size: 1rem;
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