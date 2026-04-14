import axios from "./axios";

export const submitContactMessage = async (formData) => {
  const res = await axios.post("/contact", formData);
  return res.data;
};

export const fetchContactMessages = async () => {
  const res = await axios.get("/contact/messages");
  return res.data.messages;
};

export const toggleContactReadStatus = async (id) => {
  const res = await axios.patch(`/contact/${id}/read`);
  return res.data;
};

export const deleteContactMessage = async (id) => {
  const res = await axios.delete(`/contact/${id}`);
  return res.data;
};  