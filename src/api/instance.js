import axios from "axios";

const baseUrl=axios.create({
    baseURL:"https://674fada1bb559617b26fcc1c.mockapi.io/api/v1/users/",
    headers:{
        "Content-Type":"application/json",
    },
});

export default baseUrl;