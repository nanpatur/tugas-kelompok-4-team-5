import axios from 'axios'

export default function axiosInstance () {
  return axios.create({
    baseURL: 'http://localhost:3001'
  });
}