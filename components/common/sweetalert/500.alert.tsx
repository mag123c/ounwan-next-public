import Swal from "sweetalert2";
//icon : error, info, question, success, warning
export const SocialLoginFailed = (where: string) => {
    where = where === '/kakao' ? '카카오' :
            where === '/naver' ? '네이버' :
            where === '/google' ? '구글' :
            where;

    Swal.fire({
        icon: 'error',
        title: `${where} 로그인 실패`,
    })
}

export const Signup500Failed = () => {
    Swal.fire({
        icon: 'error',
        title: '회원가입 실패'
    })
}

export const Server500Alert = () => {
    Swal.fire({
        icon: 'question',
        title: '서버 오류',
        text: '잠시 후 다시 시도해주세요.'
    })
}

export const common500Alert = (message: string) => {
    Swal.fire({
        icon: 'error',
        title: `${message}`,
    })
}