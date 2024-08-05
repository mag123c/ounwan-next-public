import { ImageItemsProps } from '@/interfaces/image.interface';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import styled from 'styled-components';

interface MenuItemContainerProps {
  width: string;
}

export const FooterMenu = ({ imageItems }: ImageItemsProps) => {

  const black = 'brightness(0%) contrast(100%)'
  const white = 'brightness(200%) contrast(100%) invert(100%)'
  const gray = 'brightness(50%) contrast(90%) invert(40%) sepia(20%) saturate(3000%) hue-rotate(210deg) grayscale(100%) '
  const widthPercentage = 100 / imageItems.length;

  const router = useRouter();
  const [pathname, setPathname] = useState<string>('');

  useEffect(() => {
    setPathname(router.pathname);
  })

  return (
    <NavContainer>
      {imageItems.map(item => (
        <MenuItemContainer href={item.href} key={item.href} passHref width={`calc(${widthPercentage}% - 10px)`}>
          <Nav.Link as="div" className='ms-5 me-5'>
            <Container>
              <MenuContainer>
                <Image
                  src={item.src}
                  width={20}
                  height={20}
                  alt={item.alt}
                  style={{ filter: pathname == item.href ? white : gray }}
                />
              </MenuContainer>
              <MenuContainer className="text-center">
                <Text>{item.text}</Text>
              </MenuContainer>
            </Container>
          </Nav.Link>
        </MenuItemContainer>
      ))}
    </NavContainer>
  )
};

const NavContainer = styled(Nav)`
  width: 100%;
  display: flex;
  justify-content: center;
  
  @media (max-width: 576px) {
    max-width: 100%;
    padding: 0 10px;
    justify-content: center;
  }
`

const MenuItemContainer = styled(Link) <MenuItemContainerProps>`
  display: flex;
  justify-content: center;
  text-decoration: none;
  margin: 5px;
  width: ${({ width }) => width};
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  width: 100%;    



  @media (max-width: 576px) {
    display: flex;
    font-size: 0.8rem;
  }
`;

const Text = styled.span`
  margin-top: 5px;
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
  @media (max-width: 576px) {
    font-size: 0.7rem;
  }
`