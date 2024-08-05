import { common500Alert } from "@/components/common/sweetalert/500.alert";
import Image from "next/image";
import React, { useRef } from "react";
import styled from "styled-components";

interface UploadButtonProps {
    onFileUpload: (url: string, file: File) => void;
}

export function UploadButton({ onFileUpload }: UploadButtonProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {            
            const validExtensions = ['image/png', 'image/jpeg', 'image/heif'];
            const maxFileSize = 10 * 1024 * 1024;

            if (validateFile(file, validExtensions, maxFileSize)) {
                const reader = new FileReader();
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    if (e.target?.result) {
                        onFileUpload(e.target.result.toString(), file);
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const validateFile = (file: File, validExtensions: string[], maxFileSize: number) => {
        if (!validExtensions.includes(file.type)) {
            common500Alert('지원하지 않는 파일 형식입니다.');
            return false;
        }
        if (file.size > maxFileSize) {
            common500Alert('파일 크기가 너무 큽니다.');
            return false;
        }
        return true;
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target?.result) {
                    onFileUpload(e.target.result.toString(), file);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <UploadIcon
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleUploadClick}
                alt="upload"
                src="/icon/btn/add-btn.svg"
                width={200}
                height={200}
            />
            <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
        </>
    );
}

const UploadIcon = styled(Image)`
    cursor: pointer;
    display: block;    
    position: fixed;
    bottom: 45%;
    @media (max-width: 576px) {
        width: 150px;
        height: 150px;        
    }
    @media (max-width: 375px) {
        width: 100px;
        height: 100px;
    }
`;
