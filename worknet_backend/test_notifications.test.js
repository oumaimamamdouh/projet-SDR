// test_notifications.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const notificationController = require('./notification.controller');

const app = express();
app.use(bodyParser.json());

app.post('/notifications', notificationController.createNotification.bind(notificationController));
app.get('/notifications/:user_id', notificationController.getUserNotifications.bind(notificationController));
app.patch('/notifications/:id/read', notificationController.markNotificationAsRead.bind(notificationController));
app.delete('/notifications/:id', notificationController.deleteNotification.bind(notificationController));
app.delete('/notifications/user/:user_id', notificationController.clearUserNotifications.bind(notificationController));

describe('Notification Controller', () => {
    let notifId = '';
    const userId = 'test_user_1';

    it('should create a notification', async () => {
        const res = await request(app)
            .post('/notifications')
            .send({ user_id: userId, title: 'Test', message: 'Hello World' });

        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        notifId = res.body.data._id;
    });

    it('should get user notifications', async () => {
        const res = await request(app).get(`/notifications/${userId}`);
        expect(res.body.success).toBe(true);
        expect(res.body.data.total).toBe(1);
    });

    it('should mark notification as read', async () => {
        const res = await request(app).patch(`/notifications/${notifId}/read`);
        expect(res.body.success).toBe(true);
        expect(res.body.data.is_read).toBe(true);
    });

    it('should delete notification', async () => {
        const res = await request(app).delete(`/notifications/${notifId}`);
        expect(res.body.success).toBe(true);
    });
});
