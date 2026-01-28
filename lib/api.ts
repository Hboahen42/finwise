import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            return Promise.reject(error);
        }

        const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.details ||
        error.response?.data?.message ||
        error.message ||
        'An unexpected error occurred';

        console.error('API Error', errorMsg);

        throw new Error(errorMsg);
    }
)


// Auth API Calls
export const authApi = {
    signUp: async (data: { name: string; email: string; password: string }) => {
        const response = await api.post('/api/auth/sign-up', {
            name: data.name,
            email: data.email,
            password: data.password,
        })
        return response.data
    },

    signIn: async (data: { email: string; password: string }) => {
        const response = await api.post('/api/auth/sign-in', {
            email: data.email,
            password: data.password,
        })
        return response.data
    },

    signOut: async () => {
        const response = await api.post('/api/auth/sign-out')
        return response.data
    }
}
export default api