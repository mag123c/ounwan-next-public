import Image from "next/image";
import styled from "styled-components";

export default function BodyInfoTitleSection({ onClick, isVisible }: { onClick: () => void; isVisible: boolean; }) {
  return (

    <BodyInfoTitleContainer onClick={onClick}>
      <BodyInfoTitle>신체 정보</BodyInfoTitle>
      <SpanButton
        src={isVisible ? "/icon/btn/arrow-up.svg" : "/icon/btn/arrow-down.png"}
        alt="arrow"
        width={30}
        height={30}
      />
    </BodyInfoTitleContainer>
  );
};

const BodyInfoTitleContainer = styled.div`    
  margin: 20px;
  cursor: pointer;
`;

const BodyInfoTitle = styled.h2`    
  position: absolute;
  top: 5px;
  left: 5px;  
  padding: 10px;
`;

const SpanButton = styled(Image)`
  position: absolute;
  top: 5px;
  right: 5px;    
  background-color: var(--bs-light);
`;
