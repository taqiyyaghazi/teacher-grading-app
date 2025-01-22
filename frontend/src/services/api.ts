import { create } from 'apisauce';
import Swal from 'sweetalert2';

export const api = create({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
});

api.addResponseTransform((response) => {
  if (response.status && [403, 401].includes(response.status)) {
    Swal.fire({
      title: 'Error!',
      text: response.data?.message || 'Internal Server Error',
      icon: 'error',
      confirmButtonText: 'OK',
    }).then(() => {
      window.location.href = '/';
    });
    return;
  }

  if (!response.ok) {
    Swal.fire({
      title: 'Error!',
      text: response.data?.message || 'Internal Server Error',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
});

api.addRequestTransform((request) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    request.headers = { Authorization: `Bearer ${token}` };
  }
});
