import axios from 'axios';

export const uploadFile = async (file, uploadUrl) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(uploadUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Raw Backend Response:', response);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Upload Error (Raw):', error);
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};
