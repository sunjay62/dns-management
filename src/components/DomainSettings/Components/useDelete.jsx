import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import { BASE_URL } from '@/libs/api-libs';

// Updated useDelete component
const useDelete = ({ id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      const formData = new FormData();
      formData.append('id', id);

      const result = await Swal.fire({
        title: 'Delete Domain',
        text: 'Are you sure to delete this Domain?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      });

      if (result.isConfirmed) {
        const response = await axios.delete(`${BASE_URL}/domain`, {
          headers: {
            'x-api-key': 'R_DfwauR47lbvCj5KzIpefuKHqfJvFajId4uVK-BgW4',
          },
          withCredentials: true,
          data: formData,
        });

        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Delete Successfully',
          });
          onDeleteSuccess();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed to delete',
          });
        }
      }
    } catch (error) {
      console.error('Error deleting site:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'An error occurred while deleting',
      });
    }
  };

  return (
    <div onClick={handleDelete}>
      <DeleteOutlined />
    </div>
  );
};

export default useDelete;
