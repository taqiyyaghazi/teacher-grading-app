import { create } from 'apisauce';
import Swal from 'sweetalert2';

export const api = create({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
});

api.addResponseTransform((response) => {
  if (!response.ok) {
    Swal.fire({
      title: 'Error!',
      text: response.data?.message || 'Internal Server Error',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    return;
  }
});
