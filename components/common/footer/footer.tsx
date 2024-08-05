import { ImageItems } from '@/interfaces/image.interface';
import { Container, Navbar, NavbarCollapse } from 'react-bootstrap';
import styled from 'styled-components';
import { FooterMenu } from './menu';

function Footer() {
  const imageItems: ImageItems[] = [
    { href: '/main', src: '/icon/menu/home.svg', alt: 'main', text: '홈' },    
    { href: '/workout', src: '/icon/menu/workout.svg', alt: 'workingout', text: '운동' },
    { href: '/body', src: '/icon/menu/weight.svg', alt: 'weight', text: '체중'},
    // { href: '/meal', src: '/icon/menu/meal.svg', alt: 'meal', text: '식사' },    
  ];

  return (
    <>
      <FooterBar expand={true}>
        <Container className='d-flex justify-content-center'>
          <Collaspe id="basic-navbar-nav">
            <FooterMenu imageItems={imageItems}/>
          </Collaspe>
        </Container>
      </FooterBar>
    </>
  );
}

export default Footer;

const FooterBar = styled(Navbar)`
  background-color: var(--bs-dark);
  border-top: 1px solid var(--bs-dark);
  border-radius: 20px 20px 0 0;
  margin: 0 auto;
  position: fixed !important;
  bottom: -2%;
  width: 100%;
`

const Collaspe = styled(NavbarCollapse)`
  width: 100%;
  display: flex;
  justify-content: space-between;  
`