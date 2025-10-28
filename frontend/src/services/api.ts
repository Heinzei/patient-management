import axios from 'axios'

const API_URL = 'http://localhost:3000/patients'

export const fetchPatients = async () => {
  const res = await axios.get(API_URL)
  return res.data
}

export const fetchPatient = async (id: number) => {
  const res = await axios.get(`${API_URL}/${id}`)
  return res.data
}

export const createPatient = async (patient: any) => {
  const res = await axios.post(API_URL, patient)
  return res.data
}

export const updatePatient = async (id: number, patient: any) => {
  const res = await axios.put(`${API_URL}/${id}`, patient)
  return res.data
}

export const deletePatient = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`)
}
