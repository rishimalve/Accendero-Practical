import axios from 'axios';

const API_BASE_URL = "https://localhost:5000/";

class APIService {

    register() {
        return axios.post(API_BASE_URL + "api/register");
    }

    login() {
        return axios.post(API_BASE_URL + "api/login");
    }
}