import Swal from "sweetalert2";

export const signUpProcessingAlert = async () => {
    Swal.fire({
        icon: 'error',
        title: '회원이 아닙니다.',
        text: '회원가입을 진행합니다.'
    })
};


export const signUpSuccessAlert = async () => {
    Swal.fire({
        icon: 'success',
        title: '회원가입 성공'
    })
};

export const commonDoneAlert = async (message: string) => {
    Swal.fire({
        icon: 'success',
        title: `${message}`,
    })
}