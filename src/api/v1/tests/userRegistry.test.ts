import axios, { AxiosResponse, AxiosError } from 'axios';
import { faker } from '@faker-js/faker';

test('Correct user registry', async () => {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const response = await axios.post(`http://${process.env.API_HOST}:${process.env.PORT}/users/create`, {
        username: username,
        email: email,
        password: password
    });
    expect(response.data.username).toEqual(username);
    expect(response.data.email).toEqual(email)
    expect(response.data).not.toHaveProperty(password);
});

test('Invalid email registry', async () => {
    const email = 'thisis.ainvalid@email';
    try {
        const response = await axios.post(`http://${process.env.API_HOST}:${process.env.PORT}/users/create`, {
            username: faker.internet.userName(),
            email: email,
            password: faker.internet.password()
        });
    } catch (error) {
        if(error instanceof AxiosError) {
            expect(error.response?.status).toBe(400);
            expect(error.response?.data.error).toEqual(`${email} is not a valid e-mail.`);
        }
    }
});

test('Duplicate email registry', async () => {
    const email = faker.internet.email();
    const response = await axios.post(`http://${process.env.API_HOST}:${process.env.PORT}/users/create`, {
        username: faker.internet.userName(),
        email: email,
        password: faker.internet.password()
    });
    try {
        const response = await axios.post(`http://${process.env.API_HOST}:${process.env.PORT}/users/create`, {
            username: faker.internet.userName(),
            email: email,
            password: faker.internet.password()
        });
    } catch (error) {
        if(error instanceof AxiosError) {
            expect(error.response?.status).toBe(409);
            expect(error.response?.data.error).toEqual('E-mail already exists');
        }
    }
});

test('Duplicate username registry', async () => {
    const username = faker.internet.userName();
    const response = await axios.post(`http://${process.env.API_HOST}:${process.env.PORT}/users/create`, {
        username: username,
        email: faker.internet.email(),
        password: faker.internet.password()
    });
    try {
        const response = await axios.post(`http://${process.env.API_HOST}:${process.env.PORT}/users/create`, {
            username: username,
            email: faker.internet.email(),
            password: faker.internet.password()
        });
    } catch (error) {
        if(error instanceof AxiosError) {
            expect(error.response?.status).toBe(409);
            expect(error.response?.data.error).toEqual('Username already exists');
        }
    }
});

test('Invalid JSON format', async () => {
    try {
        const response = await axios.post(`http://${process.env.API_HOST}:${process.env.PORT}/users/create`, "{malformed: 'json}");
    } catch (error) {
        if(error instanceof AxiosError) {
            expect(error.response?.status).toBe(400);
            expect(error.response?.data.error).toEqual('Invalid JSON');
        }
    }
});

test('JSON missing username field', async () => {
    try {
        const response = await axios.post(`http://${process.env.API_HOST}:${process.env.PORT}/users/create`, {
            email: faker.internet.email(),
            password: faker.internet.password()
        });
    } catch (error) {
        if(error instanceof AxiosError) {
            expect(error.response?.status).toBe(400);
            expect(error.response?.data.error).toEqual('Username not informed.');
        }
    }
});

test('JSON missing email field', async () => {
    try {
        const response = await axios.post(`http://${process.env.API_HOST}:${process.env.PORT}/users/create`, {
            username: faker.internet.userName(),
            password: faker.internet.password()
        });
    } catch (error) {
        if(error instanceof AxiosError) {
            expect(error.response?.status).toBe(400);
            expect(error.response?.data.error).toEqual('Email not informed.');
        }
    }
});

test('JSON missing password field', async () => {
    try {
        const response = await axios.post(`http://${process.env.API_HOST}:${process.env.PORT}/users/create`, {
            username: faker.internet.userName(),
            email: faker.internet.email()
        });
    } catch (error) {
        if(error instanceof AxiosError) {
            expect(error.response?.status).toBe(400);
            expect(error.response?.data.error).toEqual('Password not informed.');
        }
    }
});