import swal, { SweetAlertCustomClass, SweetAlertIcon, SweetAlertResult } from "sweetalert2";

export const swalWarningMessage = ( title: string, text: string, style?: SweetAlertCustomClass ): Promise<SweetAlertResult<any>> => {
  return swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Confirmar',
    reverseButtons: true,
    customClass: style ?? {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
}

export const swalToast = ( text: string ): Promise<SweetAlertResult<any>> => {
  return swal.fire({
    title: text,
    timer: 3000,
    toast: true,
    width: '32rem',
    icon: 'success',
    position: "bottom-end",
    showConfirmButton: false,
  });
}

export const swalToastError = ( text: string ): Promise<SweetAlertResult<any>> => {
  return swal.fire({
    title: text,
    toast: true,
    timer: 3000,
    icon: 'error',
    width: '32rem',
    position: "bottom-end",
    showConfirmButton: false,
  });
}