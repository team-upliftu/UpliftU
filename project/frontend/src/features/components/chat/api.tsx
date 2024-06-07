// src/api.ts
import axios from 'axios';

export const getGatheringId = async (userId: string): Promise<string> => {
  // const response = await axios.get(`http://http://localhost:8000/getcurrentgathering/${userId}/`);
  // const gatherings = response.data.gathering;
  // //gatheringsの最後の要素を返却
  // return gatherings[gatherings.length - 1];
  return "00000000-0000-0000-0000-000000000001";

};

export const getMessageLogs = async (gatheringId: string) => {
  const response = await axios.get(`http://localhost:8000/messagelogs/${gatheringId}/`);
  return response.data;
};

export const sendMessage = async (message: { gathering: string; body: string; sender: number }) => {
  const response = await axios.post(`http://localhost:8000/messages/`, message, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};
