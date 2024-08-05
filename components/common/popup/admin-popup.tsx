import { Button } from "react-bootstrap";
import styled from "styled-components";

interface IAdminPopupProps {
    isAdminPopup: boolean;
    setIsAdminPopup: (value: boolean) => void;
    isAddDataSlideVisible: boolean;
    setIsAddDataSlideVisible: (value: boolean) => void;
    isModifyDataSlideVisible: boolean;
    setIsModifyDataSlideVisible: (value: boolean) => void;
}

export default function AdminPopup(
    { isAdminPopup, setIsAdminPopup, isAddDataSlideVisible, setIsAddDataSlideVisible, isModifyDataSlideVisible, setIsModifyDataSlideVisible }: IAdminPopupProps
) {

    return (
        <AdminPopupContainer>
            <XBtn variant="danger" onClick={() => setIsAdminPopup(!isAdminPopup)}>X</XBtn>
            <AddBtn variant="light" onClick={() => {
                setIsAdminPopup(!isAdminPopup);
                setIsAddDataSlideVisible(!isAddDataSlideVisible)}
            }>
                운동추가
            </AddBtn>
            <ModifyBtn variant="dark" onClick={() => {
                setIsAdminPopup(!isAdminPopup);
                setIsModifyDataSlideVisible(!isModifyDataSlideVisible)}
            }>
                운동수정
            </ModifyBtn>
        </AdminPopupContainer>
    )
}

const AdminPopupContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 30%;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;


const XBtn = styled(Button)`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 35px;
    height: 35px;
    text-align: center;
    padding: 10px;
    font-size: 0.7rem !important;
`;


const AddBtn = styled(Button)`
    width: 100px;
    height: 40px;
    margin: 1rem;
    font-size: 1rem;
    @media (max-width: 576px) {
        width: 80px;
        height: 30px;    
        font-size: 0.7rem !important;            
    }
    @media (max-width: 375px) {
        width: 60px;
        height: 25px;    
        font-size: 0.5rem !important; 
    }
`
const ModifyBtn = styled(Button)`
    width: 100px;
    height: 40px;
    margin: 1rem;
    font-size: 1rem;
    @media (max-width: 576px) {
        width: 80px;
        height: 30px;    
        font-size: 0.7rem !important;            
    }
    @media (max-width: 375px) {
        width: 60px;
        height: 25px;    
        font-size: 0.5rem !important; 
    }
`
