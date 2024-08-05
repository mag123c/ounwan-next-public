import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from 'react-bootstrap';


export const NavbarBrand = () => (

    <Navbar.Brand as={Link} href="signin">
        <Image
            src='/icon.png'
            width={30}
            height={30}
            className="d-inline-block align-top me-3"
            alt="app.ounwan.net"
        />
    </Navbar.Brand>
);
