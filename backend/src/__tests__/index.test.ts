import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { app, closeServer } from '../index';
import { closeDatabase } from '../models/database';

describe('API Endpoints', () => {
  it('GET /users should return a list of users', async () => {
    const response = await request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /tasks should return a list of tasks', async () => {
    const response = await request(app)
      .get('/tasks')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /users should create a new user', async () => {
    const timestamp = Date.now();
    const newUser = {
      name: 'Test User',
      email: `test${timestamp}@example.com`
    };

    const response = await request(app)
      .post('/users')
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });

  afterAll(async () => {
    await closeDatabase();
    await closeServer();
  });
}); 