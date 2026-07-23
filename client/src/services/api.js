import axios from 'axios';

const API_BASE = '/api';

export const uploadPDF = async (formData) => {
  const response = await axios.post(`${API_BASE}/documents/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const uploadRawText = async (textData) => {
  const response = await axios.post(`${API_BASE}/documents/upload`, textData);
  return response.data;
};

export const triggerAnalysis = async (documentId) => {
  const response = await axios.post(`${API_BASE}/agents/analyze`, { documentId });
  return response.data;
};

export const pollAgentStatus = async (runId) => {
  const response = await axios.get(`${API_BASE}/agents/status/${runId}`);
  return response.data;
};

export const getAgentOutputs = async (runId) => {
  const response = await axios.get(`${API_BASE}/agents/outputs/${runId}`);
  return response.data;
};

export const fetchResearchBrief = async (briefId) => {
  const response = await axios.get(`${API_BASE}/briefs/${briefId}`);
  return response.data;
};

export const fetchAllBriefs = async () => {
  const response = await axios.get(`${API_BASE}/briefs`);
  return response.data;
};
