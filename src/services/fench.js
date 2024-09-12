import axios from "axios";

const session_id = localStorage.getItem("session");

export const fench = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        api_key: "57f8c1b9148d92540486d9ecad2d99fc",
        ...(session_id ? { session_id } : {}),
    },
});

window.fench = fench;