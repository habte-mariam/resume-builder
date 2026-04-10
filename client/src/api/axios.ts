import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/resumes/api', // እዚህ ጋር /api መጨመሩን እና ፖርቱ 5000 መሆኑን አረጋግጥ
});

export default api;