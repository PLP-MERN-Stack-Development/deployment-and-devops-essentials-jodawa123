import request from 'supertest';
import app from '../server.js';
import Task from '../models/Task.js';
import User from '../models/User.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

describe('Tasks API', () => {
  let authToken;
  let userId;

  beforeAll(async () => {
    // Create a test user and get token
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });
    userId = user._id;
    authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'test-secret');
  });

  afterAll(async () => {
    await Task.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe('GET /api/tasks', () => {
    it('should get all tasks for authenticated user', async () => {
      await Task.create({
        title: 'Test Task',
        user: userId,
      });

      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should return 401 without authentication', async () => {
      await request(app)
        .get('/api/tasks')
        .expect(401);
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'New Task',
        description: 'Task description',
        status: 'pending',
      };

      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send(taskData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(taskData.title);
    });

    it('should return 400 if title is missing', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ description: 'No title' })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });
});


