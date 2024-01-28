import axios from 'axios';

const backendPort = '8000';
const serverUrl = 'http://' + window.location.hostname + ':' + backendPort;
const imgUrl = 'http://' + window.location.hostname + ':' + backendPort + '/uploads/';

async function get(endpoint, params = '') {
    return axios.get(serverUrl + endpoint + '/' + params, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}

async function post(endpoint, data) {
    const bodyData = JSON.stringify(data);

    return axios.post(serverUrl + endpoint, bodyData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}

async function patch(endpoint, data) {
    const bodyData = JSON.stringify(data);

    return axios.patch(serverUrl + endpoint, bodyData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}

async function formPost(endpoint, data) {
    return axios.post(serverUrl + endpoint, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}

async function put(endpoint, data) {
    const bodyData = JSON.stringify(data);

    return axios.put(serverUrl + endpoint, bodyData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}

async function del(endpoint, params = '') {
    return axios.delete(serverUrl + endpoint + '/' + params, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}

export { serverUrl, imgUrl, get, post, patch, formPost, put, del as delete };
