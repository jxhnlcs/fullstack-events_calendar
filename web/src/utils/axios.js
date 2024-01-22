import axios from 'axios';

const ipAddress = window.location.hostname;
const port = 9393;

console.log(`https://${ipAddress}:${port}`)
export default axios.create({
  baseURL: `https://${ipAddress}:${port}`,
});