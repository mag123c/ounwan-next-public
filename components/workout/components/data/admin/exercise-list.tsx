import { deleteExerciseRowAPI, putExerciseRowAPI } from "@/api/exercise/exercise";
import { common500Alert } from "@/components/common/sweetalert/500.alert";
import { commonDoneAlert } from "@/components/common/sweetalert/component.alert";
import { deleteConfirm } from "@/components/common/sweetalert/etc";
import { IExerciseInfo } from "@/interfaces/exercise.interface";
import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import styled from "styled-components";

interface IAdminExerciseListProps {
    target: string[];
    exercise: IExerciseInfo[];
}

export default function AdminExerciseList({ target, exercise }: IAdminExerciseListProps) {

    const [exerciseList, setExerciseList] = useState<IExerciseInfo[]>(exercise);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editableExercise, setEditableExercise] = useState<IExerciseInfo | null>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [beforeEditRow, setBeforeEditRow] = useState<IExerciseInfo | null>(null);

    useEffect(() => {
        setExerciseList(exercise);
    }, [exercise]);

    const router = useRouter();

    const handleModifyStart = (selectedExercise: IExerciseInfo) => {
        if (editMode && editableExercise?.no === selectedExercise.no) {
            setEditMode(false);
            setEditableExercise(null);
            setBeforeEditRow(null);
            setUploadedImage(null);
            setUploadedFile(null);
        } else {
            setEditMode(true);
            setEditableExercise({ ...selectedExercise });
            setBeforeEditRow({ ...selectedExercise });
            setUploadedImage(null);
            setUploadedFile(null);
        }
    };

    const handleRemove = async (e: MouseEvent<HTMLImageElement>, exercise: IExerciseInfo) => {
        e.stopPropagation();

        if (await deleteConfirm()) {
            const response = await deleteExerciseRowAPI(exercise);
            if (response?.status === 200) {
                commonDoneAlert('삭제되었습니다.');
                const updatedExercises = exerciseList.filter(item => item.no !== exercise.no);
                setExerciseList(updatedExercises);
            }
        }
    };

    const handleSaveChanges = async () => {
        if (editableExercise) {
            const formData = new FormData();
            formData.append('exercise', JSON.stringify(editableExercise));
            if (uploadedFile) {
                formData.append('file', uploadedFile);
            }

            const response = await putExerciseRowAPI(formData, editableExercise.no);
            if (response?.status === 200) {
                commonDoneAlert('수정되었습니다.');
                const updatedExercises = exerciseList.map(item => item.no === editableExercise.no ? editableExercise : item);
                setExerciseList(updatedExercises);
                setEditMode(false);
                setEditableExercise(null);
            } else {
                common500Alert('수정 실패');
            }
        }
    };

    const handleCancelChanges = () => {
        setEditMode(false);
        setEditableExercise(null);
        setBeforeEditRow(null);
        setUploadedImage(null);
        setUploadedFile(null);
    };

    const handleImageClick = (e: MouseEvent) => {
        e.stopPropagation(); // Prevents toggling edit mode when clicking on the image
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: Event) => handleImageChange(e);
        input.click();
    };

    const handleImageChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files[0] && editableExercise) {
            const file = target.files[0];
            setUploadedFile(file);
            const reader = new FileReader();
            reader.onload = (ev: ProgressEvent<FileReader>) => {
                setUploadedImage(ev.target?.result as string);
                setEditableExercise({ ...editableExercise, path: URL.createObjectURL(file) });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof IExerciseInfo) => {
        setEditableExercise({ ...editableExercise!, [field]: e.target.value });
    };

    return (
        <>
            <ExerciseListContainer>
                {exerciseList.map((item, index) => (
                    <ExerciseItem key={index} onClick={() => handleModifyStart(item)}>
                        {editMode && editableExercise?.no === item.no ? (
                            <>
                                <ExerciseImg
                                    src={uploadedImage || `${process.env.NEXT_PUBLIC_IMAGE_URL}${editableExercise.path}`}
                                    width={250}
                                    height={180}
                                    alt={editableExercise.name.split('.')[0]}
                                    onClick={handleImageClick}
                                />
                                <ExerciseText>
                                    <ModifyInput
                                        type="text"
                                        value={editableExercise.name}
                                        onChange={e => handleInputChange(e, 'name')}
                                        onClick={(e) => e.stopPropagation()} // Prevents toggling edit mode when clicking on the input
                                    />
                                    <ModifyInput
                                        type="text"
                                        value={editableExercise.targets}
                                        onChange={e => handleInputChange(e, 'targets')}
                                        onClick={(e) => e.stopPropagation()} // Prevents toggling edit mode when clicking on the input
                                    />
                                </ExerciseText>
                                <BtnContainer>
                                    <Check
                                        src={'/icon/btn/check.png'}
                                        alt="check"
                                        width={15}
                                        height={15}
                                        onClick={handleSaveChanges}
                                    />
                                    <Cancel
                                        src={'/icon/btn/cancel.svg'}
                                        alt="cancel"
                                        width={15}
                                        height={15}
                                        onClick={handleCancelChanges}
                                    />
                                </BtnContainer>
                            </>
                        ) : (
                            <>
                                <ExerciseImg
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.path}`}
                                    width={250}
                                    height={180}
                                    alt={item.name.split('.')[0]}
                                />
                                <ExerciseText>
                                    <ExerciseName>{item.name}</ExerciseName>
                                    <ExerciseTarget>{item.targets}</ExerciseTarget>
                                </ExerciseText>
                                <BtnContainer>
                                    <Delete
                                        src={'/icon/btn/trash.svg'}
                                        alt="trash"
                                        width={15}
                                        height={15}
                                        onClick={(e) => handleRemove(e, item)}
                                    />
                                </BtnContainer>
                            </>
                        )}
                    </ExerciseItem>
                ))}
            </ExerciseListContainer>
        </>
    );
}


const ExerciseListContainer = styled.div`
    width: 100%;
    height: calc(100vh - 170px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    margin-top: 5%;

    /* Firefox */
    scrollbar-width: none;
    /* IE, Edge, Chrome, Safari */
    &::-webkit-scrollbar {
        display: none;
    }
    z-index: 10;
`

const ExerciseItem = styled.div`
    width: 100%;    
    display: flex;    
    align-items: center;
    justify-content: space-around;
    margin-bottom: 20px;
    cursor: pointer;
    position: relative;
`

const ExerciseImg = styled(Image)`
    object-fit: cover;
    object-position: center;
    padding-left: 0.5rem;
    margin-left: -1%;
    flex-shrink: 0;   
    @media (max-width: 576px) {
        width: 180px;
        height: 120px;    
    }
    @media (max-width: 375px) {
        width: 120px;
        height: 100px;    
    }
    @media (max-width: 280px) {
        width: 100px;
        height: 75px;    
    }
`

const BtnContainer = styled.div`
    margin-right: 10px;
`

const Delete = styled(Image)`   
    cursor: pointer;
    margin: 5px;
`

const ExerciseText = styled.div`
    display: flex;
    min-width: 40%;
    flex-direction: column;
    justify-content: center;
`
const ExerciseName = styled.span`    
    @media (max-width: 375px) {
        font-size: 0.8rem !important;
    }
`

const ExerciseTarget = styled.span`
    color: var(--bs-gray-500);
    @media (max-width: 375px) {
        font-size: 0.6rem !important;
    }
`

const ModifyInput = styled.input`
    background-color: black;
    color: white;
    text-align: center;
    width: 100%;
    font-size: 0.8rem;

    @media(max-width: 576px) {
        font-size: 0.6rem;
    }
    @media(max-width: 280px) {
        font-size: 0.5rem;
    }
`

const Check = styled(Image)`   
    cursor: pointer;
    margin: 10px;
`

const Cancel = styled(Image)`   
    cursor: pointer;
    margin: 10px;
`
