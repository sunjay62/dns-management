import React from 'react';
import { SyncOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import { BASE_URL } from '@/libs/api-libs';

// Updated useGenerate component
const useGenerate = ({ id, onGenerateSuccess }) => {
  const handleGenerate = async () => {
    try {
      const formData = new FormData();
      formData.append('id', id);

      const result = await Swal.fire({
        title: 'Generate Domain',
        text: 'Are you sure to Generate this Domain?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      });

      if (result.isConfirmed) {
        const response = await axios.post(`${BASE_URL}/domain/generate`, formData, {
          headers: {
            'x-api-key': 'R_DfwauR47lbvCj5KzIpefuKHqfJvFajId4uVK-BgW4',
          },
        });

        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Generate Successfully',
          });
          onGenerateSuccess();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed to Generate',
          });
        }
      }
    } catch (error) {
      console.error('Error generating domain:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'An error occurred while generating',
      });
    }
  };

  return (
    <div onClick={handleGenerate}>
      <SyncOutlined />
    </div>
  );
};

export default useGenerate;
