import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env' });

const baseUrl = `http://localhost:${process.env.PORT}`;

async function createUser() {
    try {
        const userData = {
            username: 'ne1wduser',
            email: 'newdus1er@example.com',
        };
        const response = await axios.post(`${baseUrl}/users/create`, userData);
        console.log('Status: ' + response.status);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

async function getAllUsers() {
    try {
        const response = await axios.get(`${baseUrl}/users/all`);
        console.log('Status: ' + response.status);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

//createUser();
getAllUsers();