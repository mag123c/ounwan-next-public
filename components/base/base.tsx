import Footer from "@/components/common/footer/footer";
import HeadMeta from "@/components/common/meta/head";
import { removeTokens } from "@/service/token.service";
import Image from 'next/image';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface BaseComponentsProps {
    title: string;
    description: string;
    image: string;
    url: string;
    role: string;
}

function BaseComponents({ title, description, image, url, role }: BaseComponentsProps) {

    const router = useRouter();
    const [isRole, setIsRole] = useState<boolean>(false);

    useEffect(() => {
        if (role && role == 'admin') {
            setIsRole(true);
        }
    }, [role])

    function handleLogout() {
        removeTokens();
        router.push('/signin');
    }

    return (
        <>
            <HeadMeta title={title} description={description} image={image} url={url} />
            <LogoutBtn 
                src='/icon/btn/logout.svg'
                alt='logout'
                width={15}
                height={15}
                onClick={handleLogout}
                $visible={true}
            />
            {/* <Navb /> */}
            <Footer />
        </>
    )
}

export default BaseComponents;

const LogoutBtn = styled(Image) <{ $visible: boolean }>`
    font-size: 0.6rem !important;    
    position: fixed;
    top: 2%;
    right: 2%;
    display: ${props => props.$visible ? 'block' : 'none'} !important;
    cursor: pointer;
`