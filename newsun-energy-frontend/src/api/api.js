import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3033',
});

export const uploadFileToMagicPdf = async (file) => {
  const fileData = new FormData();
  fileData.append('file', file);

  return await api.post('https://magic-pdf.solarium.newsun.energy/v1/magic-pdf', fileData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const submitLead = async (payload) => {
  return await api.post('/leads', payload, {
    headers: { 'Content-Type': 'application/json' },
  });
};

export default api;
