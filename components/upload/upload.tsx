import { addWorkoutAPI } from "@/api/exercise/exercise";
import { IUserInfoProps } from "@/interfaces/user.interface";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import styled from "styled-components";
import { common500Alert } from "../common/sweetalert/500.alert";
import { commonDoneAlert } from "../common/sweetalert/component.alert";
import SlideQueryArrays from "../slide/slide-query-array";
import { UploadButton } from "./components/btn";

interface IUploadProps extends IUserInfoProps { 
    targetName: string[];
}

export default function Upload({ user, targetName }: IUploadProps) {

    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [exerciseName, setExerciseName] = useState<string>("");
    const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const router = useRouter();

    const [{ x }, set] = useSpring(() => ({ x: 0 }), []);
    const bind = useDrag(({ down, movement: [mx], distance, cancel }) => {
        if (distance > 10) {
            setIsDragging(true);
            set({ x: down ? mx : 0 });
        } else if (!down) {
            setIsDragging(false);
        }
    });

    const handleSelectQuery = (query: string) => {
        if (selectedTargets.includes(query)) {
            setSelectedTargets(selectedTargets.filter(item => item !== query));
        } else {
            setSelectedTargets([...selectedTargets, query]);
        }        
    };


    const handleUpload = async () => {
        if (!user || !user.role || user.role != 'admin') {
            common500Alert('권한이 없습니다');
            router.push('/workout');
        }
        if (!exerciseName) {
            common500Alert('운동 이름을 입력해주세요');
            return;
        }
        if (selectedTargets.length === 0) {
            common500Alert('타겟 부위를 선택해주세요');
            return;
        }
        if (uploadedImage && uploadedFile) {
            try {
                const formData = new FormData();
                formData.append("file", uploadedFile);
                formData.append("name", exerciseName);
                formData.append("targets", selectedTargets.join(','));

                const response = await addWorkoutAPI(formData);

                if (response?.status === 201) {
                    commonDoneAlert("운동이 등록되었습니다");
                    initializeUploadData();
                }
            }
            catch (error) {
                console.error('Error uploading the file:', error);
            }
        }
    };

    const initializeUploadData = () => {
        setUploadedImage(null);
        setUploadedFile(null);
        setExerciseName("");
        setSelectedTargets([]);
    }

    return (
        <CenterContainer>
            {!uploadedImage ? (
                <UploadButton onFileUpload={(url: string, file: File) => {
                    console.log(url, file);
                    setUploadedImage(url);
                    setUploadedFile(file);
                }} />
            ) : (
                <ImageUploadContainer>
                    <ImageContainer>
                        <Image src={uploadedImage} alt="Uploaded Workout" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }} width={200} height={200} />
                    </ImageContainer>
                    <RecordContainer style={{ marginTop: "10%" }}>
                        <Label htmlFor="date">이름</Label>
                        <InputContainer>
                            <InputNumber
                                type="text"
                                id="exerciseName"
                                name="exerciseName"
                                value={exerciseName}
                                onChange={(e) => setExerciseName(e.target.value)}
                            />
                        </InputContainer>
                    </RecordContainer>
                    <Divide />
                    <RecordContainer style={{ marginBottom: "10%" }}>
                        <Label htmlFor="date" onClick={() => setSelectedTargets([])}>타겟부위</Label>
                        <SlideQueryArrays items={targetName} selectedItems={selectedTargets} onSelectItem={handleSelectQuery} x={x} bind={bind} />
                    </RecordContainer>
                    <BtnContainer>
                        <UploadBtn variant="outline-light" onClick={() => handleUpload()}>등록</UploadBtn>
                        <RemoveBtn variant="outline-danger" onClick={() => initializeUploadData()}>삭제</RemoveBtn>
                    </BtnContainer>
                </ImageUploadContainer>
            )}
        </CenterContainer>
    );
}

const CenterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const ImageUploadContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const ImageContainer = styled.div`
`

const BtnContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;    
`

const UploadBtn = styled(Button)`
    margin: 0.5rem;
`;

const RemoveBtn = styled(Button)`
    margin: 0.5rem;
`;


const RecordContainer = styled.div`
    width: 80%;
    display: flex;    
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-top: 2%;
`
const Divide = styled.hr`
    width: 100%;
`
const Label = styled.label`
    margin-right: auto;
    text-align: left;
    font-size: 0.8rem;
    width: 20%;
    @media (max-width: 375px) {
        font-size: 0.6rem;    
    }
    cusror: pointer;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`;

const InputNumber = styled.input`
    background-color: transparent;
    border: none;
    text-align: right;
    &:focus {
        outline: none;
    }
`;