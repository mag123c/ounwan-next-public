import Swal from "sweetalert2";

export const deleteConfirm = async (): Promise<boolean> => {
   return await Swal.fire({
      title: '삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
      cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      confirmButtonText: '승인', // confirm 버튼 텍스트 지정
      cancelButtonText: '취소', // cancel 버튼 텍스트 지정
      reverseButtons: true, // 버튼 순서 거꾸로
   }).then(result => {
      if (result.isConfirmed) {
         return true;
      }
      return false;
   }).catch(() => {
      return false
   });
}