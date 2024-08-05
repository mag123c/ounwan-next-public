import Swal from "sweetalert2";

//icon : error, info, question, success, warning
export const SigninFailed = (message?: string) => {
    
    if (message) {
        Swal.fire({
            icon: 'error',
            title: `${message}`
        })
    }

    else {
        Swal.fire({
            icon: 'question',
            title: '로그인 실패',
            text: '문의를 남겨주세요.'
        })
    }
    
}

export const SignupFailed = (message?: string) => {
    
    if (message) {
        Swal.fire({
            icon: 'error',
            title: `${message}`
        })
    }
    
}