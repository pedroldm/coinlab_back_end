import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
dotenv.config({ path: __dirname + '/../.env' });

const baseUrl = `http://${process.env.API_HOST}:${process.env.PORT}`;

class Request {
    private static debug: boolean = true;
    private baseUrl = `http://${process.env.API_HOST}:${process.env.PORT}`;

    public static async createUser(username: string = 'test_user', email: string = 'testuser@example.com', password: string = 'password'): Promise<void> {
        try {
            const response = await axios.post(`${baseUrl}/users/create`, {
                username: username,
                email: email,
                password: password
            });
            console.log(response)
            if(this.debug)
                this.logResponseData(response);
        } catch (error) {
            console.error(error);
        }
    }

    public static async createFakerUser(count: number = 1): Promise<void> {
        try {
            for(let i = 0 ; i < count ; i++) { 
                const response = await axios.post(`${baseUrl}/users/create`, {
                    username: faker.internet.userName(),
                    email: faker.internet.email(),
                    password: faker.internet.password()
                });
                if(this.debug)
                    this.logResponseData(response);
            }
        } catch (error) {
            console.error(error);
        }
    }

    public static async getAllUsers(): Promise<void> {
        try {
            const response = await axios.get(`${baseUrl}/users/all`);
            if(this.debug)
                this.logResponseData(response);
        } catch (error) {
            console.error(error);
        }
    }

    public static async loginUser(username: string, email: string, password: string) {
        try {
            const response = await axios.post(`${baseUrl}/users/login`, {
                username: username,
                email: email,
                password: password
            });
            if(this.debug)
                this.logResponseData(response);
        } catch (error) {
            console.error(error);
        }
    }

    private static logResponseData(response: AxiosResponse<any, any>) {
        console.log("Status Code: " + response.status);
        console.log(response.data);
    }
}

//Request.createUser('user123', 'asodhasdiuh@gmail.com', 'pass');
//Request.getAllUsers();
//Request.createFakerUser(1);
Request.loginUser('userddddd123', 'asodhasdiuh@gmail.com', 'pass');