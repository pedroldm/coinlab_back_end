import axios, { AxiosResponse, AxiosError } from 'axios';
import { faker } from '@faker-js/faker';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface JwtPayload {
    id: string;
}
  
test('Correct log-in with username and e-mail', async () => {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await axios.post(`http://${process.env.API_HOST}:${process.env.PORT}/users/create`, {
        username: username,
        email: email,
        password: password,
    });

    const response = await axios.post(`http://${process.env.API_HOST}:${process.env.PORT}/users/login`, {
        username: username,
        email: email,
        password: password,
    });

    expect(response.status).toEqual(200);
    expect(response.data).toHaveProperty('token');

    const user = jwt.verify(response.data.token, process.env.API_ACCESS_TOKEN_SECRET || '') as JwtPayload;
    const foundUser = await User.findOne({ where: { id: user.id } });

    expect(foundUser).not.toBeNull();
    expect(user.id).toBe(foundUser?.id);
});

test('Correct log-in only username', async () => {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await axios.post(`http://${process.env.API_HOST}:${process.env.PORT}/users/create`, {
        username: username,
        email: email,
        password: password,
    });

    const response = await axios.post(`http://${process.env.API_HOST}:${process.env.PORT}/users/login`, {
        username: username,
        password: password,
    });

    expect(response.status).toEqual(200);
    expect(response.data).toHaveProperty('token');

    const user = jwt.verify(response.data.token, process.env.API_ACCESS_TOKEN_SECRET || '') as JwtPayload;
    const foundUser = await User.findOne({ where: { id: user.id } });

    expect(foundUser).not.toBeNull();
    expect(user.id).toBe(foundUser?.id);
});

test('Correct log-in only e-mail', async () => {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await axios.post(`http://${process.env.API_HOST}:${process.env.PORT}/users/create`, {
        username: username,
        email: email,
        password: password,
    });

    const response = await axios.post(`http://${process.env.API_HOST}:${process.env.PORT}/users/login`, {
        email: email,
        password: password,
    });

    expect(response.status).toEqual(200);
    expect(response.data).toHaveProperty('token');

    const user = jwt.verify(response.data.token, process.env.API_ACCESS_TOKEN_SECRET || '') as JwtPayload;
    const foundUser = await User.findOne({ where: { id: user.id } });

    expect(foundUser).not.toBeNull();
    expect(user.id).toBe(foundUser?.id);
});