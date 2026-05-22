import axios from "axios";

export const API_URL = "http://localhost:3000";

const API = axios.create({
    baseURL: `${API_URL}/api`,
});

//Automatically attach token
API.interceptors.request.use((req)=>{
    const token = localStorage.getItem("token");
    if(token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            if (!["/login", "/register"].includes(window.location.pathname)) {
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    },
);

export default API

export const getImageUrl = (image) => {
    if (!image) return "https://images.unsplash.com/photo-1441986300917-64674bd600d8b?q=80&w=1200&auto=format&fit=crop";
    if (image.startsWith("http")) return image;
    return `${API_URL}/${image.replace(/^\/+/, "")}`;
};
